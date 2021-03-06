import React from 'react';
import DetailsTitle from './DetailsTitle';
import DetailsRow from './DetailsRow';
import VariousValueRow from './VariousValueRow';
import { useRecoilValue } from 'recoil';
import {
  assetsState,
  assetsValueState,
  borrowedState,
  farmInputState,
  relativeInfoAtOpenState,
  positionAtOpenState,
} from '../../Store';
import RelativePriceRow from './RelativePriceRow';
import { renderAssets } from '../utils';

function DetailsAtOpening() {
  const farmInput = useRecoilValue(farmInputState);
  const assets = useRecoilValue(assetsState);
  const borrowed = useRecoilValue(borrowedState);
  const totalFarmAtOpen = useRecoilValue(positionAtOpenState);
  const assetsValues = useRecoilValue(assetsValueState);
  const relativeAtOpen = useRecoilValue(relativeInfoAtOpenState)!;
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

export default DetailsAtOpening;
