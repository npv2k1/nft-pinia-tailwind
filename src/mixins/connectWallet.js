import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mapState, mapActions } from "pinia";
import { walletStore } from "@/store/wallet.module";
import {
  DISCONNECT_WALLET,
  SET_CHAIN_ID,
  SET_WALLET
} from "../store/actions.type";
import {
  DEFAULT_CHAIN_ID,
  URL_RINKEBY_TESTNET,
  WALLET_LIST
} from "../utils/constants";

export default {
  name: "ConnectWalletMixin",
  computed: {
    ...mapState(walletStore, ["account", "wallet"])
  },
  methods: {
    ...mapActions(walletStore, {
      setWallet: SET_WALLET,
      disconnect: DISCONNECT_WALLET,
      setChainId: SET_CHAIN_ID
    }),
    async connectMetaMask(callback = null) {
      const provider = await detectEthereumProvider();
      if (!provider) {
        this.isInstalledMetamask = false;
        this.isLoading = false;
      } else {
        provider
          .request({ method: "eth_requestAccounts" })
          .then(accounts =>
            this.handleAccountChange(
              accounts,
              WALLET_LIST.METAMASK,
              provider,
              callback
            )
          )
          .catch(err => this.handleErrorConnect(err, WALLET_LIST.METAMASK));
      }
    },
    async connectWalletConnect(callback = null) {
      const provider = new WalletConnectProvider({
        rpc: {
          [parseInt(DEFAULT_CHAIN_ID, 16)]: URL_RINKEBY_TESTNET
        }
      });
      await provider
        .enable()
        .then(accounts =>
          this.handleAccountChange(
            accounts,
            WALLET_LIST.WALLET_CONNECT,
            provider,
            callback
          )
        )
        .catch(err => this.handleErrorConnect(err, WALLET_LIST.WALLET_CONNECT));
    },
    async handleAccountChange(accounts, walletName, provider, callback = null) {
      this.listenToEvent(provider);
      if (accounts.length === 0) {
        console.log("Please connect to wallet.");
      } else if (accounts[0] !== this.account) {
        try {
          const chainId = await provider.request({ method: "eth_chainId" });
          localStorage.setItem("connectedWallet", walletName);
          window.myProvider = provider;
          this.setWallet({ account: accounts[0], wallet: walletName, chainId });
          if (callback) callback();
        } catch (error) {
          console.log(error);
          this.disconnectWallet();
        }
      }
    },
    disconnectWallet() {
      console.log("disconnect");
      if (this.wallet === WALLET_LIST.WALLET_CONNECT) {
        window.myProvider.disconnect();
      }
      localStorage.setItem("connectedWallet", "");
      this.removeListener(window.myProvider);
      this.disconnect();
    },
    handleErrorConnect(err, name) {
      if (err.code === 4001) {
        console.log(`Please connect to ${name}`);
      } else {
        console.error(err);
      }
    },
    listenToAccountChange(account) {
      console.log(`accountsChanged: ${account}`);
      this.disconnectWallet();
    },
    listenToChainChanged(chainId) {
      if (
        (this.account ||
          Object.values(WALLET_LIST).includes(
            localStorage.getItem("connectedWallet")
          )) &&
        chainId
      )
        this.setChainId({ chainId });
      console.log(`chainChanged: ${chainId}`);
    },
    listenToDisconnect(code, reason) {
      console.log({ code, reason });
    },
    removeListener(provider) {
      provider.removeListener("accountsChanged", this.listenToAccountChange);
      provider.removeListener("chainChanged", this.listenToChainChanged);
      provider.removeListener("disconnect", this.listenToDisconnect);
    },
    listenToEvent(provider) {
      provider.on("accountsChanged", this.listenToAccountChange);
      provider.on("chainChanged", this.listenToChainChanged);
      provider.on("disconnect", this.listenToDisconnect);
    }
  }
};
