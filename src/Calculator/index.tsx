import React, {useEffect, useState} from 'react';
import poolMetas from "./poolMetas";
import {Image, Input, Select, Card, Spin, Row, Col, Space, Slider, Button} from 'antd';
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
                    <div className={"mt-1 lg:mt-4 lg:mx-7 text-base lg:text-2xl font-bold FarmChoosePosition"}>
                        <Row align={"middle"}>
                            <Col span={10}>
                                <span>Which pool would like to farm?</span>
                            </Col>
                            <Col>
                                <Select className={"c-poolSelector mx-4 w-64"} onChange={choosePool} dropdownClassName={"FarmChoosePosition"}>
                                    {poolMetas.map((meta, i) => (
                                        <Option value={meta.name} key={`farm-${meta.name}`}>
                                            <Row justify={"start"} align={"middle"}>
                                                <Col>
                                                    <div className={"c-image__twoStack mr-2"}>
                                                        <Image
                                                            className={"h-6 w-6 rounded-full bg-white shadow-md"}
                                                            src={getCoinUrl(meta.name.split("-")[0])}
                                                            preview={false}/>
                                                        <Image
                                                            className={"h-6 w-6 rounded-full bg-white shadow-md"}
                                                            src={getCoinUrl(meta.name.split("-")[1])}
                                                            preview={false}/>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    {meta.name}
                                                </Col>
                                            </Row>
                                        </Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
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
                                            <div className="ant-row mt-6 lg:mt-10 lg:mx-4 text-sm lg:text-xl font-bold">
                                                <div className="ant-col"><span>Leverage</span></div>
                                            </div>
                                            <Row className={"mt-4 ml-2 lg:mt-7 lg:ml-8 lg:mr-4"}>
                                                <Col span={24}>
                                                    <Row justify={"center"} className={"SliderBarInput"}>
                                                        <Col xs={18} lg={20}>
                                                            <Slider
                                                                marks={{
                                                                    1: "1.00x",
                                                                    1.25: "1.25x",
                                                                    1.5: "1.50x",
                                                                    1.75: "1.75x",
                                                                    2: "2.00x",
                                                                }}
                                                                defaultValue={2}
                                                                min={1}
                                                                max={2}
                                                                // onChange={this.onChange}
                                                                // value={typeof inputValue === 'number' ? inputValue : 0}
                                                                step={0.01}
                                                            />
                                                        </Col>
                                                        <Col offset={1} xs={5} lg={3}>
                                                            <Input className={"w-full rounded-lg"} suffix={"x"}/>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className={"mt-6 lg:mt-10 lg:mx-4 text-sm lg:text-xl font-bold"}>
                                                <Col>
                                                    <span>Which asset would you like to borrow?</span>
                                                </Col>
                                            </Row>
                                            <Row className={"mt-4 lg:mt-7 lg:mx-4"}>
                                                <Col span={24}>
                                                    <Select className={"c-assetSelector"} dropdownClassName={"FarmOpenPositionInput"}>
                                                        {assets.map((asset) => (
                                                            <Option value={asset} key={`borrow-${asset}`}>
                                                                <Row align={"middle"}>
                                                                    <Col style={{
                                                                        paddingLeft: "8px",
                                                                        paddingRight: "8px",
                                                                        flex: "0 0 auto"
                                                                    }}>
                                                                        <img
                                                                            className={"c-assetSelector__optionList__option__icon"}
                                                                            src={getCoinUrl(asset)}
                                                                        />
                                                                    </Col>
                                                                    <Col style={{
                                                                        paddingLeft: "8px",
                                                                        paddingRight: "8px",
                                                                        flex: "0 0 auto"
                                                                    }}>
                                                                        {asset}
                                                                    </Col>
                                                                </Row>
                                                            </Option>
                                                        ))}
                                                    </Select>
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
