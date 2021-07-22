import React from 'react';
import {Col, Row} from "antd";

function InputTitle(props: {
    content: string,
    size?: "s" | "l"
}) {
    const cn = () => {
        const size = props.size ?? "s";
        return size === "l" ?
            "lg:mt-2 lg:mx-4 text-sm font-bold lg:text-2xl" :
            "mt-6 lg:mt-10 lg:mx-4 text-sm lg:text-xl font-bold";
    }
    return (
        <Row className={cn()}>
            <Col span={24} className={"text-center lg:text-left"}>
                <span>{props.content}</span>
            </Col>
        </Row>
    );
}

export default InputTitle;