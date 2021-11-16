import React from 'react';
import './index.css';
import { Divider } from 'antd';
import AprDetails from './AprDetails';
import DetailsAtOpening from './DetailsAtOpening';
import DetailsAtClosing from './DetailsAtClosing';
import WithApy from './WithApy';
import { useRecoilValue } from 'recoil';
import { finalAprState, gainOrLossWithApyState, poolInfoState } from '../../Store';

const FarmOpenPositionDetail = () => {
  const poolInfo = useRecoilValue(poolInfoState);
  const finalApr = useRecoilValue(finalAprState);
  const gainOrLossWithApy = useRecoilValue(gainOrLossWithApyState);
  return (
    <div className={'FarmOpenPositionDetail'} key={poolInfo?.pool}>
      <DetailsAtOpening />
      <Divider />
      <DetailsAtClosing />
      <Divider />
      <AprDetails finalApr={finalApr} />
      <Divider />
      <WithApy gainOrLossWithApy={gainOrLossWithApy} />
    </div>
  );
};
export default FarmOpenPositionDetail;
