const app = Vue.createApp({
  data() {
    return {
      myName: "PoRly",
      myAge: 25,
      myImg:
        "https://i.seadn.io/gae/fk0J30zdCm-QszMExaws1o5nftXA0iklsk1x8PFMI1eIMH97s9JGTqpu_tJQoX3D5VRGrL0DNGh27UKs6lmqaK96ydHtk2eSOp3H0Oo?auto=format&dpr=1&w=1000",
    };
  },
  methods: {
    getRandNum() {
      return Math.random();
    },
  },
});

app.mount("#assignment");
