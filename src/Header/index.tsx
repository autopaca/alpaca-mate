import { Layout } from 'antd';
import React, { memo } from 'react';
import ConnectWallet from 'Src/ConnectWallet';
import useAlpacaPriceQuery from 'Src/utils/useAlpacaPriceQuery';

const { Header: LayoutHeader } = Layout;

const Header = () => {
  const {data} = useAlpacaPriceQuery()
  return (
    <LayoutHeader className={'!bg-transparent flex h-24 !px-0 mb-4'}>
      <div className='flex w-full items-center'>
        <div className='mr-auto text-primary'>
          <h1 className={'mr-2 font-sans lg:my-4 text-primary font-extrabold tracking-wider text-lg lg:text-4xl block lg:inline-block'}>Alpaca Mate</h1>
          <span className={'text-sm lg:text-lg block lg:inline-block'}>an Emulator of ALPACA</span>
          <span> </span>
          <span className={'text-sm lg:text-lg block lg:inline-block'}>Leveraged Yield Farm</span>
        </div>
        {data && data.length === 1 && (
          <div className={'flex flex-wrap content-center ml-8'}>
            <img className={'h-6 w-6 rounded-full bg-white shadow-md my-auto'} src={data[0].image} />
            <span className={'text-black my-auto ml-2'}>${data[0].current_price}</span>
          </div>
        )}
        <div className='ml-8'>
          <ConnectWallet />
        </div>
      </div>
    </LayoutHeader>
  );
};

export default memo(Header);
