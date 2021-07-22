import {Card, Col, Divider, Row} from "antd";
import React from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {assetsState, farmInputState, poolInfoState, poolState} from "../../Store";
import AmountAndPriceInput from "./AmountAndPriceInput";
import AssetToBorrow from "./AssetToBorrow";
import FarmLeverage from "./FarmLeverage";
import "./index.css";
import FarmEstimation from "./FarmEstimation";
import poolMetas, {possibleBorrowAssets} from "../../poolMetas";

const FarmOpenPositionInput = () => {
    const assets = useRecoilValue(assetsState);
    const setPool = useSetRecoilState(poolState);
    const poolInfo = useRecoilValue(poolInfoState);
    const [farmInput, setFarmInput] = useRecoilState(farmInputState);
    const canBeBorrowed = () => {
        const ary: string[] = [];
        assets!.forEach(a => {
            if (possibleBorrowAssets().has(a)) {
                ary.push(a)
            }
        })
        return ary;
    }
    const setBorrowed = (b: number) => {
        if (b != farmInput.borrowedIndex) {
            const newPoolName = `${assets![1]}-${assets![0]}`
            const newPool = poolMetas.find(p => p.pool === newPoolName)
            newPool && setPool(newPool)
        }
    }
    return (
        <Row className={"mt-2 text-sm lg:text-xl lg:mx-7"}>
            <Col span={24}>
                <div className={"FarmOpenPositionInput"}>
                    <Row className={"lg:block"}>
                        <Col span={24}>
                            <Card className={"c-card"}>
                                <AmountAndPriceInput assets={assets!}/>
                                <FarmLeverage
                                    leverage={farmInput.leverage}
                                    setLeverage={l => setFarmInput(old => ({...old, leverage: l}))}
                                    maxLeverage={poolInfo!.leverage!}
                                />
                                <AssetToBorrow
                                    assets={canBeBorrowed()!}
                                    borrowedIndex={farmInput.borrowedIndex}
                                    setBorrowed={setBorrowed}
                                />
                                <Divider />
                                <FarmEstimation />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}
export default FarmOpenPositionInput;