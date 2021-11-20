import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { assetsState, farmInputState, poolInfoState, poolState } from '../../Store';
import AmountAndPriceInput from './AmountAndPriceInput';
import AssetToBorrow from './AssetToBorrow';
import FarmLeverage from './FarmLeverage';
import './index.css';
import FarmEstimation from './FarmEstimation';
import poolMetas, { possibleBorrowAssets } from '../../poolMetas';
import CalculatorChart from 'Calculator/CalculatorChart';

const FarmOpenPositionInput = () => {
  const assets = useRecoilValue(assetsState);
  const setPool = useSetRecoilState(poolState);
  const poolInfo = useRecoilValue(poolInfoState);
  const [farmInput, setFarmInput] = useRecoilState(farmInputState);
  const canBeBorrowed = () => {
    const ary: string[] = [];
    assets!.forEach((a) => {
      if (possibleBorrowAssets().has(a)) {
        ary.push(a);
      }
    });
    return ary;
  };
  const chosenValue = () => {
    return canBeBorrowed().length === 1 ? 0 : 1;
  };
  const setBorrowed = (b: number) => {
    if (b != chosenValue()) {
      const newPoolName = `${assets![1]}-${assets![0]}`;
      const newPoolIndex = poolMetas.findIndex((p) => p.pool === newPoolName);
      newPoolIndex >= 0 && setPool({ poolIndex: newPoolIndex, poolMeta: poolMetas[newPoolIndex] });
    }
  };
  return (
    <Row className={'mt-2 text-sm lg:text-xl lg:mx-7'}>
      <Col span={24}>
        <div className={'FarmOpenPositionInput'}>
          <Row className={'lg:block'}>
            <Col span={24}>
              <Card className={'c-card'}>
                <AmountAndPriceInput assets={assets!} farmInput={farmInput} setFarmInput={setFarmInput} />
                <FarmLeverage
                  leverage={farmInput!.leverage}
                  setLeverage={(l) => setFarmInput((old) => ({ ...old!, leverage: l }))}
                  maxLeverage={poolInfo?.leverage ?? 1}
                />
                <AssetToBorrow assets={canBeBorrowed()!} selectedValue={chosenValue()} setBorrowed={setBorrowed} />
                <Divider />
                <CalculatorChart />
                <Divider />
                <FarmEstimation assets={assets} />
              </Card>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};
export default FarmOpenPositionInput;
