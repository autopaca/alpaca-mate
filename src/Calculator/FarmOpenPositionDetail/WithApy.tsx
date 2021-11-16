import React from 'react';
import DetailsTitle from './DetailsTitle';
import DetailsRow from './DetailsRow';
import GainOrLossRow from './GainOrLossRow';
import { formatValue } from '../utils';
import InfoTooltip from './InfoTooltip';
import { GainOrLossWithApy } from 'Calculator/type';

function WithApy(props: { gainOrLossWithApy?: GainOrLossWithApy }) {
  const { gainOrLossWithApy } = props;
  return (
    <>
      <DetailsTitle content={'With APY'} />
      <DetailsRow
        left={
          <span>
            <span>ALPACA Rewards</span>
            <InfoTooltip title="assumes no auto-compounding" />
          </span>
        }
        right={`$${formatValue(gainOrLossWithApy?.alpacaRewards)}`}
      />
      <DetailsRow
        left={'Borrowing Interest: '}
        right={<span style={{ color: 'red' }}> -${formatValue(gainOrLossWithApy?.interest)}</span>}
      />
      <DetailsRow
        left={
          <span>
            <span>Total Yield Farm Earnings</span>
            <InfoTooltip title="Continuous Auto-Compounding Yield Farm Earnings + Alpaca Rewards - Borrowing Interest" />
          </span>
        }
        right={`$${formatValue(gainOrLossWithApy?.yfGain)}`}
      />
      <GainOrLossRow title={'Total Profit/Loss'} gainOrLoss={gainOrLossWithApy} />
    </>
  );
}

export default WithApy;
