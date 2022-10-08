import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://api-baobab.wallet.klaytn.com/faucet";
export type RequestTokenParams = {
    address: string;
    token?: string;
    ekey?: string;
}

export type ResposeRequestToken = {
    status: number;
    data: {
        code: number,
        target: "api",
        result: "SUCCESS" | "ADDRESS ERROR",
        data: string
    }
}

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})

export const requestToken = async (params: RequestTokenParams): Promise<ResposeRequestToken> => {
    const url = `${API_BASE_URL}/run?address=${params.address}`;
    return await axiosInstance.post(url, params);
};

export const getRequestTime = async (address: string): Promise<ResposeRequestToken> => {
    const url = `${API_BASE_URL}/time?address=${address}`;
    return await axiosInstance.get(url);
}; 
