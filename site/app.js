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
];

const state = {
  code: "",
  round: 0,
  prompt: null,
  startedAt: 0,
  timer: null,
  players: [],
};

const views = {
  setup: document.querySelector("#setup"),
  lobby: document.querySelector("#lobby"),
  round: document.querySelector("#round"),
  results: document.querySelector("#results"),
  winner: document.querySelector("#winner"),
};

const hostName = document.querySelector("#hostName");
const createRoom = document.querySelector("#createRoom");
const roomCode = document.querySelector("#roomCode");
const addPlayerForm = document.querySelector("#addPlayerForm");
const playerName = document.querySelector("#playerName");
const lobbyPlayers = document.querySelector("#lobbyPlayers");
const startGame = document.querySelector("#startGame");
const roundNumber = document.querySelector("#roundNumber");
const promptText = document.querySelector("#prompt");
const clock = document.querySelector("#clock");
const answerBoard = document.querySelector("#answerBoard");
const ranking = document.querySelector("#ranking");
const nextRound = document.querySelector("#nextRound");
const winnerText = document.querySelector("#winnerText");
const resetGame = document.querySelector("#resetGame");

function show(view) {
  Object.entries(views).forEach(([name, element]) => {
    element.classList.toggle("hidden", name !== view);
  });
}

function makeCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
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

function renderLobby() {
  roomCode.textContent = state.code;
  startGame.disabled = state.players.filter((player) => player.active).length < 2;
  lobbyPlayers.innerHTML = state.players
    .map((player) => `<article class="player"><strong>${escapeHtml(player.name)}</strong><span>${player.active ? "in gioco" : "fuori"}</span></article>`)
    .join("");
}

function addPlayer(name) {
  const clean = String(name || "").trim().slice(0, 20);
  if (!clean) return;
  state.players.push({
    id: crypto.randomUUID(),
    name: clean,
    active: true,
    answer: "",
    elapsed: null,
  });
}

function startRound() {
  const active = state.players.filter((player) => player.active);
  if (active.length < 2) return;

  state.round += 1;
  state.prompt = prompts[(state.round - 1) % prompts.length];
  state.startedAt = performance.now();
  state.players.forEach((player) => {
    player.answer = "";
    player.elapsed = null;
  });

  roundNumber.textContent = `round ${state.round}`;
  promptText.textContent = `${state.prompt[0]} con la ${state.prompt[1]}`;
  answerBoard.innerHTML = active
    .map((player) => `<form class="answer" data-id="${player.id}">
      <strong>${escapeHtml(player.name)}</strong>
      <input maxlength="40" autocomplete="off" placeholder="Risposta" />
      <button type="submit">Invia</button>
    </form>`)
    .join("");

  window.clearInterval(state.timer);
  state.timer = window.setInterval(() => {
    clock.textContent = `${((performance.now() - state.startedAt) / 1000).toFixed(1)}s`;
  }, 100);

  show("round");
}

function submitAnswer(form) {
  const player = state.players.find((item) => item.id === form.dataset.id);
  const input = form.querySelector("input");
  const button = form.querySelector("button");
  const answer = input.value.trim();
  if (!player || player.elapsed !== null) return;
  if (!normalize(answer).startsWith(state.prompt[1].toLowerCase())) {
    input.value = "";
    input.placeholder = `Deve iniziare con ${state.prompt[1]}`;
    input.focus();
    return;
  }

  player.answer = answer;
  player.elapsed = performance.now() - state.startedAt;
  input.disabled = true;
  button.disabled = true;
  button.textContent = `${(player.elapsed / 1000).toFixed(2)}s`;

  const active = state.players.filter((item) => item.active);
  if (active.every((item) => item.elapsed !== null)) {
    finishRound();
  }
}

function finishRound() {
  window.clearInterval(state.timer);

  const active = state.players.filter((player) => player.active);
  const ordered = [...active].sort((a, b) => b.elapsed - a.elapsed);
  const eliminated = ordered[0];
  if (eliminated && active.length > 1) eliminated.active = false;

  ranking.innerHTML = ordered
    .map((player, index) => `<li class="rank ${player.id === eliminated.id ? "is-out" : ""}">
      <span class="badge">${index + 1}</span>
      <div>
        <strong>${escapeHtml(player.name)}${player.id === eliminated.id ? " - eliminato" : ""}</strong>
        <div>${escapeHtml(player.answer)}</div>
      </div>
      <time>${(player.elapsed / 1000).toFixed(2)}s</time>
    </li>`)
    .join("");

  const remaining = state.players.filter((player) => player.active);
  if (remaining.length <= 1) {
    winnerText.textContent = remaining[0] ? `Ha vinto ${remaining[0].name}!` : "Partita finita";
    show("winner");
    return;
  }

  show("results");
}

createRoom.addEventListener("click", () => {
  state.code = makeCode();
  state.round = 0;
  state.players = [];
  addPlayer(hostName.value);
  renderLobby();
  show("lobby");
});

roomCode.addEventListener("click", async () => {
  await navigator.clipboard?.writeText(state.code).catch(() => {});
});

addPlayerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addPlayer(playerName.value);
  playerName.value = "";
  renderLobby();
});

startGame.addEventListener("click", startRound);
nextRound.addEventListener("click", startRound);
resetGame.addEventListener("click", () => window.location.reload());

answerBoard.addEventListener("submit", (event) => {
  event.preventDefault();
  submitAnswer(event.target);
});
