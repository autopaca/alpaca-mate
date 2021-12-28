import React, { useEffect, useState } from 'react';
import { CoinlistPriceList, getCoinlistIds, getCoinlistPrice, getPositionsByOwner } from 'Src/PositionHistory/api';
import { aggregator, jsonRPCProvider, posData, toEtherNumber } from 'Src/PositionHistory/utils';
import dayjs from 'dayjs';
import { Radio, Space } from 'antd';
import tokensJson from './tokens.json';
import { ethers } from 'ethers';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const timeFormat = 'YYYY-MM-DD HH:mm:ss';

enum ChartType {
  lpInfo,
  baseToken,
  farmingToken,
}

type EquityAndPriceData = {
  time: string;
  equity: number;
  price: number;
};
type LpPointData = {
  time: string;
  lpAmount: number;
};

function PositionHistory() {
  const [chartType, setChartType] = useState(ChartType.lpInfo);
  const [baseData, setBaseData] = useState<EquityAndPriceData[]>([]);
  const [farmingData, setFarmingData] = useState<EquityAndPriceData[]>([]);
  const [lpPointData, setLpPointData] = useState<LpPointData[]>([]);
  const [tokenInfos, setTokenInfos] = useState({
    baseTokenSymbol: '',
    farmingTokenSymbol: '',
    baseTokenPrices: [] as CoinlistPriceList,
    farmingTokenPrices: [] as CoinlistPriceList,
  });

  const tokenSymbol = async (tokenAddr: string): Promise<string> => {
    if (tokenAddr in Object.keys(tokensJson)) {
      // @ts-ignore
      return tokensJson[tokenAddr].symbol;
    }
    return (await aggregator.tokenInfos([tokenAddr], ethers.constants.AddressZero))[0].symbol;
  };
  const tokenClIds = async (symbols: string[]) => {
    const totalIds = await getCoinlistIds();
    const symbolSet = new Set(symbols);
    return totalIds.filter((id) => symbolSet.has(id.symbol)).map((id) => id.id);
  };

  const initTokenInfo = async (baseToken: string, farmingToken: string) => {
    const baseTokenSymbol = await tokenSymbol(baseToken);
    const farmingTokenSymbol = await tokenSymbol(farmingToken);
    const [baseTokenId, farmingTokenId] = await tokenClIds([baseTokenSymbol, farmingTokenSymbol]);
    setTokenInfos({
      baseTokenSymbol,
      farmingTokenSymbol,
      baseTokenPrices: (await getCoinlistPrice(baseTokenId, 5)).prices,
      farmingTokenPrices: (await getCoinlistPrice(farmingTokenId, 5)).prices,
    });
  };

  useEffect(() => {
    (async () => {
      const position = await getPositionsByOwner('0xC3e11C1E8f186d7D3B1345368EeCe82485beE43D');
      const firstPos = position.data.positions[0];
      const currentBlock = await jsonRPCProvider.getBlockNumber();
      // const startTime = jsonRpcProvider.getBlock(startBlock);
      // blocks per hour
      const interval = (60 * 60) / 3;
      const fiveDaysBlock = 5 * 24 * interval;
      // starts from 5 days ago
      let blockSoFar = currentBlock - fiveDaysBlock;
      let symbolInitialized = false;
      while (blockSoFar < currentBlock) {
        const dataPoint = await posData(firstPos, blockSoFar);
        if (!symbolInitialized) {
          const baseTokenSymbol = await tokenSymbol(dataPoint.baseToken);
          const farmingTokenSymbol = await tokenSymbol(dataPoint.farmingToken);
          setTokenInfos({ baseTokenSymbol, farmingTokenSymbol, baseTokenPrices: [], farmingTokenPrices: [] });
          symbolInitialized = true;
        }
        const time = dayjs.unix(dataPoint.timestamp).format(timeFormat);
        let baseTokenVSFarmingToken;
        let farmingTokenVSBaseToken;
        if (dataPoint.baseToken === dataPoint.token0) {
          baseTokenVSFarmingToken = dataPoint.price0vs1;
          farmingTokenVSBaseToken = dataPoint.price1vs0;
        } else {
          baseTokenVSFarmingToken = dataPoint.price1vs0;
          farmingTokenVSBaseToken = dataPoint.price0vs1;
        }
        const basePoint: EquityAndPriceData = {
          time,
          equity: toEtherNumber(dataPoint.equity),
          price: baseTokenVSFarmingToken,
        };
        const farmingPoint: EquityAndPriceData = {
          time,
          equity: dataPoint.equityInFarmingToken,
          price: farmingTokenVSBaseToken,
        };
        const lpPoint: LpPointData = {
          time,
          lpAmount: toEtherNumber(dataPoint.positionLpBalance),
        };
        // const price0vs1Point = { time, data: dataPoint.price0vs1, name: 'price0vs1' };
        // const price1vs0Point = { time, data: dataPoint.price1vs0, name: 'price1vs0' };
        setBaseData((prev) => [...prev, basePoint]);
        setFarmingData((prev) => [...prev, farmingPoint]);
        setLpPointData((prev) => [...prev, lpPoint]);
        blockSoFar += interval;
      }
      await posData(firstPos);
    })();
  }, []);
  const options = () => {
    let scales;
    if (chartType === ChartType.lpInfo) {
      scales = {
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
        },
      };
    } else {
      scales = {
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
        },
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          grid: {
            drawOnChartArea: false,
          },
        },
      };
    }
    return {
      responsive: true,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Alpaca LYF Position History Chart',
        },
      },
      scales,
    };
  };
  const data = () => {
    let dataPoints;
    let equityLabel;
    let priceLabel;
    if (chartType === ChartType.lpInfo) {
      dataPoints = lpPointData;
      return {
        labels: dataPoints.map((point) => point.time),
        datasets: [
          {
            label: 'lp amount',
            data: dataPoints.map((point) => point.lpAmount),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
          },
        ],
      };
    } else if (chartType === ChartType.baseToken) {
      dataPoints = baseData;
      equityLabel = `equity in ${tokenInfos.baseTokenSymbol}`;
      priceLabel = `${tokenInfos.baseTokenSymbol}/${tokenInfos.farmingTokenSymbol} price`;
    } else {
      dataPoints = farmingData;
      equityLabel = `equity in ${tokenInfos.farmingTokenSymbol}`;
      priceLabel = `${tokenInfos.farmingTokenSymbol}/${tokenInfos.baseTokenSymbol} price`;
    }
    return {
      labels: dataPoints.map((point) => point.time),
      datasets: [
        {
          label: equityLabel,
          data: dataPoints.map((point) => point.equity),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y',
        },
        {
          label: priceLabel,
          data: dataPoints.map((point) => point.price),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          yAxisID: 'y1',
        },
      ],
    };
  };
  return (
    <div>
      <Radio.Group onChange={(e) => setChartType(e.target.value)} defaultValue={ChartType.lpInfo}>
        <Space>
          <Radio.Button value={ChartType.lpInfo}>Lp Info</Radio.Button>
          <Radio.Button value={ChartType.baseToken}>Equity in {tokenInfos.baseTokenSymbol}</Radio.Button>
          <Radio.Button value={ChartType.farmingToken}>Equity in {tokenInfos.farmingTokenSymbol}</Radio.Button>
        </Space>
      </Radio.Group>
      <Line options={options()} data={data()} />
      {/*{inToken === InToken.baseToken ? (*/}
      {/*  <>*/}
      {/*    <DualAxes {...config} data={[baseData, baseData]} />*/}
      {/*    <LineChart {...simpleConfig} data={baseData} />*/}
      {/*  </>*/}
      {/*) : (*/}
      {/*  <DualAxes {...config} data={[farmingData, farmingData]} />*/}
      {/*)}*/}
    </div>
  );
}

export default PositionHistory;
