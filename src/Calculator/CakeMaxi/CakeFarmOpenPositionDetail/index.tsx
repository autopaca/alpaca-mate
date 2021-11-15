import React from 'react';
import 'Calculator/FarmOpenPositionDetail/index.css';
import { useRecoilValue } from 'recoil';
import { cakeMaxiPoolState } from 'Src/Store';
import CakeMaxiDetailsAtOpening from 'Calculator/CakeMaxi/CakeFarmOpenPositionDetail/CakeMaxiDetailsAtOpening';

const CakeFarmOpenPositionDetail = () => {
  const poolInfo = useRecoilValue(cakeMaxiPoolState);
  return (
    <div className={'FarmOpenPositionDetail'} key={`cake-maxi-FOPD-${poolInfo!.borrowIndex}`}>
      <CakeMaxiDetailsAtOpening />
      {/*<Divider />*/}
      {/*<DetailsAtClosing />*/}
      {/*<Divider />*/}
      {/*<AprDetails />*/}
      {/*<Divider />*/}
      {/*<WithApy />*/}
    </div>
  );
};
export default CakeFarmOpenPositionDetail;
