<template>
  <li>
    <h2>userName: {{ name }}</h2>
    <h3>userAge: {{ age }}</h3>
    <button @click="$emit('delete-user', id)">Delete</button>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
  },
  emits: ['delete-user'],
};
</script>
