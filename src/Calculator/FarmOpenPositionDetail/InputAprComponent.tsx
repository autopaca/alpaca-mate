import React from 'react';
import {ArrowRightOutlined} from "@ant-design/icons";
import {InputNumber, Space} from "antd";

const InputAprComponent = (props: {
    baseValue: number,
    onChange: (n: number) => void,
    leveragedValue: number
}) => {
    return (
        <Space>
            <InputNumber<number>
                className={"w-20 c-input"}
                value={props.baseValue}
                defaultValue={0}
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => parseFloat(value!.replace('%', ''))}
                onChange={props.onChange}
            />
            <ArrowRightOutlined className={"c-apr-arrow"}/>
            <span>{props.leveragedValue}%</span>
        </Space>
    );
}

export default InputAprComponent;