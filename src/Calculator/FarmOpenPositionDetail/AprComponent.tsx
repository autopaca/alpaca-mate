import React from 'react';
import {ArrowRightOutlined} from "@ant-design/icons";
import {Space} from "antd";

function AprComponent(props: {
    baseValue: number,
    leveragedValue: number
}) {
    return (
        <Space>
            <span>{props.baseValue.toFixed(2)}%</span>
            <ArrowRightOutlined className={"c-apr-arrow"}/>
            <span>{props.leveragedValue.toFixed(2)}%</span>
        </Space>
);
}

export default AprComponent;