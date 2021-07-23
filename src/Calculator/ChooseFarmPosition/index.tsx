import {Col, Image, Row, Select} from "antd";
import React from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {poolState} from "../../Store";
import poolMetas from "../../poolMetas";
import {getCoinUrl} from "../utils";
import "./index.css";

const {Option} = Select;

const ChooseFarmPosition = () => {
    const [pool, setPool] = useRecoilState(poolState);
    return (
        <div className={"mt-1 lg:mt-4 lg:mx-7 text-base lg:text-2xl font-bold ChooseFarmPosition"}>
            <Row align={"middle"}>
                <Col span={10}>
                    <span>Which pool would like to farm?</span>
                </Col>
                <Col>
                    <Select
                        value={pool?.poolIndex}
                        showSearch={true}
                        filterOption={(input, option) =>
                            option!.key!.toString().toLowerCase().includes(input.toLowerCase())}
                        className={"c-poolSelector mx-4 w-64"}
                        onChange={(i: number) => setPool({poolIndex: i, poolMeta: poolMetas[i]})}
                        dropdownClassName={"ChooseFarmPosition"}
                    >
                        {poolMetas.map((meta, i) => (
                            <Option value={i} key={`farm-${meta.pool}-${i}`}>
                                <Row justify={"start"} align={"middle"}>
                                    <Col>
                                        <div className={"c-image__twoStack mr-2"}>
                                            <Image
                                                className={"h-6 w-6 rounded-full bg-white shadow-md"}
                                                src={getCoinUrl(meta.pool.split("-")[1])}
                                                preview={false}/>
                                            <Image
                                                className={"h-6 w-6 rounded-full bg-white shadow-md"}
                                                src={getCoinUrl(meta.pool.split("-")[0])}
                                                preview={false}/>
                                        </div>
                                    </Col>
                                    <Col>
                                        {meta.pool}
                                    </Col>
                                </Row>
                            </Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        </div>
    )
}
export default ChooseFarmPosition;