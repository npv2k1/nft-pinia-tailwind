import { defineStore } from "pinia";
import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  CHECK_AUTH,
  UPDATE_USER,
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR
} from "./actions.type";

const state = () => {
  return {
    errors: null,
    user: {},
    isAuthenticated: !!JwtService.getToken()
  };
};

const getters = {
  currentUser(state) {
    return state.user;
  }
};

const actions = {
  [LOGIN](credentials) {
    return new Promise(resolve => {
      ApiService.post("users/login", { user: credentials })
        .then(({ data }) => {
          this[SET_AUTH](data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          this[SET_ERROR](response.data.errors);
        });
    });
  },
  [LOGOUT]() {
    this[PURGE_AUTH]();
  },
  [REGISTER](credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          this[SET_AUTH](data.user);
          resolve(data);
        })
        .catch(({ response }) => {
          this[SET_ERROR](response.data.errors);
          reject(response);
        });
    });
  },
  [CHECK_AUTH]() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("user")
        .then(({ data }) => {
          this[SET_AUTH](data.user);
        })
        .catch(({ response }) => {
          this[SET_ERROR](response.data.errors);
        });
    } else {
      this[PURGE_AUTH]();
    }
  },
  [UPDATE_USER](payload) {
    const { email, username, password, image, bio } = payload;
    const user = {
      email,
      username,
      bio,
      image
    };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      this[SET_AUTH](data.user);
      return data;
    });
  },
  [SET_ERROR](error) {
    this.errors = error;
  },
  [SET_AUTH](user) {
    this.isAuthenticated = true;
    this.user = user;
    this.errors = {};
    JwtService.saveToken(this.user.token);
  },
  [PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {};
    this.errors = {};
    JwtService.destroyToken();
  }
};

export const authStore = defineStore("auth", {
  state,
  actions,
  getters
});
