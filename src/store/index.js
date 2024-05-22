import { createStore } from "vuex";
import coachModule from "./coaches/index.js";
import requestModule from './requests/index.js'
import authModule from './auth/index.js'

const store = createStore({
  modules: {
    coaches: coachModule,
    requests: requestModule,
    auth: authModule
  },
});

export default store;
