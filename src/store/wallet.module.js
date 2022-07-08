import { defineStore } from "pinia";
import {
  DISCONNECT_WALLET,
  SET_WALLET,
  SET_CHAIN_ID,
  SET_WALLET_ACCOUNT,
  SET_WALLET_NAME,
  SET_WALLET_CHAIN_ID
} from "./actions.type";

const state = () => {
  return {
    account: null,
    wallet: null,
    chainId: null
  };
};

const getters = {};

const actions = {
  [SET_WALLET_ACCOUNT](account) {
    this.account = account;
  },
  [SET_WALLET_NAME](wallet) {
    this.wallet = wallet;
  },
  [SET_WALLET_CHAIN_ID](chainId) {
    this.chainId = chainId;
  },
  [SET_WALLET](params) {
    this[SET_WALLET_ACCOUNT](params.account);
    this[SET_WALLET_NAME](params.wallet);
    this[SET_WALLET_CHAIN_ID](params.chainId);
  },
  [DISCONNECT_WALLET]() {
    this[SET_WALLET_ACCOUNT](null);
    this[SET_WALLET_NAME](null);
    this[SET_WALLET_CHAIN_ID](null);
  },
  [SET_CHAIN_ID](params) {
    this[SET_WALLET_CHAIN_ID](params.chainId);
  }
};

export const walletStore = defineStore("wallet", {
  state,
  getters,
  actions
});
