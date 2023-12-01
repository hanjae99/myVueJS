const app = Vue.createApp({
  data() {
    return {
      num: 0,
      isTimerSetted: false,
    };
  },
  watch: {
    num(value) {
      const data = this;
      if (value !== 0 && !data.isTimerSetted) {
        data.isTimerSetted = true;
        setTimeout(function () {
          data.num = 0;
          data.isTimerSetted = false;
        }, 5000);
      }
    },
  },
  computed: {
    showResult() {
      if (this.num < 37) {
        return "Not there yet..";
      } else if (this.num > 37) {
        return "Too much!";
      }
      return "Perfect!";
    },
  },
  methods: {
    add5() {
      this.num += 5;
    },
    add1() {
      this.num += 1;
    },
  },
});

app.mount("#assignment");
