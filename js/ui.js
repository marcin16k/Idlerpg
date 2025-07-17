// js/ui.js – aktualizacja interfejsu gry

function updateUI() {
  document.getElementById("level").innerText = game.level;
  document.getElementById("xp").innerText = game.xp;
  document.getElementById("xpMax").innerText = game.xpMax;
  document.getElementById("gold").innerText = game.gold;

  document.getElementById("strength").innerText = game.stats.strength;
  document.getElementById("speed").innerText = game.stats.speed;
  document.getElementById("crit").innerText = game.stats.crit;
  document.getElementById("statPoints").innerText = game.statPoints;

  // Przedmioty
  const invList = document.getElementById("inventory");
  invList.innerHTML = "";
  game.inventory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (+${item.value} ${item.bonus})`;
    invList.appendChild(li);
  });

  // Czary
  const spellsList = document.getElementById("spells");
  spellsList.innerHTML = "";
  game.skills.forEach(spell => {
    const li = document.createElement("li");
    li.textContent = `${spell.name}`;
    spellsList.appendChild(li);
  });
}

function log(msg) {
  const box = document.getElementById("logBox");
  box.innerHTML += msg + "<br>";
  box.scrollTop = box.scrollHeight;
}

// Uruchomienie po załadowaniu
window.onload = () => {
  loadGame();
  updateUI();
};
