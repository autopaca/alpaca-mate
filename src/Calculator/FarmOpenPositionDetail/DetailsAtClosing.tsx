import React from 'react';
import {useRecoilValue} from "recoil";
import {
    assetsState,
    assetsValueState,
    borrowedState,
    farmInputState,
    relativeInfoAtCloseState,
    positionAtOpenState,
    positionAtCloseState,
    borrowedAtCloseState,
    poolInfoState,
    positionAfterCloseState,
    gainOrLossState
} from "../../Store";
import DetailsTitle from "./DetailsTitle";
import DetailsRow from "./DetailsRow";
import VariousValueRow from "./VariousValueRow";
import RelativePriceRow from "./RelativePriceRow";
import ReturnValueRow from "./ReturnValueRow";
import GainOrLossRow from "./GainOrLossRow";
import InfoTooltip from "./InfoTooltip";
import {ratioToPercent, renderAssets} from "../utils";

function DetailsAtClosing() {
    const assets = useRecoilValue(assetsState);
    const borrowedAtClose = useRecoilValue(borrowedAtCloseState);
    const poolInfo = useRecoilValue(poolInfoState);
    const relativeAtClose = useRecoilValue(relativeInfoAtCloseState)!;
    const positionAtClose = useRecoilValue(positionAtCloseState);
    const positionAfterClose = useRecoilValue(positionAfterCloseState);
    const gainOrLoss = useRecoilValue(gainOrLossState);
    return (
        <>
            <DetailsTitle content={
                <span>At Closing
                    <InfoTooltip
                        title="Without considering Yield Farm APY"
                    />
                </span>}/>
            <RelativePriceRow title={"Relative Price"} relativeInfo={relativeAtClose}/>
            <DetailsRow
                left={<><span className="block lg:inline-block mr-1">Total Assets in</span>
                    <span className="block lg:inline-block">Position Value</span></>}
                right={renderAssets(assets!, positionAtClose?.positionDetails)}
            />
            <VariousValueRow title={"Position Value"} assetsValues={positionAtClose?.positionValues}/>
            <VariousValueRow
                title={<>
                    <span className="block lg:inline-block mr-1">Asset Borrowed</span>
                    <span className="block lg:inline-block text-xs lg:text-lg">(Debt Value)</span></>}
                assetsValues={borrowedAtClose?.borrowedValues}
                defaultIndex={1}
            />
            <DetailsRow
                left={"Debt Ratio"}
                right={ratioToPercent(borrowedAtClose?.debtRatio)}
            />
            <DetailsRow
                left={"Liquidation Threshold"}
                right={ratioToPercent(poolInfo?.liquidationThreshold)}
            />
            <DetailsRow
                left={"Safety Buffer"}
                right={ratioToPercent(poolInfo && borrowedAtClose && (poolInfo.liquidationThreshold - borrowedAtClose.debtRatio))}
            />
            <ReturnValueRow/>
            <VariousValueRow title={"Equity Value"} assetsValues={positionAfterClose?.positionValues}/>
            <GainOrLossRow title={"Profit/Loss"} gainOrLoss={gainOrLoss}/>
        </>
    )
}

export default DetailsAtClosing;
