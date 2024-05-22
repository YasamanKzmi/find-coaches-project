<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component> 
    </transition>
  </router-view>
</template>


<script>
import TheHeader from './components/layout/TheHeader.vue';
export default {
  components:{
    'the-header': TheHeader,
  },
  computed:{
    didAutoLogout(){
      return this.$store.getters.didAutoLogout
    }
  },
  created(){
    this.$store.dispatch('tryLogin')
  },
  watch:{
    didAutoLogout(curVal, oldVal){
      if(curVal && curVal !== oldVal){
        this.$router.replace('/coaches')
      }
    }

  }
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

html,
body {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0px;
  padding: 0px;
}
html {
  font-family: "Roboto", "sense-serif";
}
.route-enter-from{
  opacity: 0;
  transform: translateY(-30px);

}
.route-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active{
transition: all 0.3s ease-out;
}
.route-leave-active{
  transition: all 0.3s ease-in;
}
.route-enter-to, .route-leave-from{
  opacity: 1;
  transform: translateY(0);

}

</style>