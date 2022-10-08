export const getShortWallet = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

export const getDifferentTime = (after: string | number | Date, before?: string | number | Date) => {
    const first = new Date(after).getTime();
    const last = (before && new Date(before).getTime()) || (Date.now() + new Date().getTimezoneOffset() * 60 * 1000);
    const diff = (last - first) / 1000;
    if (diff > 24 * 60 * 60) return `${Math.round(diff / (24 * 60 * 60))} days ago`;
    if (diff > 60 * 60) return `${Math.round(diff / (60 * 60))} hours ago`;
    if (diff > 60) return `${Math.round(diff / 60)} minutes ago`;
    if (diff > 0) return `${Math.round(diff)} seconds ago`;
    return "";
}

export const formatNumber = (value: number | string, decimal: number = 0) => {
    const arr = `${value}`.split(".");
    if (!decimal) return arr[0];
    if (!arr[1]) arr.push("0");
    return arr[0] + "." + arr[1].slice(0, decimal) + ("0".repeat(decimal - arr[1].slice(0, decimal).length))
}