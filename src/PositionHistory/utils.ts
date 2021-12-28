import { AlpacaPosition, DEX, LPDetail, PositionHistoryData, WorkerInfo } from 'Src/PositionHistory/interfaces';
import { BigNumber, ethers } from 'ethers';
import { AlpacaAggregator } from 'Src/typechain/AlpacaAggregator';
import { AggregatorAddr } from 'Src/PositionHistory/constants';
import { abi as AggregatorABI } from 'Src/abis/AlpacaAggregator.json';
import { formatEther } from 'ethers/lib/utils';

export const archiveProvider = new ethers.providers.StaticJsonRpcProvider(
  'https://speedy-nodes-nyc.moralis.io/ad16482919450306606c819e/bsc/mainnet/archive',
  56,
);
export const jsonRPCProvider = new ethers.providers.StaticJsonRpcProvider(
  'https://cold-muddy-wave.bsc.quiknode.pro/a6f6f8e08aed8f3de6e2c38db8d50cc0a4a500ba/',
  56,
);

export const aggregator = new ethers.Contract(AggregatorAddr, AggregatorABI, archiveProvider) as AlpacaAggregator;

export const posData = async (position: AlpacaPosition, blockTag?: number) => {
  const { health, posDebtBalance, positionR1, positionR0, token0, token1, baseToken, farmingToken, positionLpBalance } =
    await getPositionHistoryData(position, blockTag);
  const equity = health.sub(posDebtBalance);
  const factor = 1000000;
  const price0vs1 = positionR1.mul(factor).div(positionR0).toNumber() / factor;
  const price1vs0 = positionR0.mul(factor).div(positionR1).toNumber() / factor;
  let equityInFarmingToken;
  if (baseToken === token0) {
    equityInFarmingToken = Number(formatEther(equity)) * price0vs1;
  } else {
    equityInFarmingToken = Number(formatEther(equity)) * price1vs0;
  }
  let blockT = blockTag;
  if (!blockT) {
    blockT = await jsonRPCProvider.getBlockNumber();
  }
  const timestamp = (await jsonRPCProvider.getBlock(blockT)).timestamp;
  return {
    positionLpBalance,
    blockTag,
    timestamp,
    posDebtBalance,
    health,
    equity,
    equityInFarmingToken,
    price0vs1,
    price1vs0,
    token0,
    token1,
    baseToken,
    farmingToken,
  };
};

export const getPositionHistoryData = async (
  position: AlpacaPosition,
  blockTag?: number,
): Promise<PositionHistoryData> => {
  const allInOne = await aggregator.allInOne(position.vault, position.worker, [position.positionId], { blockTag });
  const {
    workerTotalShare,
    workerTotalBalance,
    workerBaseToken,
    workerFarmingToken,
    lpDex,
    lpFactory,
    lpFee,
    lpFeeDenom,
    vaultDebtVal,
    vaultDebtShare,
    workerLpToken,
  } = allInOne.vaultAndWorkerInfo;
  const { totalSupply: lpTotalSupply, r0, r1, token0, token1, pairFee } = allInOne.lpDetail;
  // const price0vs1 = this.price0vs1(r0, r1);
  // const price1vs0 = this.price0vs1(r1, r0);
  const historicalPosition = allInOne.positions[0];
  const positionLpBalance = historicalPosition.lpShare.mul(workerTotalBalance).div(workerTotalShare);
  const [positionR0, positionR1] = [
    r0.mul(positionLpBalance).div(lpTotalSupply),
    r1.mul(positionLpBalance).div(lpTotalSupply),
  ];
  const posDebtBalance = historicalPosition.debtShare.mul(vaultDebtVal).div(vaultDebtShare);
  const workerInfo: WorkerInfo = {
    lpToken: workerLpToken,
    baseToken: workerBaseToken,
    farmingToken: workerFarmingToken,
    workerLpShare: workerTotalShare, // need update regularly
    workerLpBalance: workerTotalBalance, // need update regularly
    dex: lpDex,
    feeDenom: lpFeeDenom,
    fee: lpFee, // for mdex, fee will be 0, it is calculated later
    factory: lpFactory,
  };
  const lpDetail: LPDetail = {
    dex: lpDex,
    totalSupply: lpTotalSupply,
    r0,
    r1,
    token0,
    token1,
    pairFee,
  };
  const _health = health(historicalPosition.lpShare, workerInfo, lpDetail);
  return {
    positionLpBalance,
    positionR0,
    positionR1,
    posDebtBalance,
    health: _health,
    baseToken: workerBaseToken,
    farmingToken: workerFarmingToken,
    token0,
    token1,
  };
};

export const getMktSellAmount = (
  aIn: BigNumber,
  rIn: BigNumber,
  rOut: BigNumber,
  fee: BigNumber,
  feeDenom: BigNumber,
): BigNumber => {
  if (aIn.eq(0)) {
    return BigNumber.from(0);
  }
  if (rIn.eq(0) || rOut.eq(0)) {
    return BigNumber.from(0);
  }
  const aInWithFee = aIn.mul(fee);
  const numerator = aInWithFee.mul(rOut);
  const denominator = rIn.mul(feeDenom).add(aInWithFee);
  return numerator.div(denominator);
};

const shareToBalance = (share: BigNumber, totalShare: BigNumber, totalBalance: BigNumber) => {
  if (totalShare.eq(0)) {
    return share;
  }
  return share.mul(totalBalance).div(totalShare);
};

export const health = (positionLpShare: BigNumber, workerInfo: WorkerInfo, lpDetail: LPDetail) => {
  const lpBalance = shareToBalance(positionLpShare, workerInfo.workerLpShare, workerInfo.workerLpBalance);
  const { totalSupply: lpSupply, r0, r1 } = lpDetail;
  const [totalBaseToken, totalFarmingToken] = lpDetail.token0 === workerInfo.baseToken ? [r0, r1] : [r1, r0];
  const userBaseToken = lpBalance.mul(totalBaseToken).div(lpSupply);
  const userFarmingToken = lpBalance.mul(totalFarmingToken).div(lpSupply);
  let fee: BigNumber;
  if (workerInfo.dex === DEX.MDEX) {
    fee = workerInfo.feeDenom.sub(lpDetail.pairFee ?? '0');
  } else {
    fee = workerInfo.fee!;
  }
  const { feeDenom } = workerInfo;
  return getMktSellAmount(
    userFarmingToken,
    totalFarmingToken.sub(userFarmingToken),
    totalBaseToken.sub(userBaseToken),
    fee,
    feeDenom,
  ).add(userBaseToken);
};

export const debtShareToValue = (debtShare: BigNumber, vaultDebtShare: BigNumber, vaultDebtVal: BigNumber) => {
  if (vaultDebtShare.eq(0)) {
    return debtShare;
  }
  return debtShare.mul(vaultDebtVal).div(vaultDebtShare);
};

export const toEtherNumber = (bn: BigNumber) => {
  return Number(formatEther(bn));
};
