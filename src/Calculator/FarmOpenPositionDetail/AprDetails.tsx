import React from 'react';
import DetailsRow from './DetailsRow';
import InputAprComponent from './InputAprComponent';
import { Col, InputNumber, Row, Tooltip } from 'antd';
import AprComponent from './AprComponent';
import { useRecoilState, useRecoilValue } from 'recoil';
import { baseAprState, extendedAprState, finalAprState } from '../../Store';
import InfoTooltip from './InfoTooltip';
import { FinalApr } from 'Calculator/type';

function AprDetails(props: { finalApr?: FinalApr }) {
  const [baseApr, setBaseApr] = useRecoilState(baseAprState);
  const [extendedApr, setExtendedApr] = useRecoilState(extendedAprState);
  const { finalApr } = props;
  return (
    <>
      <DetailsRow
        left={'Yield Farm APR'}
        right={
          <InputAprComponent
            baseValue={baseApr.yieldFarmApr}
            onChange={(yieldFarmApr) => setBaseApr((old) => ({ ...old, yieldFarmApr }))}
            leveragedValue={finalApr!.leveragedYFApr}
          />
        }
      />
      <DetailsRow
        left={
          <>
            <span className="mr-1">Trading Fees APR</span>
            <span className="text-xs lg:text-xl">(7-day avg.)</span>
          </>
        }
        right={
          <InputAprComponent
            baseValue={baseApr.tradingFeeApr}
            onChange={(tradingFeeApr) => setBaseApr((old) => ({ ...old, tradingFeeApr }))}
            leveragedValue={finalApr!.leveragedTFApr}
          />
        }
      />
      <DetailsRow
        left={'ALPACA Rewards APR'}
        right={
          <>
            <img
              className={'c-rewardsApr__value__icon'}
              src="https://alpaca-app-asset.s3-ap-southeast-1.amazonaws.com/logo512.png"
              alt="alpaca-icon"
            />
            <InputNumber<number>
              className={'w-20 c-input'}
              value={extendedApr.alpacaApr}
              defaultValue={0}
              min={0}
              max={10000}
              formatter={(value) => `${value}%`}
              parser={(value) => parseFloat(value!.replace('%', ''))}
              onChange={(alpacaApr) => setExtendedApr((old) => ({ ...old, alpacaApr }))}
            />
          </>
        }
      />
      <DetailsRow
        left={'Borrowing Interest APR'}
        right={
          <InputNumber<number>
            className={'w-20 c-input'}
            value={extendedApr.interestApr}
            defaultValue={0}
            min={0}
            max={10000}
            formatter={(value) => `-${value}%`}
            parser={(value) => parseFloat(value!.replace('%', '').replace('-', ''))}
            onChange={(interestApr) => setExtendedApr((old) => ({ ...old, interestApr }))}
            style={{ color: 'red' }}
          />
        }
      />
      <DetailsRow
        left={'Total APR'}
        right={<AprComponent baseValue={finalApr!.totalApr} leveragedValue={finalApr!.leveragedTotalApr} />}
      />
      <Row wrap={false} className={'c-totalAprDescription -mt-6'}>
        <Col span={24} className={'text-left'}>
          <span className="block lg:inline-block">(Yield Farm + Trading Fees</span>
          <span> </span>
          <span className="block lg:inline-block">+ ALPACA Rewards – Borrowing Interest)</span>
        </Col>
      </Row>
      <DetailsRow
        left={
          <span>
            <span>Total APY</span>
            <InfoTooltip title="After subtracting Borrowing Interest, Yield Farm and Trading Fee rewards are autocompounded into LP tokens. ALPACA rewards assume daily compounding" />
          </span>
        }
        right={<AprComponent baseValue={finalApr!.totalApy} leveragedValue={finalApr!.leveragedTotalApy} />}
      />
    </>
  );
}

export default AprDetails;
