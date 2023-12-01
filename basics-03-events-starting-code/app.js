const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      confirmedName: "",
    };
  },
  methods: {
    add(num) {
      this.counter += num;
    },
    reduce(num) {
      this.counter -= num;
    },
    setName(e) {
      this.name = e.target.value;
    },
    submitForm(e) {
      // e.preventDefault();
      alert("submitted!");
    },
    confirmName() {
      this.confirmedName = this.name;
    },
  },
});

app.mount("#events");
