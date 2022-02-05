import Web3Modal from "web3modal";

const providerOptions = {
  // default with only metamask
};

const web3Modal = new Web3Modal({
  network: "binance", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

export default web3Modal;