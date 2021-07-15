import React, {useEffect, useState} from 'react';
import poolMetas from "./poolMetas";
import {Button, Checkbox, Image, Input, Select, Card, Spin, Row, Col, Space} from 'antd';
import "./index.css";

const {Option} = Select;

const getCoinUrl = (coin: string) => `https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/icons/coins/${coin.toLowerCase()}.svg`


const getInputPrefixCoinImage = (coin: string) => (
    <div>
        <img src={getCoinUrl(coin)}
             className={"c-input__prefix c-input__prefix--d hidden lg:flex"}/>
        <img src={getCoinUrl(coin)}
             className={"c-input__prefix c-input__prefix--m bg-white lg:hidden"}/>
    </div>
)
const getInputSuffixText = (coin: string) => (
    <span className={"c-input__suffix"}>{coin.toUpperCase()}</span>
)

const getPriceInputRow = (asset: string) => (
    <Row className={"my-6 lg:mx-4"}>
        <Col span={24}>
            <Row>
                <Col span={24}>
                    <div className={"InputPercent"}>
                        <Input className={"c-input"}
                               prefix={getInputPrefixCoinImage(asset)}
                               suffix={getInputSuffixText(asset)}
                               placeholder="0.00"
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24} className={"my-4 text-left"}>
                    <span className={"AssetPriceLine"}>
                        <Space>
                        <Image
                            className={"mt-1 assetPriceImage"}
                            src={getCoinUrl(asset)}
                            height={"20px"}
                            preview={false}/>
                        <span>1 {asset}</span>
                        <span>=</span>
                        <Input className={"w-auto"}/>
                        <span>BUSD</span>
                        </Space>
                    </span>
                </Col>
            </Row>
        </Col>
    </Row>
)

function Calculator() {
    const [pool, setPool] = useState<string | undefined>(undefined)
    const [assets, setAssets] = useState<string[]>([]);
    const [infos, setInfos] = useState<string[]>([]);
    useEffect(() => {
        if (pool) {
            setAssets(pool.split("-"));
        }
    }, [pool])
    const choosePool = (v: string) => {
        setPool(v);
    }
    const onValuesChange = (changedValues: any, allValues: any) => {

    }
    return (
        <div className={"Calculator"}>
            <Spin spinning={false}>
                <Card className={"rounded-3xl"}>
                    <div className={"mt-1 lg:mt-4 lg:mx-7 text-base lg:text-2xl font-bold"}>
                        <span>Farm</span>
                        <Select className={"mx-4 w-64"} onChange={choosePool}>
                            {poolMetas.map((meta, i) => (
                                <Option value={meta.name} key={i}>{meta.name}</Option>
                            ))}
                        </Select>
                        <span>pool</span>
                    </div>
                    <Row className={"mt-6 lg:mt-8 text-sm lg:text-xl lg:mx-7"}>
                        <Col span={24}>
                            <div className={"FarmOpenPositionInput"}>
                                <Row className={"lg:block"}>
                                    <Col span={24}>
                                        <Card className={"c-card"}>
                                            <Row className={"lg:mt-2 lg:mx-4 text-sm font-bold lg:text-2xl"}>
                                                <Col span={24} className={"text-center lg:text-left"}>
                                                    <span>How much would you like to add for farming?</span>
                                                </Col>
                                            </Row>
                                            {assets.length === 2 &&
                                            <>
                                                {getPriceInputRow(assets[0])}
                                                {getPriceInputRow(assets[1])}
                                            </>
                                            }
                                            <div className="ant-row mt-6 lg:mt-10 lg:mx-4 text-sm lg:text-xl font-bold"
                                                 style={{rowGap: "0px"}}>
                                                <div className="ant-col"><span>Leverage</span></div>
                                            </div>
                                            <Row className={"mt-4 ml-2 lg:mt-7 lg:ml-8 lg:mr-4"} style={{rowGap: "0px"}}>
                                                <Col span={24}>

                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>

                        </Col>
                    </Row>
                </Card>
            </Spin>

        </div>

    );
}

export default Calculator;
