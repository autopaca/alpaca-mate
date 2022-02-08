import React from 'react';
import './App.css';
import Calculator from './Calculator';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import WalletTest from './WalletTest';
import AsideMenu from './AsideMenu';

const { Footer, Content } = Layout;

function App() {

  return (
      <Layout className='mx-auto min-h-view w-screen-xl px-4 duration-300 justify-between !bg-transparent lg:px-8'>
        <Header />
        <Layout className='w-full !bg-transparent lg:m-auto'>
          <AsideMenu />
          <Content className={'w-full'}>
            <Switch>
              {/*<Route path="/test">*/}
              {/*  <PositionHistory />*/}
              {/*</Route>*/}
              <Route exact path="/">
                <Calculator />
              </Route>
              <Route exact path="/wallet-test">
                <WalletTest />
              </Route>
            </Switch>
          </Content>
        </Layout>
        <Footer className='!bg-transparent'>
          <p>
            Note: this is a purely community driven project, it is <b>not</b> created by the official Alpaca Finance
            team.
          </p>
          <p>
            This project is still in early stage, it's highly possible that there are bugs inside. If you find any bugs
            or have any questions, please contact me via telegram @joe_999.
          </p>
          <p>
            Please donate to support this project if you think it is helpful. BSC or Ethereum wallet:
            0xaf636d5234802333aFdc7DBC6E48147c4432f8aD
          </p>
        </Footer>
      </Layout>
  );
}

export default App;
