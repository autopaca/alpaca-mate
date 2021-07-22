import {AssetDetail} from "./type";

export const getCoinUrl = (coin: string) => {
    let name = coin.toLowerCase();
    if (coin === 'BELT') {
        return "https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/belt.svg";
    }
    if (coin === 'bMXX') {
        name = 'bMXX';
    }
    return `https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/${name}.svg`
}

export const aprToApy = (apr: number) => Math.pow((apr / 365 + 1),365) - 1;

export const renderAssets = (details: AssetDetail[], assets: string[]) => {
    return `${details[0].amount ?? "0.00"} ${assets![0]} + ${details[1].amount ?? "0.00"} ${assets![1]}`;
}
