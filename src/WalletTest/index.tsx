import { Card, Col, Row } from 'antd';
import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { connectState } from 'Src/Store/connect';

const WalletTest = () => {
  const info = useRecoilValue(connectState);

  return (
    <Card className='font-bold rounded-3xl min-h-[840px] text-2xl'>
      <Row>
        <Col span={8}>Account:</Col>
        <Col span={16}>{info.account ?? '-'}</Col>
        <Col span={8}>Active:</Col>
        <Col span={16}>{info.active.toString()}</Col>
        <Col span={8}>ChainId:</Col>
        <Col span={16}>{info.chainId}</Col>
      </Row>
    </Card>
  );
};

export default memo(WalletTest);
