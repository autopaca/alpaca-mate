import React from 'react';
import 'Calculator/FarmOpenPositionDetail/index.css';
import { useRecoilValue } from 'recoil';
import { cakeMaxiFinalAprState, cakeMaxiGainOrLossWithApyState, cakeMaxiPoolState } from 'Src/Store';
import CakeMaxiDetailsAtOpening from 'Calculator/CakeMaxi/CakeFarmOpenPositionDetail/CakeMaxiDetailsAtOpening';
import { Divider } from 'antd';
import CakeMaxiDetailsAtClosing from 'Calculator/CakeMaxi/CakeFarmOpenPositionDetail/CakeMaxiDetailsAtClosing';
import AprDetails from 'Calculator/FarmOpenPositionDetail/AprDetails';
import WithApy from 'Calculator/FarmOpenPositionDetail/WithApy';

const CakeFarmOpenPositionDetail = () => {
  const poolInfo = useRecoilValue(cakeMaxiPoolState);
  const finalApr = useRecoilValue(cakeMaxiFinalAprState);
  const gainOrLossWithApy = useRecoilValue(cakeMaxiGainOrLossWithApyState);
  return (
    <div className={'FarmOpenPositionDetail'} key={`cake-maxi-FOPD-${poolInfo!.borrowIndex}`}>
      <CakeMaxiDetailsAtOpening />
      <Divider />
      <CakeMaxiDetailsAtClosing />
      <Divider />
      <AprDetails finalApr={finalApr} />
      <Divider />
      <WithApy gainOrLossWithApy={gainOrLossWithApy} />
    </div>
  );
};
export default CakeFarmOpenPositionDetail;
