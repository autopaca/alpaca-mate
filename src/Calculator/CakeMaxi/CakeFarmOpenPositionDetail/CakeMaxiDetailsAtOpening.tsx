import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  cakeMaxiAssetsState,
  cakeMaxiAssetsValueState,
  cakeMaxiBorrowedState,
  cakeMaxiFarmInputState,
  cakeMaxiPositionAtOpenState,
  cakeMaxiRelativeInfoAtOpenState,
} from 'Src/Store';
import { renderAssets } from 'Calculator/utils';
import DetailsTitle from 'Src/Calculator/FarmOpenPositionDetail/DetailsTitle';
import DetailsRow from 'Calculator/FarmOpenPositionDetail/DetailsRow';
import VariousValueRow from 'Calculator/FarmOpenPositionDetail/VariousValueRow';
import RelativePriceRow from 'Calculator/FarmOpenPositionDetail/RelativePriceRow';

function CakeMaxiDetailsAtOpening() {
  const farmInput = useRecoilValue(cakeMaxiFarmInputState);
  const assets = useRecoilValue(cakeMaxiAssetsState);
  const assetsValues = useRecoilValue(cakeMaxiAssetsValueState);
  const borrowed = useRecoilValue(cakeMaxiBorrowedState);
  const relativeAtOpen = useRecoilValue(cakeMaxiRelativeInfoAtOpenState)!;
  const totalFarmAtOpen = useRecoilValue(cakeMaxiPositionAtOpenState);
  return (
    <>
      <DetailsTitle content={'At Opening'} />
      <DetailsRow
        left={
          <>
            <span className="block lg:inline-block mr-1">Assets Supplied</span>
            <span className="block lg:inline-block text-xs lg:text-lg">(Equity Value before fees)</span>{' '}
          </>
        }
        right={renderAssets(assets!, farmInput?.assetDetails)}
      />
      <VariousValueRow title={'Assets Value'} assetsValues={assetsValues} assets={assets} />
      <VariousValueRow
        title={
          <>
            <span className="block lg:inline-block mr-1">Asset Borrowed</span>
            <span className="block lg:inline-block text-xs lg:text-lg">(Debt Value)</span>
          </>
        }
        assetsValues={borrowed?.borrowedValues}
        assets={assets}
      />
      <DetailsRow left={'Debt Ratio'} right={borrowed ? `${(borrowed.debtRatio * 100).toFixed(2)}%` : '0.00%'} />
      <RelativePriceRow title={'Relative Price'} relativeInfo={relativeAtOpen} />
      <DetailsRow
        left={
          <>
            <span className="block lg:inline-block mr-1">Total Assets in</span>
            <span className="block lg:inline-block">Position Value</span>
          </>
        }
        right={renderAssets(assets!, totalFarmAtOpen?.positionDetails)}
      />
      <VariousValueRow title={'Position Value'} assetsValues={totalFarmAtOpen?.positionValues} assets={assets} />
    </>
  );
}

export default CakeMaxiDetailsAtOpening;
