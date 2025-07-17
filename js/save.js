// js/save.js – zapisywanie i wczytywanie gry

function saveGame() {
  localStorage.setItem("idleRpgSave", JSON.stringify(game));
}

function loadGame() {
  const saved = localStorage.getItem("idleRpgSave");
  if (saved) {
    Object.assign(game, JSON.parse(saved));
  }
}

// Zapisz nazwę gracza osobno (po kliknięciu)
function saveUsername() {
  const nameInput = document.getElementById("username");
  const name = nameInput.value.trim();
  if (name) {
    game.username = name;
    saveGame();
    updateUI();
    log(`👤 Nazwa gracza ustawiona: ${name}`);
  }
}
