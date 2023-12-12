function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; //min ~ max 사이 임의의 값
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      lastSpecialAttackRound: 0,
      winner: null,
      battleLog: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      // return this.currentRound % 3 !== 0;
      return this.currentRound < this.lastSpecialAttackRound + 2;
    },
  },
  watch: {
    monsterHealth(val) {
      if (val <= 0 && this.playerHealth <= 0) {
        // 무승부
        this.winner = "draw";
      } else if (val <= 0) {
        // 몬스터 패
        this.winner = "player";
      }
    },
    playerHealth(val) {
      if (val <= 0 && this.monsterHealth <= 0) {
        // 무승부
        this.winner = "draw";
      } else if (val <= 0) {
        // 플레이어 패
        this.winner = "monster";
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addLog("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLog("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLog("player", "special-attack", attackValue);
      this.attackPlayer();
      this.lastSpecialAttackRound = this.currentRound;
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLog("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
      this.addLog("player", "surrender", null);
    },
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.lastSpecialAttackRound = 0;
      this.winner = null;
      this.battleLog = [];
    },
    addLog(who, what, value) {
      this.battleLog.unshift({
        actionBy: who,
        actionType: what,
        value,
      });
    },
  },
});

app.mount("#game");
