const app = Vue.createApp({
  data() {
    return {
      inputClasses: "",
      inputStyle: "",
      isHidden: false,
    };
  },
  computed: {
    inputClass() {
      if (this.inputClasses === "user1" || this.inputClasses === "user2") {
        return this.inputClasses;
      }
    },
  },
  methods: {
    hideShowToggle() {
      this.isHidden = !this.isHidden;
    },
  },
});

app.mount("#assignment");
