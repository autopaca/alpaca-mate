import React from "react";
import "./index.css";
import {Divider} from "antd";
import AprDetails from "./AprDetails";
import DetailsAtOpening from "./DetailsAtOpening";
import DetailsAtClosing from "./DetailsAtClosing";
import WithApy from "./WithApy";

const FarmOpenPositionDetail = () => {
    return (
        <div className={"FarmOpenPositionDetail"}>
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