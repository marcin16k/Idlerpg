// js/game.js – logika gry Idle RPG

const game = {
  level: 1,
  xp: 0,
  xpMax: 10,
  gold: 0,
  statPoints: 0,
  stats: {
    strength: 0,
    speed: 0,
    crit: 0
  },
  inventory: [],
  skills: []
};

// Losowe potwory
const monsters = [
  "graphics/monster1.png",
  "graphics/monster2.png",
  "graphics/monster3.png"
];

// Losowe itemy
const allItems = [
  { name: "Miecz Żelazny", bonus: "strength", value: 2 },
  { name: "Buty Wiatru", bonus: "speed", value: 2 },
  { name: "Amulet Krytyka", bonus: "crit", value: 2 }
];

// Losowe czary
const allSpells = [
  { name: "Ognista Kula", effect: () => 5 },
  { name: "Lodowy Pocisk", effect: () => 3 }
];

// Walka z potworem
function fight() {
  const baseXP = Math.floor(Math.random() * 10 + 5);
  const baseGold = Math.floor(Math.random() * 5 + 2);

  let bonusXP = baseXP + game.stats.strength;
  let bonusGold = baseGold + game.stats.speed;

  if (Math.random() < game.stats.crit * 0.01) {
    bonusXP *= 2;
    log("🔥 Cios krytyczny! XP podwojone.");
  }

  game.skills.forEach(spell => {
    if (spell.effect) bonusXP += spell.effect();
  });

  game.xp += bonusXP;
  game.gold += bonusGold;

  log(`Zdobyto ${bonusXP} XP i ${bonusGold} złota.`);

  if (game.xp >= game.xpMax) {
    game.xp -= game.xpMax;
    game.level++;
    game.xpMax = Math.floor(game.xpMax * 1.5);
    game.statPoints += 3;
    log(`🆙 Awansowałeś na poziom ${game.level}!`);
  }

  updateUI();
  saveGame();

  // Zmień obrazek potwora
  const monsterImg = document.getElementById("monsterImage");
  const randImg = monsters[Math.floor(Math.random() * monsters.length)];
  monsterImg.src = randImg;
}

// Dodawanie statystyk
function addStat(stat) {
  if (game.statPoints > 0) {
    game.stats[stat]++;
    game.statPoints--;
    updateUI();
    saveGame();
  }
}

// Zakup przedmiotu
function buyItem() {
  if (game.gold < 20) {
    log("Za mało złota!");
    return;
  }

  const item = allItems[Math.floor(Math.random() * allItems.length)];
  if (game.inventory.find(i => i.name === item.name)) {
    log("Już posiadasz ten przedmiot.");
    return;
  }

  game.inventory.push(item);
  game.gold -= 20;
  log(`📦 Zdobyto przedmiot: ${item.name}`);
  updateUI();
  saveGame();
}

// Zakup czaru
function buySpell() {
  if (game.gold < 30) {
    log("Za mało złota!");
    return;
  }

  const spell = allSpells[Math.floor(Math.random() * allSpells.length)];
  if (game.skills.find(s => s.name === spell.name)) {
    log("Już znasz ten czar.");
    return;
  }

  game.skills.push(spell);
  game.gold -= 30;
  log(`🔮 Nauczono czaru: ${spell.name}`);
  updateUI();
  saveGame();
}
