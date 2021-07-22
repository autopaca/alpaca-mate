import React from 'react';
import {Col, Image, Input, InputNumber, Row, Space} from "antd";
import {getCoinUrl} from "../utils";

function PriceInput(props: {
    asset: string,
    price?: number,
    onPriceChange: (price: number) => void;
}) {
    return (
        <Row>
            <Col span={24} className={"my-4 text-left"}>
                    <span className={"AssetPriceLine"}>
                        <Space>
                        <Image
                            className={"mt-1 assetPriceImage"}
                            src={getCoinUrl(props.asset)}
                            height={"20px"}
                            preview={false}/>
                        <span>1 {props.asset}</span>
                        <span>=</span>
                        <InputNumber className={"w-auto c-input"} value={props.price} onChange={props.onPriceChange}/>
                        <span>BUSD</span>
                        </Space>
                    </span>
            </Col>
        </Row>
    );
}

export default PriceInput;