import { Wallet } from "./constants";

const STORE_NAME = "klaytn_user";
export interface StorageData {
    wallet: Wallet | "";
    address: string;
    chainID: string;
    provider: any
}

export default class StorageUltis {
    static getUser() {
        const data = sessionStorage.getItem(STORE_NAME);
        if (data) return JSON.parse(data) as StorageData
        return ({
            wallet: "",
            address: "",
            chainID: "",
            provider: null
        } as StorageData);
    }

    static setWallet(wallet: string) {
        const user = this.getUser();
        sessionStorage.setItem(STORE_NAME, JSON.stringify({ ...user, wallet }))
    }

    static setAddress(address: string) {
        const user = this.getUser();
        sessionStorage.setItem(STORE_NAME, JSON.stringify({ ...user, address }))
    }
    static setChainID(chainID: string) {
        const user = this.getUser();
        sessionStorage.setItem(STORE_NAME, JSON.stringify({ ...user, chainID }))
    }
    static setProvider(provider: string) {
        const user = this.getUser();
        sessionStorage.setItem(STORE_NAME, JSON.stringify({ ...user, provider }))
    }


    static clear() {
        sessionStorage.removeItem(STORE_NAME);
    }

}