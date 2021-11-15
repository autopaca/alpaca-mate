import pools from './pools.json';
export type PoolMeta = {
  pool: string;
  platform: string;
  leverage: number;
};
const poolMetas: PoolMeta[] = (pools as PoolMeta[]).map((p) => ({ ...p, pool: p.pool.replace('wBNB', 'BNB') }));
export const singleTokenPoolMetas: PoolMeta[] = [{ pool: 'CAKE', platform: 'Pancake', leverage: 2.5 }];
export const possibleBorrowAssets = (): Set<string> => {
  const set = new Set<string>();
  poolMetas.forEach((p) => {
    const borrowAsset = p.pool.split('-')[1];
    set.add(borrowAsset);
  });
  return set;
};

export const cakeMaxiAssets = ['ETH', 'USDT', 'BNB', 'BUSD', 'BTCB', 'TUSD'];
export default poolMetas;
