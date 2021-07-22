import React from 'react'
import './App.css'
import Calculator from "./Calculator";
import {Col, Layout, Row} from "antd";

const {Header, Footer, Content} = Layout;


function App() {

    return (
        <div className="App transition-filter duration-300">
            <Layout style={{background: "transparent"}}>
                <Header style={{background: "transparent"}} className={"flex content-center justify-center"}>
                    <Row justify={"center"} align={"middle"} className={"NavigationBar"}>
                        <Col>
                            <span className={"mx-4 my-4 c-appName text-lg lg:text-4xl inline-block lg:inline"}>
                            Alpaca Mate
                            </span>
                            <span className={"text-sm lg:text-lg"}>
                            an Emulator of Alpaca Leveraged Yield Farm
                            </span>
                        </Col>
                    </Row>
                </Header>
                <Layout style={{background: "transparent"}} >
                    {/*<Sider style={{background: "transparent"}} className={""}/>*/}
                    <Content className={"w-full lg:m-auto max-w-screen-lg min-w-screen-lg"}>
                        <Calculator/>
                    </Content>
                </Layout>
                <Footer style={{background: "transparent"}}>
                    <p>
                    Note: this is a purely community driven project,
                        it is <b>not</b> created by the official Alpaca Finance team.
                    </p>
                    <p>
                        This project is still in early stage, it's highly possible that there are bugs inside.
                        If you find any bugs or have any questions, please contact me via telegram @joe_999.
                    </p>
                </Footer>
            </Layout>
        </div>
    )
}

export default App
