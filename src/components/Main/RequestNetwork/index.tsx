import { useContext } from 'react'
import { AppContext } from '../../../AppContext';
import { KlaytnIcon } from '../../../commons/resources';
import { SUPPORTED_NETWORKS, Wallet } from '../../../commons/utils/constants';
import styles from './request_network.module.scss';


export default function RequestNetwork() {
  const { handleRequestNetwork, wallet } = useContext(AppContext);

  return (
    <div className={styles.requestNetwork}>
      <img className={styles.image} src={KlaytnIcon} alt="logo" />
      <h4>This network is not supported by Klaytn Faucets</h4>
      <p>Your wallet is connected to an unsupported network. Please change to Klaytn Baobab network to continue</p>
      {wallet === Wallet.METAMASK &&
        <button className={styles.button} onClick={() => handleRequestNetwork(SUPPORTED_NETWORKS[0])}>
          <span>Switch Network</span>
        </button>
      }
    </div >
  )
}
