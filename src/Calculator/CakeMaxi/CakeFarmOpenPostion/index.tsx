import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  assetsState,
  cakeMaxiAssetsState,
  cakeMaxiFarmInputState,
  cakeMaxiPoolState,
  farmInputState,
  poolInfoState,
  poolState,
} from 'Src/Store';
import AmountAndPriceInput from 'Calculator/FarmOpenPositionInput/AmountAndPriceInput';
import AssetToBorrow from 'Calculator/FarmOpenPositionInput/AssetToBorrow';
import FarmLeverage from 'Calculator/FarmOpenPositionInput/FarmLeverage';
import 'Calculator/FarmOpenPositionInput/index.css';
import FarmEstimation from 'Calculator/FarmOpenPositionInput/FarmEstimation';

const CakeFarmOpenPositionInput = () => {
  const [cakeMaxiPool, setCakeMaxiPool] = useRecoilState(cakeMaxiPoolState);
  const assets = useRecoilValue(cakeMaxiAssetsState);
  const [cakeMaxiFarmInput, setCakeMaxiFarmInput] = useRecoilState(cakeMaxiFarmInputState);
  return (
    <Row className={'mt-2 text-sm lg:text-xl lg:mx-7'}>
      <Col span={24}>
        <div className={'FarmOpenPositionInput'}>
          <Row className={'lg:block'}>
            <Col span={24}>
              <Card className={'c-card'}>
                <AmountAndPriceInput
                  assets={assets!}
                  farmInput={cakeMaxiFarmInput}
                  setFarmInput={setCakeMaxiFarmInput}
                />
                <FarmLeverage
                  leverage={cakeMaxiFarmInput!.leverage}
                  setLeverage={(l) => setCakeMaxiFarmInput((old) => ({ ...old!, leverage: l }))}
                  maxLeverage={cakeMaxiPool!.leverage}
                />
                <AssetToBorrow
                  assets={cakeMaxiPool!.borrowableAssets}
                  selectedValue={cakeMaxiPool!.borrowIndex}
                  setBorrowed={(chosen) => setCakeMaxiPool((prev) => ({ ...prev!, borrowIndex: chosen }))}
                />
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
export default CakeFarmOpenPositionInput;
