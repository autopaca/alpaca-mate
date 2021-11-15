import { Col, Image, Row, Select } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import { poolState, poolTypeState } from '../../Store';
import poolMetas, { singleTokenPoolMetas } from '../../poolMetas';
import { getCoinUrl } from '../utils';
import './index.css';
import { PoolType } from '../type.d';
import _ from 'lodash';

const { Option } = Select;

const ChooseFarmPosition = () => {
  const [pool, setPool] = useRecoilState(poolState);
  const [poolType, setPoolType] = useRecoilState(poolTypeState);
  return (
    <div className={'mt-1 lg:mt-4 lg:mx-7 text-base lg:text-2xl font-bold ChooseFarmPosition'}>
      <Row align={'middle'}>
        <Col span={10}>
          <span>Which pool would you like to farm?</span>
        </Col>
        <Col span={4}>
          <Select
            className={'c-poolTypeSelector mx-4 w-32'}
            value={poolType}
            onChange={(t: PoolType) => setPoolType(t)}>
            {_.zip<any>([PoolType.Single, PoolType.LP], ['Single Token', 'LPs']).map(([pType, name], i) => (
              <Option value={pType} key={`farm-pool-type-${i}`}>
                {name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          {poolType === PoolType.LP ? (
            <Select
              key={poolType}
              value={pool?.poolIndex}
              showSearch={true}
              filterOption={(input, option) => option!.key!.toString().toLowerCase().includes(input.toLowerCase())}
              className={'c-poolSelector mx-4 w-64'}
              onChange={(i: number) => setPool({ poolIndex: i, poolMeta: poolMetas[i] })}
              dropdownClassName={'ChooseFarmPosition'}>
              {poolMetas.map((meta, i) => (
                <Option value={i} key={`farm-${meta.pool}-${i}`}>
                  <Row justify={'start'} align={'middle'}>
                    <Col>
                      <div className={'c-image__twoStack mr-2'}>
                        <Image
                          className={'h-6 w-6 rounded-full bg-white shadow-md'}
                          src={getCoinUrl(meta.pool.split('-')[1])}
                          preview={false}
                        />
                        <Image
                          className={'h-6 w-6 rounded-full bg-white shadow-md'}
                          src={getCoinUrl(meta.pool.split('-')[0])}
                          preview={false}
                        />
                      </div>
                    </Col>
                    <Col>{meta.pool}</Col>
                  </Row>
                </Option>
              ))}
            </Select>
          ) : (
            <Select
              key={poolType}
              value={0}
              className={'c-poolSelector mx-4 w-64'}
              dropdownClassName={'ChooseFarmPosition'}>
              {singleTokenPoolMetas.map((meta, i) => (
                <Option value={i} key={`farm-${meta.pool}-${i}`}>
                  <Row justify={'start'} align={'middle'}>
                    <Col>
                      <div className={'mr-2'}>
                        <Image
                          className={'h-6 w-6 rounded-full bg-white shadow-md'}
                          src={getCoinUrl('cake')}
                          preview={false}
                        />
                      </div>
                    </Col>
                    <Col>{meta.pool}</Col>
                  </Row>
                </Option>
              ))}
            </Select>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default ChooseFarmPosition;
