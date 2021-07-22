import {Col, Image, Input, InputNumber, Row, Space} from "antd";
import InputPrefixCoinImage from "./InputPrefixCoinImage";
import InputSuffixText from "./InputSuffixText";
import {getCoinUrl} from "../utils";
import React from "react";
import PriceInput from "./PriceInput";

const PriceInputRow = (props: {
    asset: string,
    amount?: string,
    setAmount: (n?: string) => void,
    price?: number,
    setPrice: (n?: number) => void,
}) => {
    const onAmountChange = (e: any) => {
        props.setAmount(e.target.value);
    }
    const onPriceChange = (e: any) => {
        props.setPrice(e.target.value);
    }
    return (
        <Row className={"my-6 lg:mx-4"}>
            <Col span={24}>
                <Row>
                    <Col span={24}>
                        <div className={"InputPercent"}>
                            <Input className={"c-input"}
                                   prefix={<InputPrefixCoinImage coin={props.asset}/>}
                                   suffix={<InputSuffixText coin={props.asset}/>}
                                   placeholder="0.00"
                                   value={props.amount}
                                   onChange={onAmountChange}
                            />
                        </div>
                    </Col>
                </Row>
                <PriceInput
                    asset={props.asset}
                    price={props.price}
                    onPriceChange={props.setPrice}
                />
            </Col>
        </Row>
    )
}

export default PriceInputRow;