<template>
  <button @click="confirmInput">confirm</button>
  <button @click="saveChanges">Save Change</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      changeSaved: false
    }
  },
  methods: {
    confirmInput() {
      this.$router.push('/teams'); // router history 에 /teams 경로 추가 및 이동 (프로그램 자체 이동)

      // 브라우저 앞, 뒤로가기
      // this.$router.forward();
      // this.$router.back();
    },
    saveChanges() {
      this.changeSaved = true;
    }
  },
  // 컴포넌트 내에서 내비게이션 가드 설정 가능
  beforeRouteEnter(to, from, next) {
    console.log('UsersList component beforeRouteEnter');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UsersList cmp beforeRouteLeave');
    console.log(to, from);

    if (this.changeSaved){
      next();
    } else {
      const userWantsToLeave = confirm('You got unsaved change, are you sure leave this page?');
      next(userWantsToLeave);
    }
  },
  unmounted() {
    console.log('unmounted');
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>