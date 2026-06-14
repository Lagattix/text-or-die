const prompts = [
  ["un frutto", "B"],
  ["un animale", "C"],
  ["una citta", "M"],
  ["un cibo", "P"],
  ["uno sport", "T"],
  ["un colore", "R"],
  ["un oggetto", "S"],
  ["un mestiere", "D"],
  ["qualcosa in cucina", "F"],
  ["una parola da spiaggia", "O"],
  ["una verdura", "Z"],
  ["un dolce", "C"],
  ["una bevanda", "A"],
  ["un paese", "I"],
  ["una capitale", "L"],
  ["un nome maschile", "G"],
  ["un nome femminile", "S"],
  ["un cognome", "R"],
  ["una cosa che vola", "A"],
  ["una cosa che nuota", "P"],
  ["una cosa rotonda", "M"],
  ["una cosa quadrata", "D"],
  ["un mezzo di trasporto", "T"],
  ["un personaggio famoso", "B"],
  ["un cantante", "V"],
  ["un attore", "M"],
  ["un videogioco", "F"],
  ["un cartone animato", "P"],
  ["un supereroe", "S"],
  ["un cattivo dei film", "J"],
  ["una materia scolastica", "S"],
  ["una cosa nello zaino", "Q"],
  ["una cosa in bagno", "A"],
  ["una cosa in camera", "L"],
  ["una cosa in salotto", "T"],
  ["una cosa in ufficio", "C"],
  ["una marca", "N"],
  ["un'app", "I"],
  ["un sito web", "Y"],
  ["una parola tecnologica", "R"],
  ["una cosa rumorosa", "M"],
  ["una cosa silenziosa", "L"],
  ["una cosa morbida", "C"],
  ["una cosa dura", "P"],
  ["una cosa piccola", "B"],
  ["una cosa gigante", "M"],
  ["una cosa veloce", "F"],
  ["una cosa lenta", "T"],
  ["una cosa costosa", "O"],
  ["una cosa economica", "S"],
  ["un animale marino", "D"],
  ["un animale della fattoria", "M"],
  ["un animale selvatico", "L"],
  ["un insetto", "F"],
  ["un uccello", "A"],
  ["un fiore", "G"],
  ["un albero", "P"],
  ["una pianta", "C"],
  ["un elemento naturale", "V"],
  ["una cosa del cielo", "N"],
  ["una cosa della montagna", "R"],
  ["una cosa del mare", "S"],
  ["una cosa da campeggio", "T"],
  ["una cosa da palestra", "P"],
  ["una cosa da festa", "C"],
  ["un regalo", "B"],
  ["un giocattolo", "M"],
  ["uno strumento musicale", "C"],
  ["un genere musicale", "R"],
  ["una canzone", "A"],
  ["un libro", "I"],
  ["una fiaba", "C"],
  ["un film Disney", "A"],
  ["una serie TV", "S"],
  ["un programma TV", "T"],
  ["un influencer", "K"],
  ["uno youtuber", "L"],
  ["un calciatore", "M"],
  ["uno sportivo", "R"],
  ["una squadra", "J"],
  ["una parola del calcio", "P"],
  ["una parola del basket", "T"],
  ["una parola del tennis", "S"],
  ["un indumento", "G"],
  ["una scarpa", "S"],
  ["un accessorio", "C"],
  ["un gioiello", "A"],
  ["un profumo", "D"],
  ["un trucco", "M"],
  ["una cosa da mangiare a colazione", "C"],
  ["una cosa da mangiare a pranzo", "R"],
  ["una cosa da mangiare a cena", "P"],
  ["uno snack", "G"],
  ["una salsa", "M"],
  ["una spezia", "C"],
  ["un gusto di gelato", "P"],
  ["una pizza", "M"],
  ["un panino", "H"],
  ["un ristorante", "S"],
  ["un lavoro creativo", "P"],
];

const answerBank = {
  "un frutto|B": ["banana", "bergamotto", "bacca", "babaco"],
  "un animale|C": ["cane", "cavallo", "capra", "coniglio", "cervo", "coccodrillo"],
  "una citta|M": ["milano", "madrid", "monza", "modena", "messina", "mantova"],
  "un cibo|P": ["pizza", "pasta", "pane", "pollo", "patate", "polenta"],
  "uno sport|T": ["tennis", "taekwondo", "triathlon", "tuffi", "trekking"],
  "un colore|R": ["rosso", "rosa", "rame", "rubino"],
  "un oggetto|S": ["sedia", "scarpa", "specchio", "sapone", "spazzola"],
  "un mestiere|D": ["dottore", "dentista", "designer", "direttore", "domatore"],
  "qualcosa in cucina|F": ["forchetta", "frigorifero", "forno", "frullatore", "fornello"],
  "una parola da spiaggia|O": ["ombrellone", "onda", "oceano", "olio solare"],
  "una verdura|Z": ["zucchina", "zucca", "zenzero"],
  "un dolce|C": ["crostata", "cannolo", "ciambella", "crema", "cheesecake"],
  "una bevanda|A": ["acqua", "aranciata", "aperol", "aperitivo"],
  "un paese|I": ["italia", "india", "irlanda", "islanda", "iran"],
  "una capitale|L": ["londra", "lisbona", "lubiana", "lima"],
  "un nome maschile|G": ["giuseppe", "giovanni", "gabriele", "giorgio", "giulio"],
  "un nome femminile|S": ["sara", "sofia", "silvia", "serena", "simona"],
  "un cognome|R": ["rossi", "russo", "ricci", "romano", "rizzo"],
  "una cosa che vola|A": ["aereo", "aquilone", "aliante", "ape", "aquila"],
  "una cosa che nuota|P": ["pesce", "pinguino", "polpo", "papera"],
  "una cosa rotonda|M": ["moneta", "melone", "mappamondo", "mandarino"],
  "una cosa quadrata|D": ["dado", "display", "disegno", "doccia"],
  "un mezzo di trasporto|T": ["treno", "tram", "taxi", "traghetto", "tir"],
  "un personaggio famoso|B": ["batman", "barbie", "beyonce", "brad pitt"],
  "un cantante|V": ["vasco", "venditti", "vanoni", "vivaldi"],
  "un attore|M": ["mastroianni", "morgan freeman", "matt damon", "monica bellucci"],
  "un videogioco|F": ["fortnite", "fifa", "fall guys", "final fantasy", "forza horizon"],
  "un cartone animato|P": ["pokemon", "peppa pig", "pinocchio", "popeye"],
  "un supereroe|S": ["superman", "spiderman", "shazam", "supergirl"],
  "un cattivo dei film|J": ["joker", "jafar", "jason", "juggernaut"],
  "una materia scolastica|S": ["storia", "scienze", "spagnolo", "statistica"],
  "una cosa nello zaino|Q": ["quaderno", "quadretto"],
  "una cosa in bagno|A": ["asciugamano", "accappatoio", "armadietto"],
  "una cosa in camera|L": ["letto", "lampada", "lenzuolo", "libreria"],
  "una cosa in salotto|T": ["televisione", "tappeto", "tavolino", "tenda"],
  "una cosa in ufficio|C": ["computer", "calcolatrice", "cassetto", "cancelleria"],
  "una marca|N": ["nike", "nintendo", "nutella", "netflix", "nissan"],
  "un'app|I": ["instagram", "imessage", "immuni", "ibis paint"],
  "un sito web|Y": ["youtube", "yahoo", "yelp"],
  "una parola tecnologica|R": ["router", "ram", "rete", "robot", "render"],
  "una cosa rumorosa|M": ["motore", "martello", "moto", "megafono"],
  "una cosa silenziosa|L": ["libro", "lana", "luce", "libreria"],
  "una cosa morbida|C": ["cuscino", "cotone", "coperta", "cappotto"],
  "una cosa dura|P": ["pietra", "piastrella", "pavimento", "porta"],
  "una cosa piccola|B": ["bottone", "briciola", "batteria", "biglia"],
  "una cosa gigante|M": ["montagna", "mammut", "mongolfiera", "muro"],
  "una cosa veloce|F": ["ferrari", "freccia", "fulmine", "falco"],
  "una cosa lenta|T": ["tartaruga", "trattore", "tramonto"],
  "una cosa costosa|O": ["orologio", "oro", "opera", "ombrello di lusso"],
  "una cosa economica|S": ["sale", "sapone", "spugna", "scotch"],
  "un animale marino|D": ["delfino", "dugongo", "dentice"],
  "un animale della fattoria|M": ["mucca", "maiale", "montone", "mulo"],
  "un animale selvatico|L": ["leone", "lupo", "leopardo", "lemure"],
  "un insetto|F": ["farfalla", "formica", "falena"],
  "un uccello|A": ["aquila", "airone", "anatra", "allocco"],
  "un fiore|G": ["girasole", "geranio", "giglio", "gardenia"],
  "un albero|P": ["pino", "pero", "pioppo", "platano"],
  "una pianta|C": ["cactus", "camelia", "ciclamino", "coriandolo"],
  "un elemento naturale|V": ["vento", "vulcano", "valle", "vegetazione"],
  "una cosa del cielo|N": ["nuvola", "neve", "nube"],
  "una cosa della montagna|R": ["roccia", "rifugio", "rampone", "ruscello"],
  "una cosa del mare|S": ["sabbia", "scoglio", "squalo", "salsedine"],
  "una cosa da campeggio|T": ["tenda", "torcia", "tavolino", "thermos"],
  "una cosa da palestra|P": ["peso", "panca", "pedana", "palla"],
  "una cosa da festa|C": ["coriandoli", "candela", "cappellino", "confetti"],
  "un regalo|B": ["borsa", "bracciale", "biglietto", "bici"],
  "un giocattolo|M": ["macchinina", "monopoli", "marionetta", "mattoncino"],
  "uno strumento musicale|C": ["chitarra", "clarinetto", "contrabbasso", "campana"],
  "un genere musicale|R": ["rock", "rap", "reggae", "rumba"],
  "una canzone|A": ["azzurro", "albachiara", "amore e capoeira"],
  "un libro|I": ["inferno", "it", "iliade", "il gattopardo"],
  "una fiaba|C": ["cenerentola", "cappuccetto rosso", "cenerentola"],
  "un film Disney|A": ["aladdin", "aristogatti", "avatar", "atlantis"],
  "una serie TV|S": ["stranger things", "squid game", "sherlock", "scrubs"],
  "un programma TV|T": ["telegiornale", "tale e quale", "tu si que vales"],
  "un influencer|K": ["khaby lame", "kendall jenner", "kylie jenner"],
  "uno youtuber|L": ["luis", "luca campolunghi", "lyon"],
  "un calciatore|M": ["messi", "mbappe", "maldini", "maradona"],
  "uno sportivo|R": ["ronaldo", "rossi", "rooney", "rodman"],
  "una squadra|J": ["juventus", "jazz", "jaguars"],
  "una parola del calcio|P": ["palla", "porta", "punizione", "parata", "passaggio"],
  "una parola del basket|T": ["tiro", "tripla", "timeout", "tabellone"],
  "una parola del tennis|S": ["servizio", "set", "smash", "slice"],
  "un indumento|G": ["giacca", "gonna", "guanti", "gilet"],
  "una scarpa|S": ["sneaker", "sandalo", "stivale", "scarponcino"],
  "un accessorio|C": ["cintura", "cappello", "collana", "cravatta"],
  "un gioiello|A": ["anello", "ametista", "argento"],
  "un profumo|D": ["dior", "dolce e gabbana", "davidoff"],
  "un trucco|M": ["mascara", "matita", "makeup", "mascara waterproof"],
  "una cosa da mangiare a colazione|C": ["cereali", "cornetto", "cappuccino", "ciambella"],
  "una cosa da mangiare a pranzo|R": ["risotto", "riso", "ravioli", "roast beef"],
  "una cosa da mangiare a cena|P": ["pizza", "pasta", "pollo", "pesce"],
  "uno snack|G": ["grissini", "gelato", "gallette", "gocciole"],
  "una salsa|M": ["maionese", "mostarda", "marinara", "mayo"],
  "una spezia|C": ["cannella", "curcuma", "curry", "cumino"],
  "un gusto di gelato|P": ["pistacchio", "panna", "pesca", "pinolo"],
  "una pizza|M": ["margherita", "marinara", "messicana", "mortadella"],
  "un panino|H": ["hamburger", "hot dog"],
  "un ristorante|S": ["sushi", "steakhouse", "spaghetteria"],
  "un lavoro creativo|P": ["pittore", "poeta", "pasticcere", "produttore"],
};

const roundTime = 45000;

const game = {
  code: "",
  status: "setup",
  round: 0,
  prompt: null,
  startedAt: 0,
  players: [],
  maxPlayers: 4,
  results: [],
  eliminatedId: null,
  winnerId: null,
};

const net = {
  role: "",
  peer: null,
  conns: new Map(),
  hostConn: null,
  playerId: "",
  timer: null,
};

const views = {
  setup: document.querySelector("#setup"),
  lobby: document.querySelector("#lobby"),
  round: document.querySelector("#round"),
  results: document.querySelector("#results"),
  winner: document.querySelector("#winner"),
};

const createTab = document.querySelector("#createTab");
const joinTab = document.querySelector("#joinTab");
const createForm = document.querySelector("#createForm");
const joinForm = document.querySelector("#joinForm");
const hostName = document.querySelector("#hostName");
const maxPlayers = document.querySelector("#maxPlayers");
const joinName = document.querySelector("#joinName");
const joinCode = document.querySelector("#joinCode");
const roomCode = document.querySelector("#roomCode");
const capacityText = document.querySelector("#capacityText");
const lobbyPlayers = document.querySelector("#lobbyPlayers");
const roundPlayers = document.querySelector("#roundPlayers");
const startGame = document.querySelector("#startGame");
const roundNumber = document.querySelector("#roundNumber");
const promptText = document.querySelector("#prompt");
const clock = document.querySelector("#clock");
const answerForm = document.querySelector("#answerForm");
const answerInput = document.querySelector("#answerInput");
const answerButton = document.querySelector("#answerButton");
const hint = document.querySelector("#hint");
const ranking = document.querySelector("#ranking");
const nextRound = document.querySelector("#nextRound");
const winnerText = document.querySelector("#winnerText");
const resetGame = document.querySelector("#resetGame");
const statusText = document.querySelector("#status");

function show(view) {
  Object.entries(views).forEach(([name, element]) => {
    element.classList.toggle("hidden", name !== view);
  });
}

function setStatus(message) {
  statusText.textContent = message || "";
}

function makeCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function roomPeerId(code) {
  return `text-or-die-${code.toLowerCase()}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value)
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function randomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

function promptKey(prompt) {
  return `${prompt[0]}|${prompt[1]}`;
}

function isValidAnswer(answer, prompt) {
  const cleanAnswer = normalize(answer);
  if (!cleanAnswer.startsWith(prompt[1].toLowerCase())) return false;
  const allowed = answerBank[promptKey(prompt)] || [];
  return allowed.map(normalize).some((word) => {
    return cleanAnswer === word || cleanAnswer.startsWith(`${word} `);
  });
}

function me() {
  return game.players.find((player) => player.id === net.playerId);
}

function activePlayers() {
  return game.players.filter((player) => player.active);
}

function copyGame() {
  return JSON.parse(JSON.stringify(game));
}

function broadcast() {
  if (net.role !== "host") return;
  const payload = { type: "state", game: copyGame() };
  net.conns.forEach((conn) => {
    if (conn.open) conn.send(payload);
  });
  render();
}

function receiveState(nextGame) {
  Object.assign(game, nextGame);
  render();
}

function addPlayer(id, name) {
  if (game.players.some((player) => player.id === id)) return;
  game.players.push({
    id,
    name: String(name || "Giocatore").trim().slice(0, 20),
    active: true,
    answer: "",
    elapsed: null,
  });
}

function removePlayer(id) {
  const player = game.players.find((item) => item.id === id);
  if (player && game.status === "lobby") {
    game.players = game.players.filter((item) => item.id !== id);
    broadcast();
  }
}

function handleHostConnection(conn) {
  net.conns.set(conn.peer, conn);
  conn.on("data", (message) => {
    if (message.type === "join") {
      if (game.status !== "lobby") {
        conn.send({ type: "reject", reason: "La partita e gia iniziata." });
        conn.close();
        return;
      }
      if (game.players.length >= game.maxPlayers) {
        conn.send({ type: "reject", reason: "La stanza e piena." });
        conn.close();
        return;
      }
      addPlayer(conn.peer, message.name);
      conn.send({ type: "welcome", playerId: conn.peer });
      broadcast();
    }

    if (message.type === "answer") {
      submitAnswerFor(conn.peer, message.answer, message.elapsed);
    }
  });
  conn.on("close", () => {
    net.conns.delete(conn.peer);
    removePlayer(conn.peer);
  });
}

function createPeer(id) {
  return new Peer(id, {
    debug: 0,
  });
}

function ensurePeerJs() {
  if (!window.Peer) {
    setStatus("Connessione online non caricata. Ricarica la pagina.");
    return false;
  }
  return true;
}

function createRoom(name, limit) {
  if (!ensurePeerJs()) return;
  const code = makeCode();
  const peerId = roomPeerId(code);
  const cleanLimit = Math.min(12, Math.max(2, Number(limit) || 4));

  setStatus("Creo la stanza...");
  net.role = "host";
  net.playerId = "host";
  net.peer = createPeer(peerId);

  net.peer.on("open", () => {
    game.code = code;
    game.status = "lobby";
    game.round = 0;
    game.players = [];
    game.maxPlayers = cleanLimit;
    game.results = [];
    game.eliminatedId = null;
    game.winnerId = null;
    addPlayer("host", name);
    setStatus("Stanza pronta. Condividi il codice.");
    render();
  });

  net.peer.on("connection", handleHostConnection);
  net.peer.on("error", () => {
    setStatus("Non riesco a creare la stanza. Riprova con un nuovo codice.");
  });
}

function joinRoom(name, code) {
  if (!ensurePeerJs()) return;
  const cleanCode = String(code || "").trim().toUpperCase();
  if (!cleanCode) return;

  setStatus("Entro nella stanza...");
  net.role = "guest";
  net.peer = createPeer();

  net.peer.on("open", () => {
    net.playerId = net.peer.id;
    net.hostConn = net.peer.connect(roomPeerId(cleanCode), { reliable: true });
    net.hostConn.on("open", () => {
      net.hostConn.send({ type: "join", name });
    });
    net.hostConn.on("data", (message) => {
      if (message.type === "reject") {
        setStatus(message.reason);
        net.hostConn.close();
        return;
      }
      if (message.type === "welcome") net.playerId = message.playerId;
      if (message.type === "state") {
        receiveState(message.game);
        setStatus("");
      }
    });
    net.hostConn.on("close", () => setStatus("La stanza e stata chiusa dall'host."));
  });

  net.peer.on("error", () => {
    setStatus("Stanza non trovata o connessione non riuscita.");
  });
}

function startRound() {
  if (net.role !== "host" || activePlayers().length < 2) return;
  game.status = "playing";
  game.round += 1;
  game.prompt = randomPrompt();
  game.startedAt = Date.now();
  game.results = [];
  game.eliminatedId = null;
  game.players.forEach((player) => {
    player.answer = "";
    player.elapsed = null;
  });
  broadcast();
  window.setTimeout(() => {
    if (net.role === "host" && game.status === "playing") finishRound();
  }, roundTime + 350);
}

function submitAnswerFor(playerId, answer, elapsed) {
  if (net.role !== "host" || game.status !== "playing") return;
  const player = game.players.find((item) => item.id === playerId);
  if (!player || !player.active || player.elapsed !== null) return;
  if (!isValidAnswer(answer, game.prompt)) return;
  player.answer = String(answer).trim().slice(0, 40);
  player.elapsed = Math.max(0, Number(elapsed) || Date.now() - game.startedAt);

  if (activePlayers().every((item) => item.elapsed !== null)) {
    finishRound();
  } else {
    broadcast();
  }
}

function finishRound() {
  if (net.role !== "host" || game.status !== "playing") return;
  const ordered = activePlayers().sort((a, b) => {
    const aTime = a.elapsed === null ? Infinity : a.elapsed;
    const bTime = b.elapsed === null ? Infinity : b.elapsed;
    return bTime - aTime;
  });
  const eliminated = ordered[0];
  if (eliminated && ordered.length > 1) {
    eliminated.active = false;
    game.eliminatedId = eliminated.id;
  }
  game.results = ordered.map((player) => ({
    id: player.id,
    name: player.name,
    answer: player.answer,
    elapsed: player.elapsed,
    eliminated: player.id === game.eliminatedId,
  }));

  const remaining = activePlayers();
  if (remaining.length <= 1) {
    game.status = "finished";
    game.winnerId = remaining[0]?.id || null;
  } else {
    game.status = "results";
  }
  broadcast();
}

function sendMyAnswer(answer) {
  const elapsed = Date.now() - game.startedAt;
  if (net.role === "host") {
    submitAnswerFor(net.playerId, answer, elapsed);
    return;
  }
  if (net.hostConn?.open) {
    net.hostConn.send({ type: "answer", answer, elapsed });
  }
}

function renderPlayers(target) {
  target.innerHTML = game.players
    .map((player) => {
      const status = player.active ? (player.elapsed !== null ? "risposto" : "in gioco") : "fuori";
      return `<article class="player ${player.active ? "" : "is-out"}">
        <strong>${escapeHtml(player.name)}</strong>
        <span>${status}</span>
      </article>`;
    })
    .join("");
}

function renderRanking() {
  ranking.innerHTML = game.results
    .map((player, index) => `<li class="rank ${player.eliminated ? "is-out" : ""}">
      <span class="badge">${index + 1}</span>
      <div>
        <strong>${escapeHtml(player.name)}${player.eliminated ? " - eliminato" : ""}</strong>
        <div>${player.answer ? escapeHtml(player.answer) : "nessuna risposta"}</div>
      </div>
      <time>${player.elapsed === null ? "tempo scaduto" : `${(player.elapsed / 1000).toFixed(2)}s`}</time>
    </li>`)
    .join("");
}

function render() {
  roomCode.textContent = game.code || "-----";
  capacityText.textContent = `${game.players.length}/${game.maxPlayers}`;
  startGame.classList.toggle("hidden", net.role !== "host");
  startGame.disabled = activePlayers().length < 2;
  nextRound.classList.toggle("hidden", net.role !== "host");

  if (game.status === "lobby") {
    renderPlayers(lobbyPlayers);
    show("lobby");
  }

  if (game.status === "playing") {
    roundNumber.textContent = `round ${game.round}`;
    promptText.textContent = `${game.prompt[0]} con la ${game.prompt[1]}`;
    renderPlayers(roundPlayers);
    const player = me();
    const canAnswer = Boolean(player?.active && player.elapsed === null);
    answerInput.disabled = !canAnswer;
    answerButton.disabled = !canAnswer;
    hint.textContent = canAnswer ? "Scrivi una risposta valida prima degli altri." : "Risposta inviata, aspetta gli altri.";
    if (canAnswer) answerInput.focus();
    show("round");
  }

  if (game.status === "results") {
    renderRanking();
    show("results");
  }

  if (game.status === "finished") {
    const winner = game.players.find((player) => player.id === game.winnerId);
    winnerText.textContent = winner ? `Ha vinto ${winner.name}!` : "Partita finita";
    show("winner");
  }
}

function updateClock() {
  if (game.status !== "playing") return;
  const remaining = Math.max(0, roundTime - (Date.now() - game.startedAt));
  clock.textContent = `${(remaining / 1000).toFixed(1)}s`;
}

createTab.addEventListener("click", () => {
  createTab.classList.add("is-active");
  joinTab.classList.remove("is-active");
  createForm.classList.remove("hidden");
  joinForm.classList.add("hidden");
});

joinTab.addEventListener("click", () => {
  joinTab.classList.add("is-active");
  createTab.classList.remove("is-active");
  joinForm.classList.remove("hidden");
  createForm.classList.add("hidden");
});

createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createRoom(hostName.value, maxPlayers.value);
});

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  joinRoom(joinName.value, joinCode.value);
});

joinCode.addEventListener("input", () => {
  joinCode.value = joinCode.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
});

roomCode.addEventListener("click", async () => {
  await navigator.clipboard?.writeText(game.code).catch(() => {});
  setStatus("Codice copiato.");
});

startGame.addEventListener("click", startRound);
nextRound.addEventListener("click", startRound);
resetGame.addEventListener("click", () => window.location.reload());

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = answerInput.value.trim();
  if (!isValidAnswer(answer, game.prompt)) {
    answerInput.value = "";
    answerInput.placeholder = `Non vale per "${game.prompt[0]}"`;
    answerInput.focus();
    return;
  }
  sendMyAnswer(answer);
  answerInput.value = "";
  answerInput.disabled = true;
  answerButton.disabled = true;
});

window.setInterval(updateClock, 100);
