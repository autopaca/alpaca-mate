import {PoolMeta} from "../poolMetas";

export type FarmInput = {
    assetDetails: AssetDetail[]; // length is always 2, 0 is asset1, 1 is asset2
    leverage: number;
    borrowedIndex: number;
}
export type PoolInfo = {
    liquidationThreshold: number;
} & PoolMeta
export type AssetDetail = {
    amount?: string;
    price?: number;
}
export type RelativePrice = {
    price: number;
    symbol: String;
}
export type RelativeInfo = RelativePrice[]

export type AssetValues = number[]; // length is always 3, 0 is in asset1, 1 is in asset2, 2 is in busd;

export type PositionStatus = {
    positionValues: AssetValues;
    positionDetails: AssetDetail[]
}

export type PositionStatusAfterClose = {
    positionValues: AssetValues;
    positionDetails: {
        minimizeTrading: AssetDetail[],
        convertToBase: AssetDetail[]
    }
}

export type Estimation = {
    farmingDays?: number,
    prices: number[]; // length is always 2, 0 is asset1, 1 is asset2
}

export type Borrowed = {
    borrowedIndex: number,
    borrowedAssetLiteral: string;
    borrowedAmount?: string;
    leverage?: number;
    debtRatio: number;
    price?: number;
    borrowedValues: AssetValues;
    liquidated?: boolean;
}
export type BaseApr = {
    yieldFarmApr: number,
    tradingFeeApr: number
}
export type ExtendedApr = {
    alpacaApr: number,
    interestApr: number,
}
export type FinalApr = {
    leveragedYFApr: number,
    leveragedTFApr: number,
    totalApr: number,
    dailyApr: number,
    leveragedTotalApr: number,
    leveragedDailyApr: number,
    totalApy: number,
    leveragedTotalApy: number
}
export type PoolMetaState = {
    poolMeta: PoolMeta,
    poolIndex: number,
}
export type GainOrLoss = {
    value: number,
    percent: number
}
export type GainOrLossWithApy = {
    farmGain?: number
} & GainOrLoss

export const BUSD = "BUSD";