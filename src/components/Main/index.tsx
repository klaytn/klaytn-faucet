import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { SUPPORTED_NETWORKS } from '../../commons/utils/constants';
import Description from './Description';
import styles from './main.module.scss';
import ConnectWallet from './ConnectWallet';
import RequestNetwork from './RequestNetwork';
import RequestForm from './RequestForm';
import ConnectWalletModal from './ConnectWalletModal';


export default function Main() {
  const { address, chainID } = useContext(AppContext);
  const supportNetwork = SUPPORTED_NETWORKS.find(item => item.chainID === chainID);
  return (
    <main className={styles.main}>
      <Description />
      <div className="container">
      <div className={`${styles.box}`}>
        {address ?
          (
            supportNetwork ?
              <RequestForm />
              :
              <RequestNetwork />
          )
          :
          <>
            <ConnectWalletModal />
            <ConnectWallet />
          </>
        }
      </div>
      </div>
    </main>
  )
}
