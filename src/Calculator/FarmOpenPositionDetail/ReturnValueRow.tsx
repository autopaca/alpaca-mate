import React, {useState} from 'react';
import {Col, Row, Select} from "antd";
import {useRecoilValue} from "recoil";
import {assetsState, borrowedState, positionAfterCloseState} from "../../Store";
import {renderAssets} from "../utils";
const {Option} = Select;

function ReturnValueRow() {
    const [chosenIndex, setChosenIndex] = useState<number>(0);
    const {borrowedAssetLiteral} = useRecoilValue(borrowedState);
    const {positionDetails} = useRecoilValue(positionAfterCloseState);
    const assets = useRecoilValue(assetsState);
    const options = () => {
        const ops = ["Minimize Trading", `Convert to ${borrowedAssetLiteral}`]
        return ops.map((op, i) => (
            <Option key={`return-${op}`} value={i}>
                {op}
            </Option>)
        );
    }
    const renderValue = () => {
        let details;
        if (chosenIndex === 0) {
            details = positionDetails.minimizeTrading;
        } else {
            details = positionDetails.convertToBase;
        }
        return renderAssets(details, assets!)
    }

    return (
        <Row wrap={false} className={"my-4"} align={"middle"}>
            <Col style={{flex: "1 1 auto", minWidth: "0px", fontWeight: 400}} className={"text-left"}>
                <span style={{display: "inline-block"}}>
                    <span className="block lg:inline-block mr-1">You will receive</span>
                    <span className="block lg:inline-block">approximate</span>
                    <Select
                        className={"ml-4 w-36 in-asset-selector block lg:inline-block"}
                        onChange={setChosenIndex}
                        value={chosenIndex}
                    >
                        {options()}
                    </Select>
                </span>
            </Col>
            <Col style={{flex: "0 0 auto"}}>
                <span>{renderValue()}</span>
            </Col>
        </Row>
    );
}

export default ReturnValueRow;