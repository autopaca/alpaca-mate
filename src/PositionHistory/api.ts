import axios from 'axios';
import { AlpacaPositionPaginationRes } from './interfaces';

const AlpacaPositionApiEndpoint = '/v2/positions';
export const getPositionsByOwner = async (owner: string, limit: number = 10, offset: number = 0) => {
  return await axios
    .get<AlpacaPositionPaginationRes>(AlpacaPositionApiEndpoint, {
      params: {
        owner,
        limit,
        offset,
      },
    })
    .then((res) => res.data);
};

export const getCoinlistIds = async () => {
  return await axios
    .get<{ id: string; symbol: string; name: string }[]>('https://api.coingecko.com/api/v3/coins/list')
    .then((res) => res.data);
};

export type CoinlistPriceList = [number, number][];
export type CoinlistPrice = {
  prices: CoinlistPriceList; // timestamp, price
  market_caps: CoinlistPriceList; // timestamp, mc
  total_volumes: CoinlistPriceList; // timestamp, volume
};

export const getCoinlistPrice = async (id: string, days: number) => {
  return await axios
    .get<CoinlistPrice>(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days,
        interval: 'hourly',
      },
    })
    .then((res) => res.data);
};
