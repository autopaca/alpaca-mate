import { Card, Col, Row } from 'antd';
import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { connectState } from 'Src/Store/connect';

const WalletTest = () => {
  const info = useRecoilValue(connectState);

  return (
    <Card className='rounded-3xl'>
      <Row>
        <Col span={12}>Account:</Col>
        <Col span={12}>{info.account ?? '-'}</Col>
        <Col span={12}>Active:</Col>
        <Col span={12}>{info.active.toString()}</Col>
        <Col span={12}>ChainId:</Col>
        <Col span={12}>{info.chainId}</Col>
      </Row>
    </Card>
  );
};

export default memo(WalletTest);
