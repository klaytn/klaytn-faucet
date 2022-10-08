
import _ from 'lodash';
import BN from 'bn.js';
import { keccak256 } from "@ethersproject/keccak256";

const isBN = function (bn: string) {
    return BN.isBN(bn)
}
const isHexStrict = function (hex: string) {
    return (_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex)
}

const hexToBytes = function (hex: any) {
    hex = hex.toString(16)

    if (!isHexStrict(hex)) {
        throw new Error(`Given value "${hex}" is not a valid hex string.`)
    }

    hex = hex.replace(/^0x/i, '')

    const bytes = []
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16))
    }
    return bytes
}


const SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

const sha3 = function (value: any) {
    // return null when value is not string type.
    if (typeof value === 'number') return null

    if (isHexStrict(value) && /^0x/i.test(value.toString())) {
        value = hexToBytes(value)
    }

    if (isBN(value)) {
        value = value.toString(10)
    }

    const returnValue = keccak256(value);

    if (returnValue === SHA3_NULL_S) {
        return null
    }
    return returnValue
}

const checkAddressChecksum = function (address: string) {
    // Check each case
    address = address.replace(/^0x/i, '');
    const addressHash = (sha3(address.toLowerCase()) || "").replace(/^0x/i, '')

    for (let i = 0; i < 40; i++) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if (
            (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
            (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])
        ) {
            return false
        }
    }
    return true
}


const isAddress = function (address: string) {
    // check if it has the basic requirements of an address
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        return false
        // If it's ALL lowercase or ALL upppercase
    }
    if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
        return true
        // Otherwise check each case
    }
    try {
        return checkAddressChecksum(address)
    }
    catch {
        return false
    }
}
export const utils = {
    isAddress
}