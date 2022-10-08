import { useContext } from 'react';
import { AppContext } from '../../../AppContext';
import { KlaytnIcon } from '../../../commons/resources';
import styles from './connect_wallet.module.scss';


export default function ConnectWallet() {
  const { setVisibleModal } = useContext(AppContext);
  return (
    <div className={styles.connectWallet}>
      <img className={styles.image} src={KlaytnIcon} alt="logo" />
      <h4>Testnet KLAY covers transactions for testing purposes</h4>
      <p>Funds that you receive through Klaytn Faucets are not real funds.<br />To get testnet KLAY, connect to your wallet.</p>
      <button className={styles.button} onClick={() => setVisibleModal(true)}>
        <span>Connect Wallet</span>
      </button>
    </div>
  )
}
