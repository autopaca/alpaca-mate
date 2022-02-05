import type { JsonRpcSigner, StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { atom, selector } from "recoil";
import { BINANCE_CHAINID } from "Src/utils/const";
import fallbackProvider from "Src/utils/fallbackProvider";

interface BaseConnectState {
  provider: Web3Provider | StaticJsonRpcProvider;
  account: string | null;
  chainId: string | null;
}

interface ConnectState extends BaseConnectState {
  signer: JsonRpcSigner | null;
  active: boolean;
}


export const baseConnectState = atom<BaseConnectState>({
  key: 'global: baseConnectState',
  default: {
    provider: fallbackProvider,
    account: null,
    chainId: BINANCE_CHAINID,
  },
  dangerouslyAllowMutability: true,
})


export const connectState = selector<ConnectState>({
  key: 'global: connectState',
  get: ({ get }) => {
    const baseInfo = get(baseConnectState);
    const active = !!baseInfo.account && baseInfo.chainId === BINANCE_CHAINID;
    return {
      ...baseInfo,
      active,
      signer: active ? baseInfo.provider.getSigner() : null,
    };
  },
  dangerouslyAllowMutability: true,
});