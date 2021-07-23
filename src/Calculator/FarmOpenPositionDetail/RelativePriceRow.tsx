import React, {useState} from 'react';
import {Col, Row, Select} from "antd";
import {useRecoilValue} from "recoil";
import {relativeInfoAtOpenState} from "../../Store";
import {RelativeInfo} from "../type";
const {Option} = Select;

function RelativePriceRow(props: {
    title: string,
    relativeInfo: RelativeInfo,
}) {
    const [chosenIndex, setChosenIndex] = useState<number>(0);
    const options = () => {
        return props.relativeInfo.map((info, i) => (
            <Option key={`relative-${info.symbol}-${i}`} value={i}>
                {info.symbol}
            </Option>)
        );
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
                <span>{props.relativeInfo[chosenIndex].price.toFixed(4)}</span>
            </Col>
        </Row>
    );
}

export default RelativePriceRow;