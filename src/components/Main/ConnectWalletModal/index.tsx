import { useContext } from 'react'
import { AppContext } from '../../../AppContext';
import { Wallet } from '../../../commons/utils/constants';
import Modal from '../../../commons/Modal';
import { KaiKasIcon, MetaMaskIcon } from '../../../commons/resources';
import styles from './connect_wallet_modal.module.scss';


export default function ConnectWalletModal() {
  const { handleConnect, visibleModal, setVisibleModal } = useContext(AppContext);

  const handleConnectMetamask = () => {
    handleConnect(Wallet.METAMASK);
  }
  const handleConnectKaikas = () => {
    handleConnect(Wallet.KAIKAS);
  }

  return (
    <Modal className={styles.modal} visible={visibleModal} onClose={() => setVisibleModal(false)} backdrop={true}>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>Connect your wallet</h3>
        <ul className={styles.list}>
          <li onClick={handleConnectMetamask}>
            <img src={MetaMaskIcon} alt="metamask" />
            <span>MetaMask</span>
          </li>
          <li onClick={handleConnectKaikas}>
            <img src={KaiKasIcon} alt="kaikas" />
            <span>KaiKas</span>
          </li>
        </ul>
      </div>
    </Modal>
  );
}

