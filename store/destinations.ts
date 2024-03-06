import { computed } from "vue";

import { useNetworkStore } from "@/store/network";
import { useZkSyncProviderStore } from "@/store/zksync/provider";

export type TransactionDestination = {
  key?: string;
  label: string;
  iconUrl: string;
};

export const useDestinationsStore = defineStore("destinations", () => {
  const { selectedNetwork, l1Network } = storeToRefs(useNetworkStore());
  const { eraNetwork } = storeToRefs(useZkSyncProviderStore());
  const destinations = computed(() => ({
    era: {
      key: "era",
      label: eraNetwork.value.name,
      iconUrl: "/img/icon.png",
    },
    nova: {
      key: "nova",
      label: eraNetwork.value.name,
      iconUrl: "/img/icon.png",
    },
    arbitrum: {
      key: "arbitrum",
      label: l1Network.value ? l1Network.value.name : "",
      iconUrl: selectedNetwork.value.logoUrl,
    },
    ethereum: {
      key: "ethereum",
      label: l1Network.value ? l1Network.value.name : "",
      iconUrl: "/img/ethereum.svg",
    },
    layerswap: {
      key: "layerswap",
      label: "Layerswap",
      iconUrl: "/img/layerswap.svg",
    },
    ramp: {
      key: "ramp",
      label: "Ramp",
      iconUrl: "/img/ramp.svg",
    },
    moonpay: {
      key: "moonpay",
      label: "Moonpay",
      iconUrl: "/img/moonpay.svg",
    },
    binance: {
      key: "binance",
      label: "Binance",
      iconUrl: "/img/binance.svg",
    },
    zigzag: {
      key: "zigzag",
      label: "ZigZag",
      iconUrl: "/img/zigzag.svg",
    },
    rhino: {
      key: "rhino",
      label: "rhino.fi",
      iconUrl: "/img/rhino.svg",
    },
  }));

  return {
    destinations,
  };
});
