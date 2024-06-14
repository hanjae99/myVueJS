import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import BaseModal from './components/BaseModal.vue';

const app = createApp(App);

app.use(router);

app.component('base-modal', BaseModal);

// 초기 '/' 라우트에서 빈 페이지를 거쳤다 가지 말고
// 찾아갈 컴포넌트로 준비가 되었을 때 마운트하도록 설정
// => router 간 애니메이션 적용 시 초기에 애니메이션 작동을 막아줌
router.isReady().then(function() {
  app.mount('#app');
});
