<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <register-coach @save-data="saveData"></register-coach>
    </base-card>
  </section>
</template>

<script>
import RegisterCoach from "@/components/coaches/RegisterCoach.vue";
export default {
  components: {
    "register-coach": RegisterCoach,
  },
  methods:{
    saveData(formData){
     this.$store.dispatch('coaches/registerCoach', formData)
     this.$router.replace('/coaches')
    }
  }
};
</script>

