import { GraphQLClient } from 'graphql-request';
import colorLib from '@kurkle/color';
import dayjs from 'dayjs';
import { BigNumber, BigNumberish } from 'ethers';

const graphqlEndpoint = 'http://127.0.0.1:8000/subgraphs/name/alpaca-info';

export const gqlClient = new GraphQLClient(graphqlEndpoint);

const COLORS = ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236', '#166a8f', '#00a950', '#58595b', '#8549ba'];

export function color(index: number) {
  return COLORS[index % COLORS.length];
}

export function transparentize(value: string, opacity: number) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

export function formatTimestamp(timestamp: number) {
  return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

export function shareToBalance(share: BigNumber, totalShare: BigNumber, totalBalance: BigNumber) {
  return share.mul(totalBalance).div(totalShare);
}
