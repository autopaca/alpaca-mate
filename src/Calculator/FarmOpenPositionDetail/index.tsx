import React from "react";
import "./index.css";
import {Divider} from "antd";
import AprDetails from "./AprDetails";
import DetailsAtOpening from "./DetailsAtOpening";
import DetailsAtClosing from "./DetailsAtClosing";
import WithApy from "./WithApy";
import {useRecoilValue} from "recoil";
import {poolInfoState} from "../../Store";

const FarmOpenPositionDetail = () => {
    const poolInfo = useRecoilValue(poolInfoState);
    return (
        <div className={"FarmOpenPositionDetail"} key={poolInfo?.pool}>
            <DetailsAtOpening />
            <Divider/>
            <DetailsAtClosing />
            <Divider/>
            <AprDetails/>
            <Divider/>
            <WithApy />
        </div>
    );
}
export default FarmOpenPositionDetail;