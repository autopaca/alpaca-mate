import React from 'react'
import './App.css'
import Calculator from "./Calculator";
import {Layout} from "antd";

const { Header, Footer, Sider, Content } = Layout;


function App() {

    return (
        <div className="App transition-filter duration-300">
            <Layout style={{background: "transparent"}}>
                <Header style={{background: "transparent"}}>Header</Header>
                <Layout style={{background: "transparent"}}>
                    <Sider style={{background: "transparent"}}>Sider</Sider>
                    <Content className={"w-full lg:m-auto max-w-screen-lg min-w-screen-lg"}>
                        <Calculator />
                    </Content>
                </Layout>
                <Footer style={{background: "transparent"}}>Footer</Footer>
            </Layout>
        </div>
    )
}

export default App
