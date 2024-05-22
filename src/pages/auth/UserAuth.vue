<template>
  <div>
    <base-dialogue
      :show="!!error"
      title="An error occured!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialogue>

    <base-dialogue :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialogue>

    <form @submit.prevent="SubmitForm">
      <base-card>
        <div class="controls">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="controls">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">Incorrect email or password!</p>
        <base-button>{{ switchButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </base-card>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    switchButtonCaption() {
      if (this.mode === "login") {
        return "login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login Instead";
      }
    },
  },
  methods: {
    async SubmitForm() {

      this.formIsValid = true;

      if (
        this.email == "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };


      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        // redirect after login/signup
        const redirectUrl = '/' + this.$route.query.redirect || 'coaches'
        this.$router.replace(redirectUrl)
      } catch (err) {
        this.error = err.message || "Failed to authenticate";
      }
      
      this.isLoading = false;
    },

    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "Signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>


<style scoped>
form {
  padding: 2rem;
  margin: 1rem;
}
input {
  display: block;
  margin-top: 0.3rem;
  width: 100%;
}
.controls {
  margin: 1rem;
}
label {
  font-weight: bold;
}
p {
  color: red;
  margin: 1rem;
}
</style>