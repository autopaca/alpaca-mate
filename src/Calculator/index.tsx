import React from 'react';
import { Card, Col, Empty, Row, Spin } from 'antd';
import ChooseFarmPosition from './ChooseFarmPosition';
import FarmOpenPositionInput from './FarmOpenPositionInput';
import FarmOpenPositionDetail from './FarmOpenPositionDetail';
import './index.css';
import { useRecoilValue } from 'recoil';
import { assetsState, poolTypeState } from '../Store';
// @ts-ignore
import { PoolType } from './type.d.ts';
import CakeFarmOpenPositionInput from 'Calculator/CakeMaxi/CakeFarmOpenPostion';
import CakeFarmOpenPositionDetail from 'Calculator/CakeMaxi/CakeFarmOpenPositionDetail';

function Calculator() {
  const assets = useRecoilValue(assetsState);
  const poolType = useRecoilValue(poolTypeState);
  return (
    <div className={'Calculator'}>
      <Spin spinning={false}>
        <Card className={'rounded-3xl'} bodyStyle={{ minHeight: '840px' }}>
          <ChooseFarmPosition />
          {poolType === PoolType.Single ? (
            <>
              <Row className={'mt-6 lg:mt-8 text-sm lg:text-xl lg:mx-7'}>
                <Col span={24}>
                  <CakeFarmOpenPositionInput />
                </Col>
              </Row>
              <Row className={'mt-3 lg:mt-9 text-sm lg:text-xl lg:mx-7'}>
                <Col span={24}>
                  <CakeFarmOpenPositionDetail />
                </Col>
              </Row>
            </>
          ) : assets ? (
            <>
              <Row className={'mt-6 lg:mt-8 text-sm lg:text-xl lg:mx-7'}>
                <Col span={24}>
                  <FarmOpenPositionInput />
                </Col>
              </Row>
              <Row className={'mt-3 lg:mt-9 text-sm lg:text-xl lg:mx-7'}>
                <Col span={24}>
                  <FarmOpenPositionDetail />
                </Col>
              </Row>
            </>
          ) : (
            <Empty className={'mt-36'} description={'Please choose a pool to farm'} />
          )}
        </Card>
      </Spin>
    </div>
  );
}

export default Calculator;
