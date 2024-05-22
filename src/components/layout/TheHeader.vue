<template>
  <header>
    <nav>
      <h2><router-link to="/">Find a coach</router-link></h2>

      <ul>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/requests">Requests</router-link></li>
        <li v-else><router-link to="/auth?redirect=coaches">Login</router-link></li>
        <li v-if="isLoggedIn"><base-button @click="logout">Logout</base-button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed:{
    isLoggedIn(){
      return this.$store.getters.isAuthenticated
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      this.$router.replace('/coaches')
    }
  }
}
</script>


<style scoped>
nav {
  background-color: rgb(1, 1, 103);
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
ul{
    display: flex;
    align-items: center;
}
li {
  list-style-type: none;
  display: inline-block;
  margin-right: 2rem;

}
a {
  color: white;
  text-decoration: none;
}
.router-link-active{
    border: 1px solid white;
    padding: 1rem 1rem;
}

@media (max-width: 750px) {
   .router-link-active{
    padding: 0.3rem 0.4rem;

   } 
}
@media (max-width: 500px) {
  nav{
    flex-direction: column;
    justify-content: center;
    align-items: center;
   }
  }

</style>