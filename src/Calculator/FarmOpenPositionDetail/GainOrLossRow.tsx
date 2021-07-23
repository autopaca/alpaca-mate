import React, {useState} from 'react';
import {Col, Row, Select} from "antd";
import {GainOrLoss} from "../type";
import {formatValue, ratioToPercent} from "../utils";
const {Option} = Select;

function GainOrLossRow(props: {
    title: string,
    gainOrLoss?: GainOrLoss
}) {
    const [chosenIndex, setChosenIndex] = useState<number>(0);
    const {gainOrLoss} = props;
    const options = () => {
        return ["Value", "Percent"].map((v, i) => (
            <Option key={`gol-${v}`} value={i}>
                {v}
            </Option>)
        );
    }
    const renderValue = () => {
        if (chosenIndex === 0) {
            return `$${formatValue(gainOrLoss?.value)}`;
        }
        return ratioToPercent(gainOrLoss?.percent);
    }
    return (
        <Row wrap={false} className={"my-4"} align={"middle"}>
            <Col style={{flex: "1 1 auto", minWidth: "0px", fontWeight: 400}} className={"text-left"}>
                <span style={{display: "inline-block"}}>{props.title}
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
                <span className={gainOrLoss && gainOrLoss.value < 0 ? "text-red-500" : ""}>
                    {renderValue()}
                </span>
            </Col>
        </Row>
    );
}

export default GainOrLossRow;