import React from 'react';
import DetailsTitle from "./DetailsTitle";
import DetailsRow from "./DetailsRow";
import {useRecoilValue} from "recoil";
import {gainOrLossWithApyState} from "../../Store";
import GainOrLossRow from "./GainOrLossRow";

function WithApy() {
    const gainOrLossWithApy = useRecoilValue(gainOrLossWithApyState);
    return (
        <>
            <DetailsTitle  content={"With APY"}/>
            <DetailsRow
                left={"Yield Farm Earnings"}
                right={`$${gainOrLossWithApy?.farmGain?.toFixed(2) ?? "0.00"}`}
            />
            <GainOrLossRow  title={"Total Profit/Loss"} gainOrLoss={gainOrLossWithApy}/>
        </>
    );
}

export default WithApy;