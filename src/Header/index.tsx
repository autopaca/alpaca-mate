import { Col, Row, Layout } from 'antd';
import React, { memo } from 'react';
import ConnectWallet from 'Src/ConnectWallet';
import useAlpacaPriceQuery from 'Src/utils/useAlpacaPriceQuery';

const { Header: LayoutHeader } = Layout;

const Header = () => {
  const {data} = useAlpacaPriceQuery()
  return (
    <LayoutHeader className={'!bg-transparent flex content-center justify-center lg:h-24 h-24'}>
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
        <Col>
          <ConnectWallet />
        </Col>
      </Row>
    </LayoutHeader>
  );
};

export default memo(Header);
