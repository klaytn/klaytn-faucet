import { useContext, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AppContext } from '../../../AppContext';
import { Extension, SCAN_URL, SUPPORTED_NETWORKS, Wallet } from '../../../commons/utils/constants';
import Dropdown from '../../../commons/Dropdown';
import { getShortWallet } from '../../../commons/utils/helper';
import { KaiKasIcon, KlaytnIcon, MetaMaskIcon, WalletFilledIcon } from '../../../commons/resources';
import styles from './connect_wallet.module.scss';
import Tooltip from '../../../commons/Tooltip';


export default function ConnectWallet() {
  const { setVisibleModal, address, wallet, isInstall, chainID, balance, getBalance } = useContext(AppContext);
  const [copied, setCopied] = useState(false);
  const currentNetwork = SUPPORTED_NETWORKS.find(network => network.chainID === chainID);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);

    return () => {
      clearTimeout(timeOut)
    }
  }, [copied, setCopied]);

  const handleClick = () => {
    if (isInstall) {
      setVisibleModal(true)
    }
    else {
      const url = wallet === Wallet.METAMASK ? Extension.METAMASK : Extension.KAIKAS;
      window.open(url, "_blank");
    }
  }


  if (!address) {
    return (
      <div className={styles.connectNetwork}>
        <button className={styles.button} onClick={handleClick}>
          {isInstall ?
            <>
              <img src={WalletFilledIcon} alt="wallet" />
              <span>Connect Wallet</span>
            </>
            :
            <span>Install wallet</span>
          }
        </button>
      </div>
    )
  }
  else {
    return (
      <Dropdown
        className={styles.connectNetwork}
        label={
          <div className={styles.label}>
            <i className={styles.avatar} />
            <span>{getShortWallet(address)}</span>
          </div>
        }
        onDropdown={visible => visible && getBalance()}
        contentClassName={styles.contentContainer}
        content={
          <div className={styles.content}>
            <div className={styles.user}>
              <div className={styles.wallet}>
                <span>Connected with {wallet === Wallet.METAMASK ? "MetaMask" : "KaiKas"}</span>
                <img src={wallet === Wallet.METAMASK ? MetaMaskIcon : KaiKasIcon} alt="wallet" />
              </div>
              <div className={styles.address}>
                <i className={styles.avatar} />
                <a href={`${SCAN_URL}/${address}`} rel="noopener noreferrer" target="_blank"    >
                  {getShortWallet(address)}
                </a>
                <Tooltip title={copied ? "Copied" : "Copy address to clipboard"} place="top">
                  <div>
                    <CopyToClipboard text={address}
                      onCopy={() => setCopied(true)}>
                      <i className={`${styles.copyIcon} ${copied ? styles.copied : ""}`} />
                    </CopyToClipboard>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className={styles.blance}>
              <img src={KlaytnIcon} alt="blance" />
              <div className={styles.tokenInfo}>
                <span className={styles.tokenName}>{currentNetwork?.nativeCurrency?.symbol}</span>
                <span className={styles.tokenValue}>{balance}</span>
              </div>
            </div>
          </div>
        }
      />
    )
  }
}

