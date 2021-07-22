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

function DetailsAtClosing() {
    const assets = useRecoilValue(assetsState);
    const borrowedAtClose = useRecoilValue(borrowedAtCloseState);
    const poolInfo = useRecoilValue(poolInfoState);
    const relativeAtClose = useRecoilValue(relativeInfoAtCloseState);
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
                </span>} />
            <RelativePriceRow title={"Relative Price"} relativeInfo={relativeAtClose} />
            <DetailsRow
                left={<><span className="block lg:inline-block mr-1">Total Assets in</span>
                    <span className="block lg:inline-block">Position Value</span></>}
                right={`${positionAtClose.positionDetails[0].amount ?? "0.00"} ${assets![0]} + ${positionAtClose.positionDetails[1].amount ?? "0.00"} ${assets![1]}`}
            />
            <VariousValueRow title={"Position Value"} assetsValues={positionAtClose.positionValues}/>
            <VariousValueRow title={<>
                <span className="block lg:inline-block mr-1">Asset Borrowed</span>
                <span className="block lg:inline-block text-xs lg:text-lg">(Debt Value)</span></>}
                             assetsValues={borrowedAtClose.borrowedValues}
                             defaultIndex={borrowedAtClose.borrowedIndex}
            />
            <DetailsRow
                left={"Debt Ratio"}
                right={`${(borrowedAtClose.debtRatio * 100).toFixed(2)}%`}
            />
            <DetailsRow
                left={"Liquidation Threshold"}
                right={`${(poolInfo!.liquidationThreshold * 100).toFixed(2)}%`}
            />
            <DetailsRow
                left={"Safety Buffer"}
                right={`${((poolInfo!.liquidationThreshold - borrowedAtClose.debtRatio) * 100).toFixed(2)}%`}
            />
            <ReturnValueRow />
            <VariousValueRow title={"Equity Value"} assetsValues={positionAfterClose.positionValues}/>
            <GainOrLossRow  title={"Profit/Loss"} gainOrLoss={gainOrLoss}/>
        </>
    );
}

export default DetailsAtClosing;