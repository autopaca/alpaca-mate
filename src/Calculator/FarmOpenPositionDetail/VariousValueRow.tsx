import {Col, Row, Select} from "antd";
import React, {useState} from "react";
import {useRecoilValue} from "recoil";
import {assetsState, assetsValueState} from "../../Store";
import {AssetValues, BUSD} from "../type.d";
import {formatValue} from "../utils";

const {Option} = Select;

const VariousValueRow = (props: {
    title: React.ReactNode,
    assetsValues?: AssetValues,
    defaultIndex?: number,
}) => {
    const assets = useRecoilValue(assetsState);
    const coins = () => {
        let c = assets!;
        if (c[0] !== BUSD && c[1] !== BUSD) {
            c = [...c, BUSD];
        }
        return c;
    }
    const [chosenIndex, setChosenIndex] = useState<number>(coins().length - 1);
    const options = () => {
        return coins().map((coin, i) => (
            <Option key={`in-${coin}`} value={i}>
                in {coin.toUpperCase()}
            </Option>)
        );
    }
    const renderValue = () => {
        if (!props.assetsValues) {
            return `0.00 ${coins()[chosenIndex]}`;
        }
        return `${formatValue(props.assetsValues[chosenIndex])} ${coins()[chosenIndex]}`;
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
                <span>{renderValue()}</span>
            </Col>
        </Row>
    );
}
export default VariousValueRow;