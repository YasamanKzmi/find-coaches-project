<template>
  <div>
  <base-dialogue :show="!!error" title="An error occured!" @close="handleError">
<p>{{ error }}</p>
</base-dialogue>
  <base-card>
    <section>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests">
        <request-item
          v-for="req in requestsReceived"
          :key="req.id"
          :email="req.email"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </section>
  </base-card>
</div>
</template>

<script>
import requestItem from "@/components/requests/requestItem.vue";
export default {
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  components: {
    "request-item": requestItem,
  },
  computed: {
    requestsReceived() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  created(){
    this.loadRequests()
  },
  methods: {
    async loadRequests() {
      this.isLoading = true
      try{
        await this.$store.dispatch("requests/fetchRequests");
      } catch(error){
        this.error = error.message || 'Something failed!'

      }
      this.isLoading = false
    },
    handleError(){
      this.error = null
    }
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}
h3 {
  text-align: center;
}
</style>