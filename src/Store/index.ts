import {atom, selector} from 'recoil';
import {
    AssetValues,
    BaseApr,
    Borrowed,
    Estimation,
    ExtendedApr,
    FarmInput,
    FinalApr, GainOrLoss, GainOrLossWithApy, PoolInfo,
    PositionStatus, PositionStatusAfterClose,
    RelativeInfo
} from "../Calculator/type.d";
import {aprToApy} from "../Calculator/utils";
import {PoolMeta, possibleBorrowAssets} from "../poolMetas";

export const poolState = atom<PoolMeta | undefined>({
    key: 'pool', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});
export const poolInfoState = selector<PoolInfo | undefined>({
    key: 'poolInfo',
    get: ({get}) => {
        const pool = get(poolState);
        if (!pool) {
            return undefined
        }
        const leverage = pool?.leverage;
        let liquidationThreshold = 0;
        if (leverage) {
            if (leverage <= 2) {
                liquidationThreshold = 0.7;
            } else if (leverage === 2.5) {
                liquidationThreshold = 0.8;
            } else if (leverage === 3) {
                liquidationThreshold = 0.8333;
            } else if (leverage === 4) {
                liquidationThreshold = 0.9;
            } else if (leverage === 6) {
                liquidationThreshold = 0.92;
            }
        }
        return {
            ...pool,
            liquidationThreshold
        }
    }
})

const farmInputSelector = selector<FarmInput>({
    key: "farmInputSelector",
    get: ({get}) => {
        const pool = get(poolInfoState);
        const assets = get(assetsState);
        const leverage = pool ? pool.leverage : 1;
        let borrowedIndex = 0;
        if (assets) {
            const possibleAssets = possibleBorrowAssets();
            if (possibleAssets.has(assets[0]) && possibleAssets.has(assets[1])) {
                borrowedIndex = 1;
            }
        }
        return {
            borrowedIndex,
            leverage,
            assetDetails: [{}, {}]
        }
    }
})

export const farmInputState = atom<FarmInput>({
    key: 'farmInput',
    default: farmInputSelector
})
export const estimationState = atom<Estimation>({
    key: "estimation",
    default: {
        farmingDays: 0,
        prices: [0, 0],
    }
})
export const baseAprState = atom<BaseApr>({
    key: "baseApr",
    default: {
        yieldFarmApr: 0,
        tradingFeeApr: 0,
    }
})
export const extendedAprState = atom<ExtendedApr>({
    key: "extendedApr",
    default: {
        alpacaApr: 0,
        interestApr: 0,
    }
})
export const finalAprState = selector<FinalApr>({
    key: "finalApr",
    get: ({get}) => {
        const {yieldFarmApr, tradingFeeApr} = get(baseAprState);
        const {alpacaApr, interestApr} = get(extendedAprState);
        const leverage = get(farmInputState).leverage;
        // calculated apr
        const leveragedYFApr = leverage * yieldFarmApr;
        const leveragedTFApr = leverage * tradingFeeApr;
        const totalApr = yieldFarmApr + tradingFeeApr;
        const dailyApr = totalApr / 365;
        const leveragedTotalApr = leveragedYFApr + leveragedTFApr + alpacaApr - Math.abs(interestApr);
        const leveragedDailyApr = leveragedTotalApr / 365;
        const totalApy = aprToApy(totalApr / 100) * 100;
        const leveragedTotalApy = aprToApy(leveragedTotalApr / 100) * 100;
        return {
            leveragedYFApr,
            leveragedTFApr,
            totalApr,
            dailyApr,
            leveragedTotalApr,
            leveragedDailyApr,
            totalApy,
            leveragedTotalApy
        }
    }
})

export const assetsState = selector<string[] | undefined>({
    key: 'poolAssets',
    get: ({get}) => {
        const pool = get(poolInfoState);
        return pool?.pool.split('-');
    }
})

function makeRelativeSymbol(a1: string, a2: string) {
    return `${a1}/${a2}`
}

function calculateRelative(price1: number, price2: number, assets: string[]) {
    let vs1 = 0;
    let vs2 = 0;
    if (price1 !== 0 && price2 !== 0) {
        vs1 = price2 / price1;
        vs2 = price1 / price2;
    }
    return [
        {price: vs1, symbol: makeRelativeSymbol(assets[1], assets[0])},
        {price: vs2, symbol: makeRelativeSymbol(assets[0], assets[1])},
    ]
}

export const relativeInfoAtOpenState = selector<RelativeInfo>({
    key: "relativeInfoAtOpen",
    get: ({get}) => {
        const farmInput = get(farmInputState);
        const assets = get(assetsState)!;
        const price1 = farmInput.assetDetails[0].price || 0;
        const price2 = farmInput.assetDetails[1].price || 0;
        return calculateRelative(price1, price2, assets);
    }
})
export const relativeInfoAtCloseState = selector<RelativeInfo>({
    key: "relativeInfoAtClose",
    get: ({get}) => {
        const estimation = get(estimationState);
        const assets = get(assetsState)!;
        const price1 = estimation.prices[0] || 0;
        const price2 = estimation.prices[1] || 0;
        return calculateRelative(price1, price2, assets);
    }
})

function calculateValues(busdValue: number, price1?: number, price2?: number) {
    const inAsset1 = price1 ? (busdValue / price1) : 0;
    const inAsset2 = price2 ? (busdValue / price2) : 0;
    return [inAsset1, inAsset2, busdValue];
}

export const assetsValueState = selector<AssetValues>({
    key: 'assetsValue',
    get: ({get}) => {
        const farmInput = get(farmInputState);
        const amount1 = farmInput.assetDetails[0].amount ?? "0";
        const price1 = farmInput.assetDetails[0].price ?? 0;
        const amount2 = farmInput.assetDetails[1].amount ?? "0";
        const price2 = farmInput.assetDetails[1].price ?? 0;

        const inBusd = price1 * parseFloat(amount1) + price2 * parseFloat(amount2)
        return calculateValues(inBusd, price1, price2);
    }
})
export const borrowedState = selector<Borrowed>({
    key: "borrowed",
    get: ({get}) => {
        const farmInput = get(farmInputState);
        const assets = get(assetsState);
        const assetsValue = get(assetsValueState);
        const borrowedAmount = ((farmInput.leverage! - 1) * assetsValue[farmInput.borrowedIndex]).toString()
        const borrowedPrice = farmInput.assetDetails[farmInput.borrowedIndex].price;
        const leverage = farmInput.leverage ?? 1;
        const borrowedValues = calculateValues(
            parseFloat(borrowedAmount) * (borrowedPrice ?? 0),
            farmInput.assetDetails[0].price,
            farmInput.assetDetails[1].price,
        )
        return {
            borrowedIndex: farmInput.borrowedIndex,
            borrowedAssetLiteral: assets![farmInput.borrowedIndex],
            borrowedAmount,
            leverage,
            debtRatio: (leverage - 1) / leverage,
            price: borrowedPrice,
            borrowedValues,
            liquidated: false
        }
    }
})
export const positionAtOpenState = selector<PositionStatus>({
    key: "positionAtOpen",
    get: ({get}) => {
        const farmInput = get(farmInputState);
        const price1 = farmInput.assetDetails[0].price || 0;
        const price2 = farmInput.assetDetails[1].price || 0;

        const borrowed = get(borrowedState);
        const assetsValue = get(assetsValueState);
        const borrowedPrice = borrowed.price || 0;
        const borrowedAmount = borrowed.borrowedAmount || "0";
        const totalInBusd = parseFloat(borrowedAmount) * borrowedPrice + assetsValue[2];
        const totalAssetValues = calculateValues(totalInBusd, price1, price2);
        const farmAsset1 = (totalAssetValues[0] / 2).toFixed(4);
        const farmAsset2 = (totalAssetValues[1] / 2).toFixed(4);
        return {
            positionValues: totalAssetValues,
            positionDetails: [
                {amount: farmAsset1, price: price1},
                {amount: farmAsset2, price: price2},
            ]
        };
    }
})
export const positionAtCloseState = selector<PositionStatus>({
    key: "positionAtClose",
    get: ({get}) => {
        const positionAtOpen = get(positionAtOpenState);
        const estimation = get(estimationState);
        const amount1 = positionAtOpen.positionDetails[0].amount ?? "0";
        const amount2 = positionAtOpen.positionDetails[1].amount ?? "0";
        const k = parseFloat(amount1) * parseFloat(amount2);
        const price1AtClose = estimation.prices[0] ?? 0;
        const price2AtClose = estimation.prices[1] ?? 0;
        const xDivY = price1AtClose ? price2AtClose / price1AtClose : 0;
        const amount2AtClose = Math.sqrt(xDivY ? k / xDivY : 0);
        const amount1AtClose = amount2AtClose ? k / amount2AtClose : 0;
        const totalInBusdAtClose = amount1AtClose * price1AtClose + amount2AtClose * price2AtClose;
        const totalAssetValuesAtClose = calculateValues(totalInBusdAtClose, price1AtClose, price2AtClose);
        return {
            positionValues: totalAssetValuesAtClose,
            positionDetails: [
                {amount: amount1AtClose.toFixed(4), price: price1AtClose},
                {amount: amount2AtClose.toFixed(4), price: price2AtClose},
            ]
        };
    }
})

export const borrowedAtCloseState = selector<Borrowed>({
    key: "borrowedAtClose",
    get: ({get}) => {
        const borrowedAtOpen = get(borrowedState);
        const estimation = get(estimationState);
        const positionAtClose = get(positionAtCloseState);
        const poolInfo = get(poolInfoState);
        const borrowedIndex = borrowedAtOpen.borrowedIndex;
        const price = estimation.prices[borrowedIndex];
        const borrowedAmount = borrowedAtOpen.borrowedAmount ?? "0";
        const valueInBusd = parseFloat(borrowedAmount) * price
        const borrowedValues = calculateValues(valueInBusd, estimation.prices[0], estimation.prices[1]);
        const debtRatio = valueInBusd / positionAtClose.positionValues[2]
        const liquidated = debtRatio >= poolInfo!.liquidationThreshold;
        return {
            borrowedIndex,
            borrowedAssetLiteral: borrowedAtOpen.borrowedAssetLiteral,
            borrowedAmount,
            leverage: borrowedAtOpen.leverage,
            debtRatio,
            price,
            borrowedValues,
            liquidated
        }
    }
})

export const positionAfterCloseState = selector<PositionStatusAfterClose>({
    key: "positionAfterClose",
    get: ({get}) => {
        const positionAtClose = get(positionAtCloseState);
        const borrowedAtClose = get(borrowedAtCloseState);
        const estimation = get(estimationState);
        let busdValue = positionAtClose.positionValues[2] - borrowedAtClose.borrowedValues[2];
        if (borrowedAtClose.liquidated) {
            busdValue = busdValue * 0.95;
        }
        const price1AtClose = estimation.prices[0] ?? 0;
        const price2AtClose = estimation.prices[1] ?? 0;
        const positionValuesAfterClose = calculateValues(busdValue, price1AtClose, price2AtClose);
        const borrowedAmount = parseFloat(borrowedAtClose.borrowedAmount ?? "0");
        const borrowedIndex = borrowedAtClose.borrowedIndex;
        const convertToBase = [];
        convertToBase[borrowedIndex] = {
            amount: (positionValuesAfterClose[borrowedIndex]).toFixed(4),
            price: estimation.prices[borrowedIndex] ?? 0
        }
        convertToBase[1-borrowedIndex] = {
            amount: "0.0", price: estimation.prices[1-borrowedIndex] ?? 0
        }
        const minimizeTrading = [];
        const priceOfBaseAsset = estimation.prices[borrowedIndex] ?? 0;
        const priceOfOtherAsset = estimation.prices[1-borrowedIndex] ?? 0;
        const amountOfBaseAsset = parseFloat(positionAtClose.positionDetails[borrowedIndex].amount ?? "0");
        const amountOfOtherAsset = parseFloat(positionAtClose.positionDetails[1-borrowedIndex].amount ?? "0");
        if (amountOfBaseAsset >= borrowedAmount) {
            minimizeTrading[borrowedIndex] = {
                amount: (amountOfBaseAsset - borrowedAmount).toFixed(4),
                price: priceOfBaseAsset
            };
            minimizeTrading[1-borrowedIndex] = {
                amount: amountOfOtherAsset.toFixed(4),
                price: priceOfOtherAsset
            };
        } else {
            const amountOfOtherLeft = amountOfOtherAsset - (borrowedAmount - amountOfBaseAsset) * priceOfBaseAsset / priceOfOtherAsset;
            minimizeTrading[borrowedIndex] = {
                amount: "0.0",
                price: priceOfBaseAsset
            }
            minimizeTrading[1-borrowedIndex] = {
                amount: amountOfOtherLeft.toFixed(4),
                price: priceOfOtherAsset
            }
        }
        return {
            positionValues: positionValuesAfterClose,
            positionDetails: {
                minimizeTrading,
                convertToBase
            }
        }
    }
})

export const gainOrLossState = selector<GainOrLoss>({
    key: "gainOrLoss",
    get: ({get}) => {
        const positionAfterClose = get(positionAfterCloseState);
        const assetsValueAtOpen = get(assetsValueState);
        const value = positionAfterClose.positionValues[2] - assetsValueAtOpen[2];
        const percent = value / assetsValueAtOpen[2]
        return {
            value,
            percent,
        }
    }
})
export const gainOrLossWithApyState = selector<GainOrLossWithApy>({
    key: "gainOrLossWithApy",
    get: ({get}) => {
        const gainOrLoss = get(gainOrLossState);
        const positionAtOpen = get(positionAtOpenState);
        const positionAtClose = get(positionAtCloseState);
        const estimation = get(estimationState);
        const finalApr = get(finalAprState);
        const averageValue = (positionAtOpen.positionValues[2] + positionAtClose.positionValues[2]) / 2
        const farmGain = (Math.pow(finalApr.dailyApr / 100 + 1, estimation.farmingDays) - 1) * averageValue;
        let {value} = gainOrLoss
        value += farmGain
        const percent = value / positionAtOpen.positionValues[2]
        return {
            farmGain,
            value,
            percent,
        }
    }
})