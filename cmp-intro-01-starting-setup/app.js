const app = Vue.createApp({
  data() {
    return {
      friends: [
        {
          id: "hong",
          name: "kildong",
          phone: "12331 123 1234",
          email: "kildong@name.com",
        },
        {
          id: "kim",
          name: "cheolsu",
          phone: "23431 522 6323",
          email: "cheolsu@name.com",
        },
      ],
    };
  },
});

app.component("friend-contact", {
  template: `
    <li>
          <h2>{{ friend.name }}</h2>
          <button @click="toggleDetails()">
            {{ detailsAreVisible ? "Hide" : "Show" }} Details
          </button>
          <ul v-if="detailsAreVisible">
            <li><strong>Phone:</strong> {{ friend.phone }}</li>
            <li><strong>Email:</strong> {{ friend.email }}</li>
          </ul>
        </li>
  `,
  data() {
    return {
      detailsAreVisible: false,
      friend: {
        id: "hong",
        name: "sohee",
        phone: "12331 123 1234",
        email: "kildong@name.com",
      },
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  },
});

app.mount("#app");
