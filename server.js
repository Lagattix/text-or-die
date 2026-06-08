const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 4173;
const publicDir = path.join(__dirname, "public");

const rooms = new Map();

const prompts = [
  { category: "un frutto", letter: "B", examples: ["banana", "bergamotto"] },
  { category: "un animale", letter: "C", examples: ["cane", "cavallo"] },
  { category: "una citta", letter: "M", examples: ["milano", "madrid"] },
  { category: "un cibo", letter: "P", examples: ["pizza", "pasta"] },
  { category: "uno sport", letter: "T", examples: ["tennis"] },
  { category: "un colore", letter: "R", examples: ["rosso"] },
  { category: "un oggetto", letter: "S", examples: ["sedia", "scarpa"] },
  { category: "un mestiere", letter: "D", examples: ["dottore"] },
  { category: "una cosa fredda", letter: "G", examples: ["ghiaccio"] },
  { category: "qualcosa in cucina", letter: "F", examples: ["forchetta"] },
  { category: "un film o serie", letter: "A", examples: ["avatar"] },
  { category: "una parola da spiaggia", letter: "O", examples: ["ombrellone"] },
];

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100000) req.destroy();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function makeCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return rooms.has(code) ? makeCode() : code;
}

function publicRoom(room) {
  return {
    code: room.code,
    hostId: room.hostId,
    status: room.status,
    round: room.round,
    prompt: room.prompt,
    roundStartedAt: room.roundStartedAt,
    roundTimeLimit: room.roundTimeLimit,
    eliminatedThisRound: room.eliminatedThisRound,
    winnerId: room.winnerId,
    players: room.players.map((player) => ({
      id: player.id,
      name: player.name,
      active: player.active,
      joinedAt: player.joinedAt,
      answer: player.answer
        ? {
            text: player.answer.text,
            accepted: player.answer.accepted,
            submittedAt: player.answer.submittedAt,
            elapsedMs: player.answer.elapsedMs,
          }
        : null,
    })),
  };
}

function activePlayers(room) {
  return room.players.filter((player) => player.active);
}

function choosePrompt(room) {
  const used = new Set(room.usedPrompts);
  const available = prompts.filter((_, index) => !used.has(index));
  const source = available.length ? available : prompts;
  const prompt = source[Math.floor(Math.random() * source.length)];
  const index = prompts.indexOf(prompt);
  room.usedPrompts.add(index);
  return prompt;
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function startsWithLetter(answer, letter) {
  return normalizeText(answer).startsWith(letter.toLowerCase());
}

function finishRound(room) {
  if (room.status !== "playing") return;

  const active = activePlayers(room);
  const ranked = active
    .map((player) => ({
      player,
      elapsedMs: player.answer?.accepted ? player.answer.elapsedMs : Number.POSITIVE_INFINITY,
      hasAnswer: Boolean(player.answer?.accepted),
    }))
    .sort((a, b) => {
      if (a.elapsedMs !== b.elapsedMs) return b.elapsedMs - a.elapsedMs;
      return a.player.joinedAt - b.player.joinedAt;
    });

  const eliminated = ranked[0]?.player;
  if (eliminated && active.length > 1) {
    eliminated.active = false;
    room.eliminatedThisRound = eliminated.id;
  }

  const remaining = activePlayers(room);
  room.status = remaining.length <= 1 ? "finished" : "results";
  room.winnerId = remaining.length === 1 ? remaining[0].id : null;
}

function maybeFinishRound(room) {
  if (room.status !== "playing") return;
  const active = activePlayers(room);
  const allAnswered = active.every((player) => player.answer?.accepted);
  const timedOut = Date.now() - room.roundStartedAt >= room.roundTimeLimit;
  if (allAnswered || timedOut) finishRound(room);
}

function createRoom(name) {
  const hostId = crypto.randomUUID();
  const room = {
    code: makeCode(),
    hostId,
    status: "lobby",
    round: 0,
    prompt: null,
    roundStartedAt: null,
    roundTimeLimit: 45000,
    eliminatedThisRound: null,
    winnerId: null,
    usedPrompts: new Set(),
    players: [
      {
        id: hostId,
        name,
        active: true,
        joinedAt: Date.now(),
        answer: null,
      },
    ],
  };
  rooms.set(room.code, room);
  return { room, playerId: hostId };
}

function joinRoom(code, name) {
  const room = rooms.get(String(code || "").trim().toUpperCase());
  if (!room) return null;
  if (room.status !== "lobby") return { error: "La partita e gia iniziata." };
  const player = {
    id: crypto.randomUUID(),
    name,
    active: true,
    joinedAt: Date.now(),
    answer: null,
  };
  room.players.push(player);
  return { room, playerId: player.id };
}

function startRound(room) {
  room.status = "playing";
  room.round += 1;
  room.prompt = choosePrompt(room);
  room.roundStartedAt = Date.now();
  room.eliminatedThisRound = null;
  room.winnerId = null;
  room.players.forEach((player) => {
    player.answer = null;
  });
}

async function handleApi(req, res, pathname) {
  try {
    if (req.method === "POST" && pathname === "/api/create") {
      const body = await readJson(req);
      const name = String(body.name || "").trim().slice(0, 20);
      if (!name) return sendJson(res, 400, { error: "Scegli un nome." });
      const { room, playerId } = createRoom(name);
      return sendJson(res, 200, { playerId, room: publicRoom(room) });
    }

    if (req.method === "POST" && pathname === "/api/join") {
      const body = await readJson(req);
      const name = String(body.name || "").trim().slice(0, 20);
      if (!name) return sendJson(res, 400, { error: "Scegli un nome." });
      const result = joinRoom(body.code, name);
      if (!result) return sendJson(res, 404, { error: "Stanza non trovata." });
      if (result.error) return sendJson(res, 409, { error: result.error });
      return sendJson(res, 200, { playerId: result.playerId, room: publicRoom(result.room) });
    }

    if (req.method === "GET" && pathname.startsWith("/api/room/")) {
      const code = pathname.split("/").pop().toUpperCase();
      const room = rooms.get(code);
      if (!room) return sendJson(res, 404, { error: "Stanza non trovata." });
      maybeFinishRound(room);
      return sendJson(res, 200, { room: publicRoom(room) });
    }

    if (req.method === "POST" && pathname === "/api/start") {
      const body = await readJson(req);
      const room = rooms.get(String(body.code || "").toUpperCase());
      if (!room) return sendJson(res, 404, { error: "Stanza non trovata." });
      if (room.hostId !== body.playerId) return sendJson(res, 403, { error: "Solo chi ha creato la stanza puo iniziare." });
      if (activePlayers(room).length < 2) return sendJson(res, 400, { error: "Servono almeno 2 giocatori." });
      if (room.status !== "lobby" && room.status !== "results") return sendJson(res, 409, { error: "Non puoi iniziare ora." });
      startRound(room);
      return sendJson(res, 200, { room: publicRoom(room) });
    }

    if (req.method === "POST" && pathname === "/api/answer") {
      const body = await readJson(req);
      const room = rooms.get(String(body.code || "").toUpperCase());
      if (!room) return sendJson(res, 404, { error: "Stanza non trovata." });
      maybeFinishRound(room);
      if (room.status !== "playing") return sendJson(res, 409, { error: "Il round e gia finito." });
      const player = room.players.find((item) => item.id === body.playerId);
      if (!player || !player.active) return sendJson(res, 403, { error: "Non sei in gioco in questo round." });
      if (player.answer?.accepted) return sendJson(res, 409, { error: "Hai gia risposto." });

      const answer = String(body.answer || "").trim().slice(0, 40);
      const accepted = Boolean(answer) && startsWithLetter(answer, room.prompt.letter);
      player.answer = {
        text: answer,
        accepted,
        submittedAt: Date.now(),
        elapsedMs: Date.now() - room.roundStartedAt,
      };
      if (!accepted) return sendJson(res, 400, { error: `Deve iniziare con ${room.prompt.letter}.`, room: publicRoom(room) });
      maybeFinishRound(room);
      return sendJson(res, 200, { room: publicRoom(room) });
    }

    sendJson(res, 404, { error: "API non trovata." });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

function serveStatic(req, res, pathname) {
  const requested = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(publicDir, requested));
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    const types = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".png": "image/png",
    };
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname.startsWith("/api/")) {
    handleApi(req, res, url.pathname);
    return;
  }
  serveStatic(req, res, url.pathname);
});

server.listen(PORT, () => {
  console.log(`Party Word Race attivo su http://localhost:${PORT}`);
});
