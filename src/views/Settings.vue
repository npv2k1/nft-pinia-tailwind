<template>
  <div class="flex-1 bg-light dark:bg-[#1c1c28] dark:text-[#F7F7F7]">
    <div
      class="mx-auto px-4 sm:max-w-[576px] md:max-w-[720px] lg:max-w-[1140px] mt-6"
    >
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4 md:w-[50%] md:mx-auto">
          <h1
            class="text-2xl font-semibold text-[#280d5f] text-center my-4 dark:text-[#F7F7F7]"
          >
            Your Settings
          </h1>
          <form @submit.prevent="updateSettings()">
            <fieldset class="flex flex-col space-y-2">
              <fieldset class="">
                <input
                  class="bg-[#eeeaf4] rounded-2xl px-4 h-10 text-base border border-[#d7caec] placeholder-[#7a6eaa] w-full outline-none focus:shadow-input dark:bg-[#372f47] dark:border-gray-800"
                  type="text"
                  v-model="currentUser.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="">
                <input
                  class="bg-[#eeeaf4] rounded-2xl px-4 h-10 text-base border border-[#d7caec] placeholder-[#7a6eaa] w-full outline-none focus:shadow-input dark:bg-[#372f47] dark:border-gray-800"
                  type="text"
                  v-model="currentUser.username"
                  placeholder="Your username"
                />
              </fieldset>
              <fieldset class="">
                <textarea
                  class="bg-[#eeeaf4] rounded-2xl px-4 text-base border border-[#d7caec] placeholder-[#7a6eaa] w-full outline-none focus:shadow-input dark:bg-[#372f47] dark:border-gray-800"
                  rows="8"
                  v-model="currentUser.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="">
                <input
                  class="bg-[#eeeaf4] rounded-2xl px-4 h-10 text-base border border-[#d7caec] placeholder-[#7a6eaa] w-full outline-none focus:shadow-input dark:bg-[#372f47] dark:border-gray-800"
                  type="text"
                  v-model="currentUser.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="flex flex-col">
                <input
                  class="bg-[#eeeaf4] rounded-2xl px-4 h-10 text-base border border-[#d7caec] placeholder-[#7a6eaa] w-full outline-none focus:shadow-input dark:bg-[#372f47] dark:border-gray-800"
                  type="password"
                  v-model="currentUser.password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="float-right h-12 bg-[#1fc7d4] px-6 text-white font-bold rounded-2xl text-base"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <!-- Line break for logout button -->
          <hr class="my-2" />
          <div class="w-full flex items-center justify-center">
            <button
              @click="logout"
              class="float-left h-12 bg-red-300 px-6 text-white font-bold rounded-2xl text-base"
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { LOGOUT, UPDATE_USER } from "@/store/actions.type";
import { authStore } from "@/store/auth.module";
const auth_store = authStore();
export default {
  name: "RwvSettings",
  computed: {
    ...mapState(authStore, ["currentUser"])
  },
  methods: {
    updateSettings() {
      auth_store[UPDATE_USER](this.currentUser).then(() => {
        // #todo, nice toast and no redirect
        this.$router.push({ name: "home" });
      });
    },
    logout() {
      auth_store[LOGOUT]().then(() => {
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>
