<template>
  <div>
  <form @submit.prevent="submitForm">
    <div>
      <label for="email">Your E-Mail</label>
      <input type="email" id="email" v-model="email"/>
    </div>

    <div>
      <label for="message">Message</label>
      <textarea id="message" rows="5" v-model="message"></textarea>
      <p v-if="!formIsValid">Please enter a valid email address and a non-empty message.</p>
    </div>

    <div class="controls">
      <base-button>Send Message</base-button>
    </div>
  </form>
</div>
</template>

<script>
export default {
    data(){
        return{
            email: '',
            message:'',
            formIsValid: true
        }

    },
  methods: {
    submitForm() {
        this.formIsValid= true
        if(this.email ==='' || !this.email.includes('@') || this.message === ''){
            this.formIsValid = false
            return
        }
        this.$store.dispatch('requests/contactCoach', {
            email: this.email,
            message: this.message,
            coachId: this.$route.params.id
        })
        this.$router.replace('/coaches')

    },
  },
};
</script>


<style scoped>
form {
  padding: 2rem;
  margin: 1rem;
  border: 1px solid rgb(190, 188, 188);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
input,
textarea {
  display: block;
  margin-top: 0.5rem;
  width: 100%;
}
div {
  margin: 1rem;
  width: 100%;
}
.controls {
  display: flex;
  justify-content: center;
}
label {
  font-weight: bold;
}
p{
    color: red;
    font-weight: bold;
}
</style>