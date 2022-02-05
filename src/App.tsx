import React from 'react';
import './App.css';
import Calculator from './Calculator';
import { Card, Layout, Menu } from 'antd';
import { Link, NavLink, Route, Switch, useLocation } from 'react-router-dom';
import Header from './Header';
import WalletTest from './WalletTest';

const { Footer, Content, Sider } = Layout;
function App() {

  const { pathname } = useLocation();

  return (
    <Layout className='min-h-view px-4 duration-300 justify-between App'>
      <Header />
      <Layout className='w-screen-xl !bg-transparent lg:m-auto'>
        <Sider className='mr-4 !bg-transparent'>
          <Menu selectedKeys={[pathname]} className='rounded-3xl overflow-hidden'>
            <Menu.Item key='/'>
              <NavLink exact to='/' activeClassName='pointer-events-none'>Caculator</NavLink>
            </Menu.Item>
            <Menu.Item key='/wallet-test'>
              <NavLink exact to='/wallet-test' activeClassName='pointer-events-none'>Wallet Info</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
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
