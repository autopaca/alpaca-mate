import { Layout } from 'antd';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

const AsideMenu = () => {
  return (
    <Sider className='mr-4 text-left !bg-transparent'>
      <ul className='font-medium font-mono grid text-2xl gap-4 !bg-transparent'>
        <li className='cursor-pointer group'>
          <NavLink
            exact
            to='/'
            className='text-black text-left group-hover:text-primary-dark'
            activeClassName='pointer-events-none font-bold !text-primary'
          >Caculator</NavLink>
        </li>
        <li className='cursor-pointer group'>
          <NavLink
            exact
            to='/wallet-test'
            className='text-black text-left group-hover:text-primary-dark'
            activeClassName='pointer-events-none font-bold !text-primary'
          >Wallet Info</NavLink>
        </li>
      </ul>
    </Sider>
  );
};

export default memo(AsideMenu);
