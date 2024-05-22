<template>
  <div>
    <base-dialogue
      :show="!!error"
      title="An error occured!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialogue>

    <section>
      <filtered-coaches @change-filter="setFilters"></filtered-coaches>
    </section>

    <section>
      <base-card>
        <div class="controls">
          <!-- <base-button mode="outline" @click="loadCoaches">Refresh</base-button> -->
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn" >Login to Register as Coach</base-button>
          <base-button v-if="isLoggedIn && !isLoading" link to="/register"
            >Register as coach</base-button
          >
        </div>

        <base-spinner v-if="isLoading"></base-spinner>

        <ul v-else-if="!isLoading && hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>

        <h2 v-else>No Coaches Found.</h2>
      </base-card>
    </section>
  </div>
</template>


<script>
import BaseButton from "@/components/UI/BaseButton.vue";
import CoachItem from "../../components/coaches/CoachItem.vue";
import FilteredCoaches from "../../components/coaches/FilteredCoaches.vue";
import { handleError } from "vue";
export default {
  components: {
    "coach-item": CoachItem,
    BaseButton,
    "filtered-coaches": FilteredCoaches,
  },
  data() {
    return {
      activeFilters: {
        isLoading: false,
        error: null,
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  created() {
    this.loadCoaches();
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      // this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches");
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
      // this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
}
</style>