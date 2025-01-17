import { computed } from "vue";

import type { Api, Token, TokenAmount } from "@/types";
import type { Ref } from "vue";

export const groupBalancesByAmount = <T = TokenAmount>(balances: Ref<T[]>) =>
  computed(() => {
    const groups: Record<string, { title: string | null; balances: T[] }> = {
      default: {
        title: null,
        balances: [],
      },
      small: {
        title: "Small balances",
        balances: [],
      },
      zero: {
        title: "Zero balances",
        balances: [],
      },
    };
    for (const balanceItem of balances.value as (T & TokenAmount)[]) {
      const decimalBalance =
        typeof balanceItem.price === "number"
          ? removeSmallAmount(balanceItem.amount, balanceItem.decimals, balanceItem.price)
          : parseTokenAmount(balanceItem.amount, balanceItem.decimals);
      if (!isOnlyZeroes(decimalBalance)) {
        groups.default.balances.push(balanceItem);
      } else if (decimalBalance === "0") {
        groups.zero.balances.push(balanceItem);
      } else {
        groups.small.balances.push(balanceItem);
      }
    }
    return [groups.default, groups.small, groups.zero].filter((group) => group.balances.length);
  });

export const mapApiToken = (token: Api.Response.Token): Token => {
  if (token.l2Address === ETH_TOKEN.address) {
    return {
      ...ETH_TOKEN,
      price: token.usdPrice || undefined,
    };
  }

  return {
    l1Address: token.l1Address || undefined,
    address: token.l2Address,
    symbol: token.symbol || "unknown",
    name: token.name || "unknown",
    decimals: token.decimals,
    iconUrl: token.iconURL || undefined,
    price: token.usdPrice || undefined,
    networkKey: token.networkKey || undefined,
  };
};

export type NetworkLayer = "L1" | "L2";
export function mapApiTransfer(transfer: Api.Response.Transfer) {
  const token = transfer.token ? mapApiToken(transfer.token) : undefined;
  return {
    transactionHash: transfer.transactionHash,
    type: transfer.type,
    from: transfer.from,
    to: transfer.to,
    fromNetwork: transfer.type === "deposit" ? "L1" : ("L2" as NetworkLayer),
    toNetwork: transfer.type === "withdrawal" ? "L1" : ("L2" as NetworkLayer),
    amount: transfer.amount,
    token,
    timestamp: transfer.timestamp,
    gateway: transfer.gateway,
  };
}
export type Transfer = ReturnType<typeof mapApiTransfer>;
