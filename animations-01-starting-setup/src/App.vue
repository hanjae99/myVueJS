<template>
  <!-- <div class="container">
    <users-list></users-list>
  </div>
  <div class="container"> -->
    <!-- block 일 경우 기존 css 만으로도 애니메이션 효과 충분 -->
    <!-- <div class="block" :class="{ animate: animatedBlock }"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container"> -->
    <!-- v-if 와 같이 DOM 상에서 실제 붙였다 떼어지는 경우 transition 컴포넌트 활용 -->
    <!-- <transition
      name="para"
      :css="false"
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
      @enter-cancelled="enterCancelled"
      @leave-cancelled="leaveCancelled"
    >
      <p v-if="paraIsVisible">This is only sometimes visible...</p>
    </transition>
    <button @click="toggleParagraph">Toggle Paragraph</button>
  </div>
  <div class="container"> -->
    <!-- transition 내의 자식요소중 하나가 DOM 에서 제외될 때
    바로 대체 가능한 다른 자식요소가 있을 경우 하나 이상의 자식 소유 가능 -->
    <!-- mode 속성을 활용해 먼저 애니메이션 효과를 적용받을 대상을 선택 가능(in-out or out-in) -->
    <!-- <transition name="fadeBtn" mode="out-in">
      <button @click="showUsers" v-if="!usersAreVisible">Show Users</button>
      <button @click="hideUsers" v-else>Hide Users</button>
    </transition>
  </div>
  <base-modal @close="hideDialog" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div> -->

  <router-view v-slot="slotProps">
    <transition name="fadeBtn" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
// import UsersList from './components/UsersList.vue';

export default {
  // components: {
  //   UsersList
  // },
  data() {
    return {
      dialogIsVisible: false,
      animatedBlock: false,
      paraIsVisible: false,
      usersAreVisible: false,
      enterInterval: null,
      leaveInterval: null
    };
  },
  methods: {
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    animateBlock() {
      this.animatedBlock = !this.animatedBlock;
    },
    toggleParagraph() {
      this.paraIsVisible = !this.paraIsVisible;
    },
    showUsers() {
      this.usersAreVisible = true;
    },
    hideUsers() {
      this.usersAreVisible = false;
    },
    beforeEnter(element) {
      console.log('beforeEnter');
      console.log(element);

      // 자바스크립트를 이용해 애니메이션 구축
      element.style.opacity = 0;
    },
    beforeLeave(element) {
      console.log('beforeLeave');
      console.log(element);

      element.style.opacity = 1;
    },
    enter(element, done) {
      console.log('enter');
      console.log(element);

      let round = 1;
      this.enterInterval = setInterval(() => {
        element.style.opacity = round * 0.01;
        round++;

        if (round > 100) {
          clearInterval(this.enterInterval);
          done();
        }
      }, 20);
    },
    afterEnter(element) {
      console.log('afterEnter');
      console.log(element);
    },
    leave(element, done) {
      console.log('leave');
      console.log(element);

      let round = 1;
      this.leaveInterval = setInterval(() => {
        element.style.opacity = 1 - round * 0.01;
        round++;

        if (round > 100) {
          clearInterval(this.leaveInterval);
          done();
        }
      }, 20);
    },
    afterLeave(element) {
      console.log('afterLeave');
      console.log(element);
    },
    enterCancelled(element) {
      console.log('enterCancelled');
      console.log(element);
      clearInterval(this.enterInterval);
    },
    leaveCancelled(element) {
      console.log('leaveCancelled');
      console.log(element);
      clearInterval(this.leaveInterval);
    }
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* transition: transform 0.3s ease-out; */
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}
.animate {
  /* transform: translateX(-150px); */
  animation: slide-scale 0.3s ease-out forwards;
}
/*
/*transition 컴포넌트가 마운트 될때 일시적으로 추가되고, 제거됨 */
/* .para-enter-from {
  opacity: 0;
  transform: translateY(-30px);
} */

/* .para-enter-active {
  transition: all 0.3s ease-out;
  animation: slide-scale 2s ease-out;
} */

/* .para-enter-to {
  opacity: 1;
  transform: translateY(0);
} */

/* transition 컴포넌트가 언마운트 될때 일시적으로 추가되고, 제거됨
애니메이션이 끝나기 전까지 컴포넌트 언마운트 되지 않음! */
/* .para-leave-from {
  opacity: 1;
  transform: translateY(0);
} */

/* .para-leave-active {
  transition: all 0.3s ease-in;
  animation: slide-scale 0.3s ease-out;
} */

/* .para-leave-to {
  opacity: 0;
  transform: translateY(-30px);
} */

.fadeBtn-enter-from,
.fadeBtn-leave-to {
  opacity: 0;
}

.fadeBtn-enter-active {
  transition: opacity 0.3s ease-out;
}

.fadeBtn-leave-active {
  transition: opacity 0.3s ease-in;
}

.fadeBtn-enter-to,
.fadeBtn-leave-from {
  opacity: 1;
}

/* router 애니메이션 적용 */
/* .router-enter-from */

.router-enter-active {
  animation: slide-scale 0.4s ease-out;
}

.router-leave-active {
  animation: slide-scale 0.4s ease-in;
}

/* .router-enter-to */

@keyframes slide-scale {
  0% {
    transform: translateX(0) scale(1);
  }

  70% {
    transform: translateX(-120px) scale(1.1);
  }

  100% {
    transform: translateX(-150px) scale(1);
  }
}
</style>
