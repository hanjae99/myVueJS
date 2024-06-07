<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  props: ['teamId'], // router 에 묶이지 않고 props 만 제공된다면 TeamMembers 컴포넌트는 어디에도 활용될 수 있다! => 유연성, 확장성 증가
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    loadTeamMembers(teamId) {
      // console.log(this.$route.path) // 전체 경로 ex) /teams/t1
      // console.log(this.$route.params) // route 의 동적 매개변수 목록 
      // const teamId = route.params.teamId; // route 의 동적 매개변수에 접근 가능
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];

      for (const member of members) {
        const selectedMember = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedMember);
      }

      this.teamName = selectedTeam.name;
      this.members = selectedMembers;
    },
  },
  created() {
    this.loadTeamMembers(this.teamId);
  },
  // 재사용되는 (다른 route 와 같이 계속 로드되는) 때에 호출됨
  beforeRouteUpdate(to, from, next) {
    console.log('TeamMem cmp beforeRouteUpdate');
    console.log(to, from);
    next();
  },
  watch: {
    teamId(newId) {
      this.loadTeamMembers(newId);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
