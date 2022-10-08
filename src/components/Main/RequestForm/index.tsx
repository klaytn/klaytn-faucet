import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import * as cavers from '../../../commons/utils/caver';
import { AppContext } from '../../../AppContext';
import styles from './form.module.scss';
import { getRequestTime, requestToken } from '../../../commons/utils/services';
import Modal from '../../../commons/Modal';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { AlertDiamondIcon } from '../../../commons/resources';
import { getDifferentTime } from '../../../commons/utils/helper';

const REACT_APP_HCAPTCHA_SITE_KEY = process.env.REACT_APP_HCAPTCHA_SITE_KEY || "7be2579c-e9e0-47c7-b5b1-4819e593ff1c"

export default function RequestForm() {
  const { address, getBalance } = useContext(AppContext);
  const [value, setValue] = useState<string>(address);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [ekey, setEkey] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const checkRequestTime = async (wallet: string) => {
    try {
      const res = await getRequestTime(wallet);
      if (res.data.data && getDifferentTime(res.data.data)) {
        setError(`You can run faucet once every 24 hours (last time you ran faucet was ${getDifferentTime(res.data.data)})`)
      }
      else {
        setError("");
      }
    }
    catch (e) {
      setError("Please enter a ethereum address");
    }

  }
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!e.target.value) setError("This field is required");
    else if (!(ethers.utils.isAddress(e.target.value) || cavers.utils.isAddress(e.target.value))) setError("Please enter a valid address");
    else {
      checkRequestTime(e.target.value);
    }
  }
  const onVerify = (token: string, ekey: string) => {
    setToken(token);
    setEkey(ekey);
  }

  const onError = (event: string) => { }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (token && ekey) {
      try {
        const res = await requestToken({ address: value, token, ekey });
        const data = res.data
        if (data.result === "SUCCESS") {
          setHash(data.data);
          if (value === address) {
            getBalance();
          }
        }
        else if (data.result === "ADDRESS ERROR") {
          setError("Please enter a ethereum address");
        }
        else {
          setError("System Error");
        }
      }
      catch {
        setError("System Error");
      }
    }
  }

  const handleClose = () => {
    setHash("");
    setValue("");
    setError("");
    setToken("");
    setEkey("");
  }

  useEffect(() => {
    setValue(address);
    checkRequestTime(address);
  }, [address, setValue]);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="wallet">Wallet address</label>
        <input
          id="wallet"
          name="wallet"
          value={value}
          onChange={handleChange}
        />
        {error &&
          <p className={styles.error}>
            <img src={AlertDiamondIcon} alt="error" />
            {error}
          </p>
        }
        <label htmlFor="hcaptcha">Verify request</label>
        <div className={styles.captcha}>
          {!hash &&
            <HCaptcha sitekey={REACT_APP_HCAPTCHA_SITE_KEY} onVerify={onVerify} onError={onError} />
          }
        </div>
        <button
          className={styles.submit}
          type="submit"
          disabled={!token || !ekey || !value || !!error}
        >Send me 20 testnet KLAY</button>
      </form>
      <Modal visible={!!hash} backdrop={handleClose} closeIcon={null}>
        <div className={styles.modalContent}>
          <h4 className={styles.modalTitle}>Your KLAY Fauccet request accepted.</h4>
          <div className={styles.modalDescription}>You can run faucet once every 24 hours.</div>
          <button className={styles.closeButton} onClick={handleClose}>OK</button>
        </div>
      </Modal>
    </ >
  )
}
