<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !firstName.isValid}">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        value="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidation('firstName')"
      />
      <p v-if="!firstName.isValid">FirstName must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid: !lastName.isValid}">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        value="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidation('lastName')"
      />
      <p v-if="!lastName.isValid">LastName must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid: !description.isValid}">
      <label for="decription">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidation('description')"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid: !rate.isValid}">
      <label for="rate">HourlyRate</label>
      <input type="number" id="rate" value="rate" v-model.trim="rate.val" @blur="clearValidation('rate')"/>
      <p v-if="!rate.isValid">Rate must be greater than 0</p>
    </div>
    <div class="expertise">
      <h3>Areas of experties</h3>
      <div :class="{invalid: !areas.isValid}">
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model.trim="areas.val"
          @blur="clearValidation('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div :class="{invalid: !areas.isValid}">
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model.trim="areas.val"
          @blur="clearValidation('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div :class="{invalid: !areas.isValid}">
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model.trim="areas.val"
          @blur="clearValidation('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <base-button>Register</base-button>
    </div>
  </form>
</template>


<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidation(input){
      this[input].isValid = true

    },
    formValidation() {
      this.formIsValid = true
      if (this.firstName.val === "") {
        this.formIsValid = false;
        this.firstName.isValid = false;
      }
      if (this.lastName.val === "") {
        this.formIsValid = false;
        this.lastName.isValid = false;
      }
      if (this.description.val === "") {
        this.formIsValid = false;
        this.description.isValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.formIsValid = false;
        this.rate.isValid = false;
      }
      if (this.areas.val.length === 0) {
        this.formIsValid = false;
        this.areas.isValid = false;
      }
    },
    submitForm() {
      this.formValidation() 
      if(!this.formIsValid){
        return;
      }
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 1rem;
}
.form-control label {
  margin-right: 1rem;
  font-weight: bold;
}
.form-control input,
.form-control textarea {
  display: inline-block;
  width: 100%;
  margin-top: 0.5rem;
}
.expertise {
  margin: 1rem;
}
.expertise div {
  margin-top: 0.5rem;
}
.invalid{
  border-color: red;
  color: red;
}
</style>