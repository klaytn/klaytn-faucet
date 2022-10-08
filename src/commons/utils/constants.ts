import { AlertIcon, EthereumIcon } from "../resources";

export type Network = {
    chainID: string;
    chainIDHex: string;
    network: string;
    name: string;
    icon: string;
    rpcs: string[],
    blockExplorerUrls: string[],
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number,
    },
}

export enum Wallet {
    METAMASK = "METAMASK",
    KAIKAS = "KAIKAS"
}

export enum Extension {
    METAMASK = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
    KAIKAS = "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
}

export const SUPPORTED_NETWORKS: Network[] = [{
    chainID: "1001",
    chainIDHex: "0x3e9",
    network: "baobab",
    name: "Klaytn Baobab Testnest",
    icon: EthereumIcon,
    rpcs: ["https://api.baobab.klaytn.net:8651"],
    blockExplorerUrls: ["https://baobab.scope.klaytn.com/"],
    nativeCurrency: {
        name: "KLAY",
        symbol: "KLAY",
        decimals: 18,
    },
}];

export const UNKNOW_NETWORK: Network = {
    chainID: "",
    chainIDHex: "",
    network: "unknown",
    name: "Unknown network",
    icon: AlertIcon,
    rpcs: [],
    blockExplorerUrls: [],
    nativeCurrency: {
        name: "",
        symbol: "",
        decimals: 0,
    },
}
export const SCAN_URL = "https://baobab.klaytnfinder.io/account"