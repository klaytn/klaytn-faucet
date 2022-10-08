import Web3 from "web3";

declare global {
    interface Window {
        ethereum: {
            isMetaMask: boolean;
            isUnlocked: Promise<boolean>;
            request: <T>(request: {
                method: string;
                params?: any[];
            }) => Promise<T>;
            on: (eventName: unknown, callback: unknown) => unknown;
            removeListener: (eventName: unknown, callback: unknown) => unknown;
        };
        web3: { currentProvider: any; };
        klaytn: any
    }
}
export const getWeb3Instance = () => {
    const windowObj = window;
    const { ethereum, web3 } = windowObj;
    if (ethereum && ethereum.isMetaMask) {
        return new Web3(ethereum as any);
    }
    if (web3) {
        return new Web3(web3.currentProvider);
    }
    return null;
};

export const web3 = getWeb3Instance();