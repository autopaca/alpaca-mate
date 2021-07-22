import {Col, Input, Row, Slider} from "antd";
import React from "react";
import InputTitle from "./InputTitle";

const FarmLeverage = (props: {
    leverage: number,
    setLeverage: (l: number) => void,
    maxLeverage: number
}) => {
    const numToLabel = (n: number) => (`${n.toFixed(2).toString()}x`)
    const getMarks = () => {
        const {maxLeverage} = props;
        let l = 1;
        let res: {[key: number]: string} = {};
        while (l <= maxLeverage) {
            res[l] = numToLabel(l);
            l += 0.5;
        }
        if (l - maxLeverage < 0.5) { // deal with maxLeverage being something like 2.1
            res[maxLeverage] = numToLabel(maxLeverage);
        }
        return res;
    }
    const onInputChange = (e: any) => {
        props.setLeverage(e.target.value);
    }
    const onSliderChange = (v: number) => {
        props.setLeverage(v);
    }
    return (
        <>
            <InputTitle content={"Leverage"}/>
            <Row className={"mt-4 ml-2 lg:mt-7 lg:ml-8 lg:mr-4"}>
                <Col span={24}>
                    <Row justify={"center"} className={"SliderBarInput"}>
                        <Col xs={18} lg={20}>
                            <Slider
                                marks={getMarks()}
                                defaultValue={props.maxLeverage}
                                min={1}
                                max={props.maxLeverage}
                                onChange={onSliderChange}
                                value={props.leverage}
                                step={0.01}
                            />
                        </Col>
                        <Col offset={1} xs={5} lg={3}>
                            <Input
                                className={"w-full rounded-lg"}
                                suffix={"x"}
                                value={props.leverage}
                                defaultValue={props.maxLeverage}
                                onChange={onInputChange}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default FarmLeverage;