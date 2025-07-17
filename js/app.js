let player = {
  email: '',
  nickname: '',
  class: '',
  level: 1,
  xp: 0,
  xpToNext: 10,
  gold: 0,
};

function login() {
  const email = document.getElementById('email').value;
  const nickname = document.getElementById('nickname').value;

  if (email && nickname) {
    player.email = email;
    player.nickname = nickname;
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('class-selection').classList.remove('hidden');
  } else {
    alert('Wpisz email i nick!');
  }
}

function chooseClass(chosenClass) {
  player.class = chosenClass;
  document.getElementById('class-selection').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  document.getElementById('player-nick').textContent = player.nickname;
  document.getElementById('player-class').textContent = player.class;
  updateStats();
}

function attackMonster() {
  const dmg = Math.floor(Math.random() * 5 + 1) + player.level;
  const goldEarned = Math.floor(Math.random() * 5 + 2);
  const xpEarned = 2 + Math.floor(Math.random() * 3);

  player.gold += goldEarned;
  player.xp += xpEarned;

  const log = `🧟 Potwór pokonany! Zadałeś ${dmg} dmg. Zdobyto ${goldEarned} złota i ${xpEarned} XP.`;
  document.getElementById('battle-log').innerHTML = log;

  if (player.xp >= player.xpToNext) {
    player.level++;
    player.xp = player.xp - player.xpToNext;
    player.xpToNext = Math.floor(player.xpToNext * 1.5);
  }

  updateStats();
}

function updateStats() {
  document.getElementById('level').textContent = player.level;
  document.getElementById('xp').textContent = player.xp;
  document.getElementById('xpToNext').textContent = player.xpToNext;
  document.getElementById('gold').textContent = player.gold;
}
