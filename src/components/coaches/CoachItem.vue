<template>
  <li>
    <h2>{{ fullName }}</h2>
    <h3>${{ rate }}/hour</h3>
    <div class="wrapper"><base-badge v-for="area in areas" :key="area" :title="area" :type="area"></base-badge></div>
    <div class="controls">
      <base-button :to="coachContactLink" link mode="outline">Contact</base-button>
      <base-button :to="coachDetailsLink" link>View Details</base-button>
    </div>
  </li>
</template>


<script>
import BaseButton from "../UI/BaseButton.vue";
export default {
  components: { BaseButton },
  props: ["id", "firstName", "lastName", "areas", "rate"],
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    coachContactLink(){
        return this.$route.path + '/' + this.id + '/contact'
    },
    coachDetailsLink(){
        return this.$route.path + '/' + this.id 
    }
  },
};
</script>


<style scoped>
li {
  list-style-type: none;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
  width: 100%;
  margin-bottom: 2rem;
  margin-left: -2.2rem;
}

.controls {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.wrapper{
  display: flex;
  justify-content: start;
  flex-wrap: wrap;

}

</style>