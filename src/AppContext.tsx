import React, { createContext, PropsWithChildren, useState, useEffect, useCallback } from "react";
import { web3 } from "./commons/utils/web3";
import { Network, SUPPORTED_NETWORKS, Wallet } from "./commons/utils/constants";
import StorageUltis from "./commons/utils/storage";
import { formatNumber } from "./commons/utils/helper";

const { ethereum, klaytn } = window;

export interface AppState {
  wallet: Wallet | "";
  setWallet(value: Wallet | ""): void;
  address: string;
  setAddress(value: string): void;
  chainID: string;
  setChainId(value: string): void;
  visibleModal: boolean;
  setVisibleModal(value: boolean): void;
  loading: boolean;
  setLoading(value: boolean): void;
  isInstall: boolean;
  setIsInstall(value: boolean): void;
  balance: string;
  setBalance(value: string): void;
  getBalance(): void;
  handleConnect(wallet: Wallet): void;
  handleDisconnect(): void;
  handleRequestNetwork(network: Network): void;
}

export const AppContext = createContext<AppState>({
  wallet: "",
  setWallet: () => { },
  address: "",
  setAddress: () => { },
  chainID: "",
  setChainId: () => { },
  visibleModal: false,
  setVisibleModal: () => { },
  loading: false,
  setLoading: () => { },
  isInstall: false,
  setIsInstall: () => { },
  balance: "0.0",
  setBalance: () => { },
  getBalance: () => { },
  handleConnect: () => { },
  handleDisconnect: () => { },
  handleRequestNetwork: () => { },
});

export const AppProvider: React.FC<PropsWithChildren> = (props) => {
  const [wallet, setWallet] = useState<Wallet | "">(StorageUltis.getUser().wallet);
  const [isInstall, setIsInstall] = useState<any>(true);
  const [address, setAddress] = useState<string>(StorageUltis.getUser().address);
  const [chainID, setChainId] = useState<string>(StorageUltis.getUser().chainID || SUPPORTED_NETWORKS[0].chainID);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<string>("0.0");


  const handleConnect = useCallback(async (wallet: Wallet) => {
    StorageUltis.setWallet(wallet);
    switch (wallet) {
      case (Wallet.KAIKAS): {
        if (klaytn?.isKaikas) {
          try {
            const accounts = await klaytn.enable() as string[];
            if (accounts?.[0]) {
              setAddress(accounts[0]);
              const chainId = klaytn.networkVersion;
              if (chainId) {
                setChainId(`${chainId}`);
                StorageUltis.setChainID(`${chainId}`);
              }
            }
          } catch { }
        } else setIsInstall(false);
        break;
      }
      default: {
        if (ethereum?.isMetaMask) {
          try {
            const accounts = await ethereum?.request({ method: "eth_requestAccounts", }) as string[];
            if (accounts?.[0]) {
              setAddress(accounts[0]);
              const chainId = await web3?.eth.getChainId();
              if (chainId) {
                setChainId(`${chainId}`);
                StorageUltis.setChainID(`${chainId}`);
              }
            }
          } catch { }
        } else setIsInstall(false);
        break;
      }
    }
    setVisibleModal(false);
    setWallet(wallet);
  }, [setAddress, setWallet])

  const handleRequestNetwork = useCallback(
    async (network: Network) => {
      switch (wallet) {
        case (Wallet.METAMASK): {
          try {
            await ethereum?.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: network.chainIDHex }],
            });
          }
          catch (switchError: any) {
            if (switchError.code === 4902) {
              try {
                await ethereum?.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: network.chainIDHex,
                      rpcUrls: network.rpcs,
                      chainName: network.name,
                      blockExplorerUrls: network.blockExplorerUrls,
                      nativeCurrency: {
                        name: network.nativeCurrency.name,
                        symbol: network.nativeCurrency.symbol,
                        decimals: network.nativeCurrency.decimals,
                      },
                    },
                  ],
                });
                await ethereum?.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: network.chainIDHex }],
                });
              } catch { }
            }
          }
          break;
        }
        default: break;
      }
    }, [wallet]);


  const handleDisconnect = useCallback(() => {
    StorageUltis.clear();
    setAddress("");
    setChainId("");
    setWallet("");
    setIsInstall(true);
  }, [])
  useEffect(() => {
    const getAccount = async () => {
      switch (StorageUltis.getUser().wallet) {
        case (Wallet.METAMASK): {
          try {
            const accounts = await web3?.eth.getAccounts();
            if (accounts?.[0]) {
              setAddress(accounts?.[0]);
              StorageUltis.setAddress(accounts?.[0] || "");
            }
            const chainId = await web3?.eth.getChainId();
            if (chainId) {
              setChainId(`${chainId}`);
              StorageUltis.setChainID(`${chainId}`);
            }
          } catch {
            handleDisconnect();
          }
          break;
        }
        case (Wallet.KAIKAS): {
          try {
            const accounts = await klaytn.enable();
            if (accounts?.[0]) {
              setAddress(accounts?.[0]);
              StorageUltis.setAddress(accounts?.[0] || "");
            }
            const chainId = klaytn.networkVersion;
            if (chainId) {
              setChainId(`${chainId}`);
              StorageUltis.setChainID(`${chainId}`);
            }
          } catch (error) {
            handleDisconnect();
          }
          break;
        }
        default: break;
      }
      setLoading(false);
    }
    getAccount();

  }, [handleDisconnect]);

  useEffect(() => {
    const handleNetworkChanged = (chainId: string) => {
      setChainId(`${chainId}`);
      StorageUltis.setChainID(chainId);
    }
    const handleAccountsChanged = (newAccounts: string) => {
      if (newAccounts?.[0]) {
        setAddress(newAccounts[0]);
        StorageUltis.setAddress(newAccounts[0]);
      }
      else {
        handleDisconnect();
      }
    }
    switch (wallet) {
      case (Wallet.METAMASK): {
        if (ethereum?.isMetaMask) {
          ethereum.on("networkChanged", handleNetworkChanged);
          ethereum.on("accountsChanged", handleAccountsChanged);
          return () => {
            ethereum.removeListener("networkChanged", handleNetworkChanged);
            ethereum.removeListener("accountsChanged", handleAccountsChanged);
          }
        }
        break;
      }
      case (Wallet.KAIKAS): {
        if (klaytn?.isKaikas) {
          klaytn.on("networkChanged", handleNetworkChanged);
          klaytn.on("accountsChanged", handleAccountsChanged);
          return () => {
            klaytn.removeListener("networkChanged", handleNetworkChanged);
            klaytn.removeListener("accountsChanged", handleAccountsChanged);
          }
        }
        break;
      }
      default: break;
    }
  }, [wallet, handleDisconnect])

  const getBalance = useCallback(
    async () => {
      try {
        const balance = await web3?.eth.getBalance(address) || 0;
        const currentNetwork = SUPPORTED_NETWORKS.find(network => network.chainID === chainID)
        if (currentNetwork) {
          setBalance(formatNumber(Number(balance) / Math.pow(10, currentNetwork.nativeCurrency.decimals), 1))
        }
      }
      catch (e: any) {
        setBalance("0.0")
      }
    },
    [setBalance, chainID, address],
  )

  useEffect(() => {
    if (address) getBalance()
  }, [address, getBalance])

  const appState = {
    wallet, setWallet,
    address, setAddress,
    chainID, setChainId,
    visibleModal, setVisibleModal,
    loading, setLoading,
    isInstall, setIsInstall,
    balance, setBalance,
    getBalance,
    handleConnect,
    handleRequestNetwork,
    handleDisconnect,
  };

  return (
    <AppContext.Provider value={appState}>
      {props.children}
    </AppContext.Provider>
  );
};
