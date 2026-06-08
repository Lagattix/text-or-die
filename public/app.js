const setup = document.querySelector("#setup");
const game = document.querySelector("#game");
const createTab = document.querySelector("#createTab");
const joinTab = document.querySelector("#joinTab");
const createForm = document.querySelector("#createForm");
const joinForm = document.querySelector("#joinForm");
const createName = document.querySelector("#createName");
const joinName = document.querySelector("#joinName");
const joinCode = document.querySelector("#joinCode");
const toast = document.querySelector("#toast");
const roomCode = document.querySelector("#copyCode");
const roundLabel = document.querySelector("#roundLabel");
const lobby = document.querySelector("#lobby");
const playing = document.querySelector("#playing");
const results = document.querySelector("#results");
const finished = document.querySelector("#finished");
const playersLobby = document.querySelector("#playersLobby");
const livePlayers = document.querySelector("#livePlayers");
const startButton = document.querySelector("#startButton");
const nextButton = document.querySelector("#nextButton");
const newGame = document.querySelector("#newGame");
const promptText = document.querySelector("#promptText");
const answerForm = document.querySelector("#answerForm");
const answerInput = document.querySelector("#answerInput");
const answerHint = document.querySelector("#answerHint");
const timerText = document.querySelector("#timerText");
const timerFill = document.querySelector("#timerFill");
const ranking = document.querySelector("#ranking");
const finalRanking = document.querySelector("#finalRanking");
const winnerText = document.querySelector("#winnerText");

let state = {
  code: localStorage.getItem("fuo_room_code") || "",
  playerId: localStorage.getItem("fuo_player_id") || "",
  room: null,
  poll: null,
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.add("hidden"), 2600);
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || "Errore");
    error.data = data;
    throw error;
  }
  return data;
}

function setSession(playerId, room) {
  state.playerId = playerId;
  state.code = room.code;
  state.room = room;
  localStorage.setItem("fuo_player_id", playerId);
  localStorage.setItem("fuo_room_code", room.code);
  setup.classList.add("hidden");
  game.classList.remove("hidden");
  render();
  startPolling();
}

function startPolling() {
  window.clearInterval(state.poll);
  state.poll = window.setInterval(fetchRoom, 900);
  fetchRoom();
}

async function fetchRoom() {
  if (!state.code) return;
  try {
    const data = await api(`/api/room/${state.code}`);
    state.room = data.room;
    render();
  } catch (error) {
    if (error.message.includes("non trovata")) {
      window.clearInterval(state.poll);
      localStorage.removeItem("fuo_player_id");
      localStorage.removeItem("fuo_room_code");
    }
  }
}

function currentPlayer() {
  return state.room?.players.find((player) => player.id === state.playerId);
}

function isHost() {
  return state.room?.hostId === state.playerId;
}

function formatMs(ms) {
  if (!Number.isFinite(ms)) return "nessuna risposta";
  return `${(ms / 1000).toFixed(2)}s`;
}

function playerCard(player) {
  const status = player.active ? (player.answer?.accepted ? "risposto" : "in gioco") : "fuori";
  return `<article class="player ${player.active ? "" : "is-out"}">
    <span>${escapeHtml(player.name)}</span>
    <small>${status}</small>
  </article>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  const room = state.room;
  if (!room) return;

  roomCode.textContent = room.code;
  roundLabel.textContent = room.round;
  lobby.classList.toggle("hidden", room.status !== "lobby");
  playing.classList.toggle("hidden", room.status !== "playing");
  results.classList.toggle("hidden", room.status !== "results");
  finished.classList.toggle("hidden", room.status !== "finished");
  startButton.classList.toggle("hidden", !isHost());
  nextButton.classList.toggle("hidden", !isHost());

  const activeCount = room.players.filter((player) => player.active).length;
  startButton.disabled = activeCount < 2;
  playersLobby.innerHTML = room.players.map(playerCard).join("");
  livePlayers.innerHTML = room.players.map(playerCard).join("");

  if (room.status === "playing") {
    const prompt = room.prompt;
    promptText.textContent = `${prompt.category} con la ${prompt.letter}`;
    updateTimer();
    const me = currentPlayer();
    const canAnswer = me?.active && !me?.answer?.accepted;
    answerInput.disabled = !canAnswer;
    answerForm.querySelector("button").disabled = !canAnswer;
    answerHint.textContent = me?.answer?.accepted
      ? `Risposta inviata in ${formatMs(me.answer.elapsedMs)}.`
      : me?.active
        ? "Conta solo la velocita: appena invii una risposta valida, il cronometro si ferma."
        : "Sei stato eliminato, puoi seguire il round.";
    if (canAnswer) answerInput.focus();
  }

  if (room.status === "results") {
    renderRanking(room, ranking);
  }

  if (room.status === "finished") {
    const winner = room.players.find((player) => player.id === room.winnerId);
    winnerText.textContent = winner ? `Ha vinto ${winner.name}!` : "Partita finita";
    renderRanking(room, finalRanking);
  }
}

function updateTimer() {
  const room = state.room;
  if (!room || room.status !== "playing") return;
  const elapsed = Date.now() - room.roundStartedAt;
  const remaining = Math.max(0, room.roundTimeLimit - elapsed);
  const pct = Math.max(0, remaining / room.roundTimeLimit);
  timerText.textContent = (remaining / 1000).toFixed(1);
  timerFill.style.transform = `scaleX(${pct})`;
}

function renderRanking(room, target) {
  const sorted = [...room.players]
    .filter((player) => player.active || player.id === room.eliminatedThisRound)
    .sort((a, b) => {
      const aMs = a.answer?.accepted ? a.answer.elapsedMs : Number.POSITIVE_INFINITY;
      const bMs = b.answer?.accepted ? b.answer.elapsedMs : Number.POSITIVE_INFINITY;
      if (aMs !== bMs) return bMs - aMs;
      return a.joinedAt - b.joinedAt;
    });

  target.innerHTML = sorted
    .map((player, index) => {
      const eliminated = player.id === room.eliminatedThisRound;
      const answer = player.answer?.text ? `"${escapeHtml(player.answer.text)}"` : "nessuna risposta";
      return `<li class="rank ${eliminated ? "is-eliminated" : ""}">
        <span class="rank__pos">${index + 1}</span>
        <div>
          <strong>${escapeHtml(player.name)}${eliminated ? " - eliminato" : ""}</strong>
          <div class="rank__answer">${answer}</div>
        </div>
        <time>${formatMs(player.answer?.accepted ? player.answer.elapsedMs : Infinity)}</time>
      </li>`;
    })
    .join("");
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

createForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const data = await api("/api/create", {
      method: "POST",
      body: JSON.stringify({ name: createName.value }),
    });
    setSession(data.playerId, data.room);
    showToast("Stanza creata. Condividi il codice.");
  } catch (error) {
    showToast(error.message);
  }
});

joinForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const data = await api("/api/join", {
      method: "POST",
      body: JSON.stringify({ name: joinName.value, code: joinCode.value }),
    });
    setSession(data.playerId, data.room);
    showToast("Sei dentro.");
  } catch (error) {
    showToast(error.message);
  }
});

startButton.addEventListener("click", async () => {
  try {
    const data = await api("/api/start", {
      method: "POST",
      body: JSON.stringify({ code: state.code, playerId: state.playerId }),
    });
    state.room = data.room;
    render();
  } catch (error) {
    showToast(error.message);
  }
});

nextButton.addEventListener("click", () => startButton.click());

answerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const data = await api("/api/answer", {
      method: "POST",
      body: JSON.stringify({ code: state.code, playerId: state.playerId, answer: answerInput.value }),
    });
    answerInput.value = "";
    state.room = data.room;
    render();
  } catch (error) {
    if (error.data?.room) state.room = error.data.room;
    showToast(error.message);
    render();
  }
});

roomCode.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(state.code);
    showToast("Codice copiato.");
  } catch {
    showToast(`Codice: ${state.code}`);
  }
});

newGame.addEventListener("click", () => {
  localStorage.removeItem("fuo_player_id");
  localStorage.removeItem("fuo_room_code");
  window.location.reload();
});

joinCode.addEventListener("input", () => {
  joinCode.value = joinCode.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
});

window.setInterval(updateTimer, 100);

if (state.code && state.playerId) {
  setup.classList.add("hidden");
  game.classList.remove("hidden");
  startPolling();
}
