import { BigNumber } from 'ethers';

export interface AlpacaPosition {
  action: string;
  baseAmount: string;
  baseEntryPrice: string;
  blockNumber: number;
  debtShare: string;
  debtValue: string;
  entryDate: string;
  entryPositionEquityValueInBaseToken: string;
  entryPositionEquityValueInUSD: string;
  farmAmount: string;
  farmEntryPrice: string;
  id: number;
  left: string;
  liquidatePrize: string;
  liquidatedBy: null;
  lpAmount: string;
  owner: string;
  positionId: number;
  positionValueBase: string;
  totalPositionValueInUSD: BigNumber;
  transactionIndex: number;
  tx: string;
  vault: string;
  worker: string;
}
export interface AlpacaPositionPaginationRes {
  data: {
    positions: AlpacaPosition[];
  };
  status: { code: number; messages: string[] };
  pagination: {
    limit: number;
    links: {
      next: string;
      prev: string;
      self: string;
    };
    offset: number;
    size: number;
    total: number;
  };
}

export interface PositionHistoryData {
  positionLpBalance: BigNumber;
  positionR0: BigNumber;
  positionR1: BigNumber;
  posDebtBalance: BigNumber;
  health: BigNumber;
  farmingToken: string;
  baseToken: string;
  token0: string;
  token1: string;
}
export enum DEX {
  PCS,
  MDEX,
  WAULT,
}
export interface WorkerInfo {
  lpToken: string;
  baseToken: string;
  farmingToken: string;
  workerLpShare: BigNumber; // need update regularly
  workerLpBalance: BigNumber; // need update regularly
  dex: DEX;
  feeDenom: BigNumber;
  fee: BigNumber; // for mdex, fee will be 0, it is calculated later
  factory: string;
  killFactor?: BigNumber;
}
export interface LPDetail {
  dex: DEX;
  totalSupply: BigNumber;
  r0: BigNumber;
  r1: BigNumber;
  token0: string;
  token1: string;
  pairFee?: BigNumber; // only apply for mdex lp
}
