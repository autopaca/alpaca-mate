import React from 'react';
import { useRecoilValue } from 'recoil';
import VariousValueRow from 'Src/Calculator/FarmOpenPositionDetail/VariousValueRow';
import {
  cakeMaxiAssetsState,
  cakeMaxiBorrowedAtCloseState,
  cakeMaxiBorrowedState,
  cakeMaxiGainOrLossState,
  cakeMaxiPoolState,
  cakeMaxiPositionAfterCloseState,
  cakeMaxiPositionAtCloseState,
  cakeMaxiRelativeInfoAtCloseState,
} from 'Src/Store';
import { ratioToPercent, renderAssets, renderSingleAsset } from 'Calculator/utils';
import DetailsRow from 'Calculator/FarmOpenPositionDetail/DetailsRow';
import RelativePriceRow from 'Calculator/FarmOpenPositionDetail/RelativePriceRow';
import DetailsTitle from 'Calculator/FarmOpenPositionDetail/DetailsTitle';
import InfoTooltip from 'Calculator/FarmOpenPositionDetail/InfoTooltip';
import ReturnValueRow from 'Calculator/FarmOpenPositionDetail/ReturnValueRow';
import GainOrLossRow from 'Src/Calculator/FarmOpenPositionDetail/GainOrLossRow';

function CakeMaxiDetailsAtClosing() {
  const assets = useRecoilValue(cakeMaxiAssetsState);
  const borrowed = useRecoilValue(cakeMaxiBorrowedState);
  const borrowedAtClose = useRecoilValue(cakeMaxiBorrowedAtCloseState);
  console.log({ borrowedAtClose });
  const poolInfo = useRecoilValue(cakeMaxiPoolState);
  const relativeAtClose = useRecoilValue(cakeMaxiRelativeInfoAtCloseState)!;
  const positionAtClose = useRecoilValue(cakeMaxiPositionAtCloseState);
  const positionAfterClose = useRecoilValue(cakeMaxiPositionAfterCloseState);
  const gainOrLoss = useRecoilValue(cakeMaxiGainOrLossState);
  return (
    <>
      <DetailsTitle
        content={
          <span>
            At Closing
            <InfoTooltip title="Without considering Yield Farm APY" />
          </span>
        }
      />
      <RelativePriceRow title={'Relative Price'} relativeInfo={relativeAtClose} />
      <DetailsRow
        left={
          <>
            <span className="block lg:inline-block mr-1">Total Assets in</span>
            <span className="block lg:inline-block">Position Value</span>
          </>
        }
        right={renderSingleAsset(assets![1], positionAtClose?.positionDetails[1])}
      />
      <VariousValueRow title={'Position Value'} assetsValues={positionAtClose?.positionValues} assets={assets} />
      <VariousValueRow
        title={
          <>
            <span className="block lg:inline-block mr-1">Asset Borrowed</span>
            <span className="block lg:inline-block text-xs lg:text-lg">(Debt Value)</span>
          </>
        }
        assetsValues={borrowedAtClose?.borrowedValues}
        assets={assets}
      />
      <DetailsRow left={'Debt Ratio'} right={ratioToPercent(borrowedAtClose?.debtRatio)} />
      <DetailsRow left={'Liquidation Threshold'} right={ratioToPercent(poolInfo?.liquidationThreshold)} />
      <DetailsRow
        left={'Safety Buffer'}
        right={ratioToPercent(poolInfo && borrowedAtClose && poolInfo.liquidationThreshold - borrowedAtClose.debtRatio)}
      />
      <ReturnValueRow assets={assets} borrowed={borrowed} positionAfterClose={positionAfterClose} baseAssetIndex={0} />
      <VariousValueRow title={'Equity Value'} assetsValues={positionAfterClose?.positionValues} assets={assets} />
      <GainOrLossRow title={'Profit/Loss'} gainOrLoss={gainOrLoss} />
    </>
  );
}

export default CakeMaxiDetailsAtClosing;
