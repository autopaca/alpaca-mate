import React from 'react';
import {Tooltip} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

function InfoTooltip(props: {title: string}) {
    return (
    <Tooltip
        title={props.title}
    >
        <ExclamationCircleOutlined style={{position: "relative", bottom: "4px", left: "6px"}} />
    </Tooltip>
    );
}

export default InfoTooltip;