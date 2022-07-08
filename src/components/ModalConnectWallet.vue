<template>
  <v-modal :visible="visible" title="Connect wallet" @close="$emit('close')">
    <div v-if="!isInstalledMetamask" class="install-wallet">
      <img src="@/assets/metamask-logo.png" alt="" />
      Please install Metamask
      <button class="btn btn-primary" @click="handleClickInstallMetamask()">
        Install Metamask
      </button>
    </div>
    <div v-else-if="!isLoading" class="wallet-list">
      <div
        v-for="(item, index) in walletList"
        :key="index"
        class="wallet-item"
        @click="connectWallet(item.name)"
      >
        <img :src="item.logo" alt="" />
        <span class="wallet-item-name">{{ item.name }}</span>
      </div>
    </div>
    <div v-else class="wallet-loading">
      <i class="ion-refresh"></i>
      Connecting to Metamask
    </div>
  </v-modal>
</template>

<script>
import { mapState } from "pinia";
import VModal from "./VModal.vue";
import ConnectWalletMixin from "../mixins/connectWallet";
import { WALLET_LIST } from "../utils/constants";
import { walletStore } from "@/store/wallet.module";

export default {
  name: "RwvHeader",
  components: { VModal },
  mixins: [ConnectWalletMixin],
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      walletList: [
        {
          name: WALLET_LIST.METAMASK,
          logo: require("@/assets/metamask-logo.png")
        },
        {
          name: WALLET_LIST.WALLET_CONNECT,
          logo: require("@/assets/wallet-connect-logo.png")
        }
      ],
      isInstalledMetamask: true,
      isLoading: false
    };
  },
  computed: {
    ...mapState(walletStore, ["wallet", "account"])
  },
  methods: {
    handleClickInstallMetamask() {
      window.open("https://metamask.io/download/", "_blank");
    },
    async connectWallet(name) {
      switch (name) {
        case WALLET_LIST.METAMASK:
          this.isLoading = true;
          this.connectMetaMask(this.handleFinishConnectWallet);
          break;
        case WALLET_LIST.WALLET_CONNECT:
          this.connectWalletConnect(this.handleFinishConnectWallet);
          break;
        default:
          break;
      }
    },
    handleFinishConnectWallet() {
      this.isLoading = false;
      this.$emit("close");
    }
  }
};
</script>
<style>
.wallet-list {
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
}
.wallet-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  cursor: pointer;
  height: 60px;
  border-radius: 12px;
  padding: 10px;
}
.wallet-item-name {
  font-weight: 700;
}
.wallet-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wallet-loading .ion-refresh {
  font-size: 50px;
  animation: rotating 1.2s linear infinite;
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.install-wallet {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px 0px 20px 0px;
}
</style>
