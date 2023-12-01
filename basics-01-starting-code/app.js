const app = Vue.createApp({
  data() {
    return {
      courseGoalA: "Vue 마스터하기!",
      // courseGoalB: "<h2>Vue 배워서 애플리케이션 만들기!</h2>",
      courseGoalB: "Vue 배워서 애플리케이션 만들기!",
      vueLink: "https://vuejs.org/",
    };
  },
  methods: {
    outputGoal() {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return this.courseGoalB;
      } else {
        return this.courseGoalA;
      }
    },
  },
});

app.mount("#user-goal");
