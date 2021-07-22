import {Col, Row} from "antd";
import React from "react";

const DetailsRow = (props: {
    left: React.ReactNode,
    right: React.ReactNode
}) => {
    return (
        <Row wrap={false} className={"my-4"} align={"middle"}>
            <Col style={{flex: "1 1 auto", minWidth: "0px", fontWeight: 400}} className={"text-left"}>
                <span style={{display: "inline-block"}}>{props.left}</span>
            </Col>
            <Col style={{flex: "0 0 auto"}}>
                <span>{props.right}</span>
            </Col>
        </Row>
    );
}
export default DetailsRow;