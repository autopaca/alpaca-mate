import React from 'react';
import './App.css';
import Calculator from './Calculator';
import { Col, Layout, Row } from 'antd';
import { useQuery } from 'react-query';
import { Route, Switch } from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import PositionHistory from './PositionHistory';

const { Header, Footer, Content } = Layout;
dayjs.extend(duration);

function App() {
  const { isLoading, error, data } = useQuery<{ current_price: number; image: string }[]>(
    'alpacaPriceData',
    () =>
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=alpaca-finance&per_page=250').then(
        (res) => res.json(),
      ),
    { staleTime: dayjs.duration({ minutes: 1 }).asMilliseconds() },
  );
  return (
    <div className="App transition-filter duration-300">
      <Layout style={{ background: 'transparent' }}>
        <Header style={{ background: 'transparent' }} className={'flex content-center justify-center lg:h-24 h-24'}>
          <Row justify={'center'} align={'middle'} className={'NavigationBar'} gutter={20}>
            <Col>
              <span className={'lg:mx-4 lg:my-4 c-appName text-lg lg:text-4xl block lg:inline-block'}>Alpaca Mate</span>
              <span className={'text-sm lg:text-lg block lg:inline-block'}>an Emulator of ALPACA</span>
              <span> </span>
              <span className={'text-sm lg:text-lg block lg:inline-block'}>Leveraged Yield Farm</span>
            </Col>
            {data && data.length === 1 && (
              <Col className={'flex flex-wrap content-center'}>
                <img className={'h-6 w-6 rounded-full bg-white shadow-md my-auto'} src={data[0].image} />
                <span className={'text-black my-auto ml-2'}>${data[0].current_price}</span>
              </Col>
            )}
          </Row>
        </Header>
        <Layout style={{ background: 'transparent' }}>
          {/*<Sider style={{background: "transparent"}} className={""}/>*/}
          <Content className={'w-full lg:m-auto max-w-screen-lg min-w-screen-lg'}>
            <Switch>
              <Route path="/test">
                <PositionHistory />
              </Route>
              <Route path="/">
                <Calculator />
              </Route>
            </Switch>
          </Content>
        </Layout>
        <Footer style={{ background: 'transparent' }}>
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
    </div>
  );
}

export default App;
