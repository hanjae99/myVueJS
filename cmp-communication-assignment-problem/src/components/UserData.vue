<template>
  <form @submit.prevent="$emit('add-user', enteredName, enteredAge)">
    <div>
      <label>name</label>
      <input type="text" v-model="enteredName" />
    </div>
    <div>
      <label>age</label>
      <input type="text" v-model="enteredAge" />
    </div>
    <button type="submit">Add User</button>
  </form>
</template>

<script>
export default {
  emits: ['add-user'],
  data() {
    return {
      enteredName: '',
      enteredAge: '',
    };
  },
};
</script>

<style>
#app label {
  font-weight: bold;
  margin-right: 1rem;
  width: 3rem;
  display: inline-block;
}
#app form div {
  margin: 1rem 0;
}
</style>
