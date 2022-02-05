import { Web3Provider } from '@ethersproject/providers';
import { Button } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { baseConnectState, connectState } from 'Src/Store/connect';
import web3Modal from 'Src/utils/web3Modal';

const ConnectWallet = () => {
  const setBaseConnectInfo  = useSetRecoilState(baseConnectState);
  const resetBaseConnectInfo = useResetRecoilState(baseConnectState);
  const { provider, account, active } = useRecoilValue(connectState);

  const [loading, setLoading] = useState(false);

  const connect = useCallback(async () => {
    try {
      setLoading(() => true)
      const instance = await web3Modal.connect();
      const provider = new Web3Provider(instance);
      const account = (await provider.listAccounts())?.[0];
      const chainId = instance.chainId;
  
      setBaseConnectInfo(() => ({
        provider,
        account,
        chainId,
      }));
    } catch (e) {
      console.error('WALLET_CONNECT_FAILED', e);
      disconnect();
    } finally {
      setLoading(() => false);
    }

  }, [])

  const disconnect = useCallback(() => {
    resetBaseConnectInfo();
    web3Modal.clearCachedProvider();
  }, [])

  useEffect(() => {
    if(web3Modal.cachedProvider) {
      connect()
    }
  }, [])

  useEffect(() => {
    if(!(provider instanceof Web3Provider || !window.ethereum)) return;

    const eip1193Provider = window.ethereum;

    console.log('-----CONNECTED-----');

    // Subscribe to accounts change
    eip1193Provider.on("accountsChanged", (accounts: string[]) => {
      const newAccount = accounts?.[0];
      newAccount ? setBaseConnectInfo((pre) => ({
        ...pre,
        account: newAccount,
      })) : disconnect();
    });

    // Subscribe to chainId change
    eip1193Provider.on("chainChanged", (chainId: string) => {
      setBaseConnectInfo((pre) => ({
        ...pre,
        chainId,
      }))
    });

    // Subscribe to eip1193Provider connection
    eip1193Provider.on("connect", (info: { chainId: number }) => {
      console.log(info);
    });

    // Subscribe to eip1193Provider disconnection
    eip1193Provider.on("disconnect", (error: { code: number; message: string }) => {
      console.log(error);
    });

    return () => {
      eip1193Provider.removeAllListeners();
    }

  }, [provider])


  return <Button loading={loading} danger={!!account && !active} type='primary' onClick={account ? disconnect : connect}>
    {account ? active ? `${account.slice(0, 4)}...${account.slice(-4)}` : 'Wrong Chain' : "Connect Wallet"}
  </Button>;
};

export default memo(ConnectWallet);
