const app = Vue.createApp({
  data() {
    return {
      task: [],
      inputTask: "",
      isListHidden: false,
    };
  },
  methods: {
    addTask() {
      this.task.push(this.inputTask);
      this.inputTask = "";
    },
    removeTask(index) {
      this.task.splice(index, 1);
    },
    listHideToggle() {
      this.isListHidden = !this.isListHidden;
    },
  },
});

app.mount("#assignment");
