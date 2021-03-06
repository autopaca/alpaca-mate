import { AssetDetail } from './type';

export const getCoinUrl = (coin: string) => {
  let name = coin.toLowerCase();
  if (name === 'belt') {
    return 'https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/belt.svg';
  }
  if (name === 'bmxx') {
    name = 'bMXX';
  } else if (name === 'form') {
    name = 'form-fi';
  }
  return `https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/${name}.svg`;
};

export const aprToApy = (apr: number) => Math.pow(apr / 365 + 1, 365) - 1;

export const renderAssets = (assets: string[], details?: AssetDetail[]) => {
  if (!details) {
    return `0.00 ${assets[0]} + 0.00 ${assets[1]}`;
  }
  return `${formatValue(parseFloat(details[0].amount ?? '0'))} ${assets[0]} + ${formatValue(
    parseFloat(details[1].amount ?? '0'),
  )} ${assets[1]}`;
};

export const renderSingleAsset = (asset: string, details?: AssetDetail) => {
  if (!details) {
    return `0.00 ${asset}`;
  }
  return `${formatValue(parseFloat(details.amount ?? '0'))} ${asset}`;
};

export const ratioToPercent = (ratio?: number) => {
  return ratio ? `${(ratio * 100).toFixed(2)}%` : `0.00%`;
};

export const formatValue = (value?: number) => {
  return value ? value.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '0.00';
};

const equityValuePercentHelper = (l: number, x: number): number => {
  let res = 1 - ((l - 1) / l) * Math.sqrt(1 / (1 + x));
  return Math.max(Number(res.toFixed(4)), 0);
};

export const equityValuePercent = (leverage: number, changeX: number): number => {
  // const base = equityValuePercentHelper(leverage, 0);
  // const newEquity = equityValuePercentHelper(leverage, changeX);
  // console.log({ base, newEquity });
  // return base === 0 ? 0 : newEquity / base;
  return equityValuePercentHelper(leverage, changeX);
};

export const liquidationPriceChange = (leverage: number, liquidationThreshold: number) => {
  const equity = 1 - liquidationThreshold;
  const x = (leverage - 1) ** 2 / (leverage ** 2 * (1 - equity) ** 2) - 1;
  return Number(x.toFixed(2));
};
