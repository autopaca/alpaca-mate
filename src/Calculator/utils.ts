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
