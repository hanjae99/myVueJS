const app = Vue.createApp({
  data() {
    return {
      userInput1: "",
      userInput2: "",
    };
  },
  methods: {
    showAlert() {
      alert("Hello I'm alert!");
    },
    handleInput1(e) {
      this.userInput1 = e.target.value;
    },
    handleInput2(e) {
      this.userInput2 = e.target.value;
    },
  },
});

app.mount("#assignment");
