import { StaticJsonRpcProvider } from "@ethersproject/providers";

const fallbackProvider = new StaticJsonRpcProvider(
  'https://bsc-dataseed.binance.org'
);

export default fallbackProvider;