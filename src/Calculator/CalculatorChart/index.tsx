import React, { useEffect, useState } from 'react';
import { farmInputState, poolInfoState, relativeInfoAtOpenState } from 'Src/Store';
import { useRecoilValue } from 'recoil';
import { equityValuePercent, liquidationPriceChange } from 'Calculator/utils';
import { Datum, Line, LineConfig } from '@ant-design/charts';
import InputTitle from 'Calculator/FarmOpenPositionInput/InputTitle';

const toPercent = (num: number, fixed: number = 0) => (num * 100).toFixed(fixed) + '%';

function CalculatorChart() {
  const farmInput = useRecoilValue(farmInputState);
  const relativeInfo = useRecoilValue(relativeInfoAtOpenState);
  const poolInfo = useRecoilValue(poolInfoState);
  const [relativeIndex, setRelativeIndex] = useState(0);
  const [config, setConfig] = useState<LineConfig | undefined>();
  useEffect(() => {
    if (relativeInfo && farmInput && poolInfo) {
      // const center = relativeInfo[relativeIndex].price;
      const dataPoints = [];
      for (let i = 0; i <= 200; i++) {
        const x = Number((i / 100).toFixed(6));
        const y = equityValuePercent(farmInput.leverage, x - 1);
        if (x != 1 && x != 2) {
          dataPoints.push({
            x,
            y,
          });
        } else {
          dataPoints.push({
            x: x + 0.000001,
            y,
          });
        }
      }
      console.log({ threshold: poolInfo.liquidationThreshold });
      const x = liquidationPriceChange(farmInput.leverage, poolInfo.liquidationThreshold);
      const liquidationLine: any = {
        type: 'line',
        start: [1 + x, 'min'],
        end: [1 + x, 'max'],
        style: {
          stroke: '#DBB322',
        },
      };
      const liquidationAnno = {
        type: 'text',
        position: {
          x: x + 1,
          y: 'max',
        },
        offsetX: -80,
        offsetY: -20,
        content: `Liquidation Threshold: ${x * 100 + '%'}`,
        style: {
          fill: '#DBB322',
        },
      };
      const assetNames = poolInfo.pool.split('-');
      const relativeName = `${assetNames[0]}/${assetNames[1]}`;
      const _config: LineConfig = {
        data: dataPoints,
        height: 400,
        xField: 'x',
        yField: 'y',
        color: '#31c77f',
        smooth: true,
        padding: [40, 40, 70, 70],
        tooltip: {
          showTitle: false,
          formatter: (datum: Datum) => {
            let priceChange = datum.x;
            if (priceChange === 1.000001) {
              priceChange = 1;
            } else if (priceChange === 2.000001) {
              priceChange = 2;
            }
            const percent = toPercent(priceChange - 1, 0);
            return { name: `${percent}`, value: (datum.y * 100).toFixed(2) + '%' };
          },
        },
        xAxis: {
          title: {
            text: `${relativeName} Price Change`,
            style: { fontSize: 12 },
          },
          tickCount: 10,
          label: {
            formatter: function formatter(name) {
              return ((Number(name) - 1) * 100).toFixed(0) + '%';
            },
          },
        },
        yAxis: {
          position: 'left',
          title: {
            text: 'Equity %',
            style: { fontSize: 12 },
          },
          label: {
            formatter: function formatter(name) {
              return (Number(name) * 100).toString() + '%';
            },
          },
        },
        annotations: [
          {
            type: 'line',
            start: ['median', 'min'],
            end: ['median', 'max'],
            style: {},
          },
          liquidationLine,
          liquidationAnno,
        ],
      };
      setConfig(_config);
    }
  }, [relativeInfo, farmInput]);

  return (
    <div>
      {config ? (
        <div>
          <InputTitle content={'Price Change Chart'} />
          <Line {...config} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CalculatorChart;
