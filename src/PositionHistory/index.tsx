import React from 'react';
import { OpType, useGetPositionsByOwnerQuery } from '../generated/graphql';
import { CHART_COLORS, formatTimestamp, gqlClient, shareToBalance, transparentize } from './utils';
import { Line } from 'react-chartjs-2';
import { BigNumber, BigNumberish, ethers } from 'ethers';

const { utils } = ethers;

function PositionHistory() {
  const variables = {
    owner: '0xf0256b9115c6d96e063962f9b0e9cf7d1285223e',
  };
  const { status, data, error, isFetching } = useGetPositionsByOwnerQuery(gqlClient, variables, {
    staleTime: Infinity,
  });
  console.log('id: ', data?.positionEntities[0].id);
  let reinvests = data?.positionEntities[0]?.worker ? data.positionEntities[0].worker.reinvests : [];
  reinvests.sort((first, second) => first.timestamp - second.timestamp);
  let shareOps = data?.positionEntities[0]?.shareOperations ? data.positionEntities[0].shareOperations! : [];
  let shareOpsTs = shareOps.map((s) => formatTimestamp(s.timestamp));
  console.log(shareOpsTs);
  shareOps.sort((first, second) => {
    if (first.timestamp === second.timestamp) {
      if (first.opType === OpType.Remove) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return first.timestamp - second.timestamp;
    }
  });
  const positionShares = () => {
    let res: { timestamp: number; share: BigNumber }[] = [];
    let i = 0;
    let len = shareOps.length;
    while (i < len) {
      if (i < len - 1) {
        if (shareOps[i].timestamp === shareOps[i + 1].timestamp) {
          res.push({
            timestamp: shareOps[i].timestamp,
            share: BigNumber.from(shareOps[i].share).add(BigNumber.from(shareOps[i + 1].share)),
          });
          i += 2;
        }
      } else {
        res.push({
          timestamp: shareOps[i].timestamp,
          share: BigNumber.from(shareOps[i].share),
        });
        i++;
      }
    }
    return res;
  };
  console.log({ shareOps });
  console.log({ 'positionShares: ': positionShares() });
  const posShares = positionShares();
  // for (let i = 0; i < reinvests.length; i++) {
  //   const reinvest = reinvests[i];
  //   const shareOp = posShares[j];
  //   if (shareOp.timestamp <= reinvest.timestamp) {
  //   }
  // }
  const marks = posShares.map((pos) => {
    // TODO: should use binary search
    for (let i = 1; i < reinvests.length; i++) {
      if (reinvests[i].timestamp > pos.timestamp) {
        return i;
      }
    }
    return 0;
  });
  let positionValues = [];
  let j = 0;
  for (let i = 0; i < reinvests.length; i++) {
    const curRe = reinvests[i];
    const curMark = marks[j];
    if (i < curMark && j === 0) {
      continue;
    }
    if (i === curMark) {
      j++;
    }
    positionValues.push({
      posShare: posShares[j - 1],
      reinvest: curRe,
    });
  }
  console.log({ positionValues });
  positionValues.map((pos) => {
    shareToBalance(
      pos.posShare.share,
      BigNumber.from(pos.reinvest.totalShare),
      BigNumber.from(pos.reinvest.totalBalance),
    );
  });
  const positionData = {
    labels: positionValues.map((s) => formatTimestamp(s.reinvest.timestamp)),
    datasets: [
      {
        label: 'position',
        data: positionValues.map((pos) => {
          const res = shareToBalance(
            pos.posShare.share,
            BigNumber.from(pos.reinvest.totalShare),
            BigNumber.from(pos.reinvest.totalBalance),
          );
          return Number(utils.formatEther(res));
        }),
        fill: false,
        borderColor: CHART_COLORS.green,
        backgroundColor: transparentize(CHART_COLORS.green, 0.5),
      },
    ],
  };
  const chartData = {
    // labels: ['1', '2', '3', '4', '5', '6'],
    // labels: reinvests.map((r) => formatTimestamp(r.timestamp)),
    labels: posShares.map((s) => formatTimestamp(s.timestamp)),
    datasets: [
      {
        label: 'positionShares',
        data: posShares.map((s) => Number(utils.formatEther(s.share))),
        fill: false,
        borderColor: CHART_COLORS.yellow,
        backgroundColor: transparentize(CHART_COLORS.yellow, 0.5),
      },
    ],
  };
  const reinvestData = {
    // labels: ['1', '2', '3', '4', '5', '6'],
    labels: reinvests.map((r) => formatTimestamp(r.timestamp)),
    datasets: [
      {
        label: 'Reinvests',
        data: reinvests.map((r) => Number(utils.formatEther(r.totalBalance))),
        fill: false,
        borderColor: CHART_COLORS.red,
        backgroundColor: transparentize(CHART_COLORS.red, 0.5),
      },
    ],
  };
  // console.log({ data });
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div>
      <Line data={positionData} options={{ ...options }} />
      <Line data={chartData} options={{ ...options }} />
      <Line data={reinvestData} options={{ ...options }} />
    </div>
  );
}

export default PositionHistory;
