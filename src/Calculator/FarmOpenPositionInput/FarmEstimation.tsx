import React from 'react';
import {Col, Input, Row} from "antd";
import InputTitle from "./InputTitle";
import {useRecoilState, useRecoilValue} from "recoil";
import {assetsState, estimationState, farmInputState} from "../../Store";
import PriceInput from "./PriceInput";

function FarmEstimation() {
    const [estimation, setEstimation] = useRecoilState(estimationState);
    const assets = useRecoilValue(assetsState);
    const onDaysChange = (e: any) => {
        const days = e.target.value;
        setEstimation(old => ({...old, farmingDays: days}));
    }
    const onPriceChange = (index: number, price: number) => {
        const newPrices = [...estimation.prices];
        newPrices[index] = price;
        setEstimation(old => ({...old, prices: newPrices}))
    }
    return (
        <div className={"FarmEstimation"}>
            <InputTitle content={"Estimation"} size={"l"}/>
            <InputTitle content={"How many days would you like to farm?"} />
            <Row className={"my-4 lg:mx-4"}>
                <Col span={24}>
                    <Input className={"c-input c-farming-days"}
                           suffix={"Days"}
                           placeholder="0"
                           value={estimation.farmingDays}
                           onChange={onDaysChange}
                    />
                </Col>
            </Row>
            <InputTitle content={"Please estimate the prices of both assets when you close the position"} />
            {
                [0, 1].map(index => (
                    <PriceInput
                        asset={assets![index]}
                        price={estimation.prices[index]}
                        onPriceChange={v => onPriceChange(index, v)}
                    />
                ))
            }

        </div>
    );
}

export default FarmEstimation;