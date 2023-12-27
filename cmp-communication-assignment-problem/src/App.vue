<template>
  <section>
    <ul>
      <active-user
        v-for="user in users"
        :key="user.id"
        :id="user.id"
        :name="user.name"
        :age="user.age"
        @delete-user="deleteUser"
      ></active-user>
    </ul>
    <user-data @add-user="addUser"></user-data>
  </section>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    addUser(userName, userAge) {
      const newUser = {
        id: new Date().toISOString(),
        name: userName,
        age: userAge,
      };
      this.users.push(newUser);
    },
    deleteUser(userId) {
      const newUser = this.users.filter((user) => user.id !== userId);
      this.users = newUser;
    },
  },
};
</script>

<style>
#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app li,
#app form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}
</style>
