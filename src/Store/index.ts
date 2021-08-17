import {atom, selector} from 'recoil';
import {
    AssetValues,
    BaseApr,
    Borrowed,
    Estimation,
    ExtendedApr,
    FarmInput,
    FinalApr, GainOrLoss, GainOrLossWithApy, PoolInfo, PoolMetaState,
    PositionStatus, PositionStatusAfterClose,
    RelativeInfo
} from "../Calculator/type.d";
import {aprToApy} from "../Calculator/utils";
import {possibleBorrowAssets} from "../poolMetas";

export const poolState = atom<PoolMetaState | undefined>({
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
        const leverage = pool.poolMeta.leverage;
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
            ...pool.poolMeta,
            liquidationThreshold
        }
    }
})

export const assetsState = selector<string[] | undefined>({
    key: 'poolAssets',
    get: ({get}) => {
        const poolInfo = get(poolInfoState);
        return poolInfo?.pool.split('-');
    }
})

const farmInputSelector = selector<FarmInput | undefined>({
    key: "farmInputSelector",
    get: ({get}) => {
        const pool = get(poolInfoState);
        const assets = get(assetsState);
        if (!pool || !assets) return undefined
        const leverage = pool.leverage;
        return {
            leverage,
            assetDetails: [{}, {}]
        }
    }
})

export const farmInputState = atom<FarmInput | undefined>({
    key: 'farmInput',
    default: farmInputSelector
})
export const estimationState = atom<Estimation>({
    key: "estimation",
    default: {
        prices: []
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
export const finalAprState = selector<FinalApr|undefined>({
    key: "finalApr",
    get: ({get}) => {
        const farmInput = get(farmInputState);
        if (!farmInput) return undefined;
        const {yieldFarmApr, tradingFeeApr} = get(baseAprState);
        const {alpacaApr, interestApr} = get(extendedAprState);
        const leverage = farmInput.leverage;
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
            leveragedTotalApy,
            alpacaApr,
            interestApr,
            yieldFarmApr,
            tradingFeeApr
        }
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

export const relativeInfoAtOpenState = selector<RelativeInfo|undefined>({
    key: "relativeInfoAtOpen",
    get: ({get}) => {
        const farmInput = get(farmInputState);
        if (!farmInput) return undefined;
        const assets = get(assetsState)!;
        const price1 = farmInput.assetDetails[0].price || 0;
        const price2 = farmInput.assetDetails[1].price || 0;
        return calculateRelative(price1, price2, assets);
    }
})
export const relativeInfoAtCloseState = selector<RelativeInfo|undefined>({
    key: "relativeInfoAtClose",
    get: ({get}) => {
        const estimation = get(estimationState);
        const assets = get(assetsState);
        if (!assets) return undefined;
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

export const assetsValueState = selector<AssetValues|undefined>({
    key: 'assetsValue',
    get: ({get}) => {
        const farmInput = get(farmInputState);
        if (!farmInput) return undefined;
        const amount1 = farmInput.assetDetails[0].amount ?? "0";
        const price1 = farmInput.assetDetails[0].price ?? 0;
        const amount2 = farmInput.assetDetails[1].amount ?? "0";
        const price2 = farmInput.assetDetails[1].price ?? 0;

        const inBusd = price1 * parseFloat(amount1) + price2 * parseFloat(amount2)
        return calculateValues(inBusd, price1, price2);
    }
})
export const borrowedState = selector<Borrowed|undefined>({
    key: "borrowed",
    get: ({get}) => {
        const farmInput = get(farmInputState);
        if (!farmInput) return undefined;
        const assets = get(assetsState)!;
        const assetsValue = get(assetsValueState)!;
        const borrowedAmount = ((farmInput.leverage! - 1) * assetsValue[1]).toString()
        const borrowedPrice = farmInput.assetDetails[1].price;
        const leverage = farmInput.leverage ?? 1;
        const borrowedValues = calculateValues(
            parseFloat(borrowedAmount) * (borrowedPrice ?? 0),
            farmInput.assetDetails[0].price,
            farmInput.assetDetails[1].price,
        )
        return {
            // borrowedIndex: farmInput.borrowedIndex,
            borrowedAssetLiteral: assets![1],
            borrowedAmount,
            leverage,
            debtRatio: (leverage - 1) / leverage,
            price: borrowedPrice,
            borrowedValues,
            liquidated: false
        }
    }
})
export const positionAtOpenState = selector<PositionStatus | undefined>({
    key: "positionAtOpen",
    get: ({get}) => {
        const farmInput = get(farmInputState);
        if (!farmInput) return undefined;
        const price1 = farmInput.assetDetails[0].price || 0;
        const price2 = farmInput.assetDetails[1].price || 0;

        const borrowed = get(borrowedState)!;
        const assetsValue = get(assetsValueState)!;
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
export const positionAtCloseState = selector<PositionStatus|undefined>({
    key: "positionAtClose",
    get: ({get}) => {
        const positionAtOpen = get(positionAtOpenState);
        if (!positionAtOpen) return undefined;
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

export const borrowedAtCloseState = selector<Borrowed | undefined>({
    key: "borrowedAtClose",
    get: ({get}) => {
        const poolInfo = get(poolInfoState);
        const borrowedAtOpen = get(borrowedState);
        const estimation = get(estimationState);
        const positionAtClose = get(positionAtCloseState);
        if (!poolInfo || !borrowedAtOpen || !positionAtClose) return undefined;
        // const borrowedIndex = borrowedAtOpen.borrowedIndex;
        const price = estimation.prices[1];
        const borrowedAmount = borrowedAtOpen.borrowedAmount ?? "0";
        const valueInBusd = parseFloat(borrowedAmount) * price
        const borrowedValues = calculateValues(valueInBusd, estimation.prices[0], estimation.prices[1]);
        const debtRatio = valueInBusd / positionAtClose.positionValues[2]
        const liquidated = debtRatio >= poolInfo.liquidationThreshold;
        return {
            // borrowedIndex,
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

export const positionAfterCloseState = selector<PositionStatusAfterClose | undefined>({
    key: "positionAfterClose",
    get: ({get}) => {
        const borrowedAtClose = get(borrowedAtCloseState);
        const positionAtClose = get(positionAtCloseState)!;
        if (!borrowedAtClose || !positionAtClose) return undefined;
        const estimation = get(estimationState);
        let busdValue = positionAtClose.positionValues[2] - borrowedAtClose.borrowedValues[2];
        if (borrowedAtClose.liquidated) {
            busdValue = busdValue * 0.95;
        }
        const price1AtClose = estimation.prices[0] ?? 0;
        const price2AtClose = estimation.prices[1] ?? 0;
        const positionValuesAfterClose = calculateValues(busdValue, price1AtClose, price2AtClose);
        const borrowedAmount = parseFloat(borrowedAtClose.borrowedAmount ?? "0");
        // const borrowedIndex = borrowedAtClose.borrowedIndex;
        const borrowedIndex = 1;
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

export const gainOrLossState = selector<GainOrLoss | undefined>({
    key: "gainOrLoss",
    get: ({get}) => {
        const positionAfterClose = get(positionAfterCloseState);
        const assetsValueAtOpen = get(assetsValueState);
        if (!positionAfterClose || !assetsValueAtOpen) return undefined;
        const value = positionAfterClose.positionValues[2] - assetsValueAtOpen[2];
        const percent = value / assetsValueAtOpen[2]
        return {
            value,
            percent,
        }
    }
})
const priceChangePercent = (openPrice?: number, closePrice?: number) => {
    if (openPrice && openPrice !== 0) {
        return closePrice ? closePrice / openPrice : 0;
    }
    return 0;
}
export const gainOrLossWithApyState = selector<GainOrLossWithApy|undefined>({
    key: "gainOrLossWithApy",
    get: ({get}) => {
        const gainOrLoss = get(gainOrLossState);
        const initAssetValue = get(assetsValueState);
        const positionAtOpen = get(positionAtOpenState);
        const positionAtClose = get(positionAtCloseState);
        const estimation = get(estimationState);
        if (!gainOrLoss || !initAssetValue || !positionAtOpen || !positionAtClose || !estimation.farmingDays) return undefined;
        const farmInput = get(farmInputState)!;
        const finalApr = get(finalAprState)!;
        const positionAfterClose = get(positionAfterCloseState)!;
        let {value: initGainOrLoss} = gainOrLoss;
        const averagePositionValue = (initAssetValue[2] + positionAfterClose.positionValues[2]) / 2;
        console.log("init: ", initAssetValue[2]);
        console.log("after close: ", positionAfterClose.positionValues[2]);
        console.log("average: ", averagePositionValue);
        // const averageValue = (positionAtOpen.positionValues[2] + positionAtClose.positionValues[2]) / 2;
        // const farmGain = (Math.pow(finalApr.dailyApr / 100 + 1, estimation.farmingDays) - 1) * averageValue;
        // value += farmGain
        // const percent = value / assetsValueAtOpen[2]

        const alpacaRewards = averagePositionValue * (finalApr.alpacaApr / 100) * estimation.farmingDays / 365;
        const farmApr = finalApr.yieldFarmApr + finalApr.tradingFeeApr;

        const changeInNonBorrowAsset = priceChangePercent(farmInput.assetDetails[0].price, estimation.prices[0])
        const changeInBorrowAsset = priceChangePercent(farmInput.assetDetails[1].price, estimation.prices[1])
        const lpAssetValuePercent = Math.sqrt(changeInNonBorrowAsset * changeInBorrowAsset)
        const lyfGain = (initAssetValue[2] * farmInput.leverage) * (1 + lpAssetValuePercent) / 2 * (Math.exp(farmApr / 100 * estimation.farmingDays / 365) - 1);
        const totalFarmEarning = lyfGain + alpacaRewards;
        const interest = initAssetValue[2] * (1 + changeInBorrowAsset) / 2 * (Math.exp(finalApr.interestApr / 100 * estimation.farmingDays / 365) - 1);
        const yfGain = totalFarmEarning - interest;
        const value = yfGain + initGainOrLoss;
        const percent = value / initAssetValue[2];

        // const positionValue = (assetValues[2] * farmInput.leverage) * (1 + lpAssetValuePercent) / 2 * Math.exp(farmApr / 100 * estimation.farmingDays / 365) + alpacaRewards;

        return {
            yfGain,
            value,
            percent,
            alpacaRewards,
            interest
        }
    }
})
