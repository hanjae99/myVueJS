<template>
  <!-- 여러개의 자식요소에 공통 애니메이션 적용시 transition-group 사용 -->
  <transition-group tag="ul" name="user-list">
    <li v-for="user in users" :key="user" @click="removeUser(user)">{{ user }}</li>
  </transition-group>
  <div>
    <input type="text" ref="userNameInput" @keyup.enter="addUser"/>
    <button @click="addUser">Add User</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: ['Max', 'Manu', 'Julie', 'Angela', 'Michael']
    }
  },
  methods: {
    addUser() {
      this.users.unshift(this.$refs.userNameInput.value);
      this.$refs.userNameInput.value = '';
    },
    removeUser(user) {
      this.users = this.users.filter((oriUser) => oriUser !== user);
    },
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  border-radius: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  text-align: center;
}

.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.user-list-enter-active {
  transition: all 1s ease-out;
}

.user-list-leave-active {
  transition: all 1s ease-in;
  position: absolute;
}

.user-list-enter-to,
.user-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* transition-group 은 보이지 않지만 여러개의 요소의 애니메이션을 관리중
이때 요소의 추가, 삭제를 대비해 내부적으로 transform 을 사용하고 있음 */
.user-list-move {
  transition: transform 0.5s ease;
}
</style>
