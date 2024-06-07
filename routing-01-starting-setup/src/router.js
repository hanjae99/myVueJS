import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' }, // redirect => URL 도 변경됨
    // { path: '/teams', component: TeamsList, alias: '/' }, // alias => URL 변경 안됨
    {
      name: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        }, // nested route (중첩 라우터) ex) /teams/t1
      ],
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
      // 개별 route 에서도 내비게이션 가드 설정 가능
      beforeEnter(to, from, next) {
        console.log('users beforeEnter');
        console.log(to, from);
        next();
      },
    },
    { path: '/:notFound(.*)', component: NotFound }, // 존재하지 않는 경로 입력시 메인으로 이동
  ],
  // scrollBehavior 메소드는 이동할 페이지에서의 스크롤 위치를 나타내는 객체를 반환해야 함
  scrollBehavior(_, _2, savedPosition) {
    // to : 이동한 페이지에 대한 정보
    // from : 이전 페이지에 대한 정보
    // savedPosition : 페이지 내의 스크롤 위치 정보
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach(function (to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  // next({name: 'team-members', params: { teamId: 'hello' }});
  // next(false);
  // 페이지 이동을 취소하거나, 문자열 또는 내비게이션 객체를 전달하여 원하는 route 로 이동시킬 수 있음

  // meta 프로퍼티를 활용해 인증 수행등 추가 작업이 가능
  if (to.meta.needsAuth) {
    console.log('Need Auth');
    next();
  } else {
    next();
  }
});

// beforeEach 훅 이후 실행
// 이미 이동이 허가되거나 거부되었으므로 이동제어는 불가능하고
// 액션에 대한 정보 전달 가능
// (사용자의 페이지 변경 로그 기록..)
router.afterEach(function(to, from) {
  console.log('Global afterEach');
  console.log(to, from);
})


export default router;