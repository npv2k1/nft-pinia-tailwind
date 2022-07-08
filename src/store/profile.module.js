import { defineStore } from "pinia";
import ApiService from "@/common/api.service";
import {
  FETCH_PROFILE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW,
  SET_PROFILE
} from "./actions.type";

const state = () => {
  return {
    errors: {},
    profile: {}
  };
};

const getters = {};

const actions = {
  [FETCH_PROFILE](payload) {
    const { username } = payload;
    return ApiService.get("profiles", username)
      .then(({ data }) => {
        this[SET_PROFILE](data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // this[SET_ERROR](response.data.errors);
      });
  },
  [FETCH_PROFILE_FOLLOW](payload) {
    const { username } = payload;
    return ApiService.post(`profiles/${username}/follow`)
      .then(({ data }) => {
        this[SET_PROFILE](data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // this[SET_ERROR](response.data.errors);
      });
  },
  [FETCH_PROFILE_UNFOLLOW](payload) {
    const { username } = payload;
    return ApiService.delete(`profiles/${username}/follow`)
      .then(({ data }) => {
        this[SET_PROFILE](data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // this[SET_ERROR](response.data.errors);
      });
  },
  // [SET_ERROR] ( error) {
  //   this.errors = error
  // },
  [SET_PROFILE](profile) {
    this.profile = profile;
    this.errors = {};
  }
};

export const profileStore = defineStore("profile", {
  state,
  actions,
  getters
});
