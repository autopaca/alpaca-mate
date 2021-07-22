import React from 'react';
import {Col, Row} from "antd";

function DetailsTitle(props: {content: React.ReactNode}) {

    return (
        <Row className={"lg:mt-2 text-sm font-bold lg:text-2xl"}>
            <Col span={24} className={"text-center lg:text-left"}>
                <span>{props.content}</span>
            </Col>
        </Row>
    );
}

export default DetailsTitle;