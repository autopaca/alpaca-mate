import {Col, Row, Select} from "antd";
import {getCoinUrl} from "../utils";
import React from "react";
import InputTitle from "./InputTitle";

const {Option} = Select;

const AssetToBorrow = (props: {
    assets: string[],
    borrowedIndex: number,
    setBorrowed: (b: number) => void;
}) => {
    return (
        <>
            <InputTitle content={"Which asset would you like to borrow?"}/>
            <Row className={"mt-4 lg:mt-7 lg:mx-4"}>
                <Col span={24}>
                    <Select
                        className={"c-assetSelector"}
                        dropdownClassName={"FarmOpenPositionInput"}
                        value={props.borrowedIndex}
                        onChange={props.setBorrowed}
                    >
                        {props.assets.map((asset, index) => (
                            <Option value={index} key={`borrow-${asset}-${index}`}>
                                <Row align={"middle"}>
                                    <Col style={{paddingLeft: "8px", paddingRight: "8px", flex: "0 0 auto"}}>
                                        <img
                                            className={"c-assetSelector__optionList__option__icon"}
                                            src={getCoinUrl(asset)}
                                        />
                                    </Col>
                                    <Col style={{paddingLeft: "8px", paddingRight: "8px", flex: "0 0 auto"}}>
                                        {asset}
                                    </Col>
                                </Row>
                            </Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        </>
    )
}
export default AssetToBorrow;