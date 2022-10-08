import { useContext } from 'react'
import { AppContext } from '../../../AppContext';
import { SUPPORTED_NETWORKS, UNKNOW_NETWORK } from '../../../commons/utils/constants';
import Dropdown from '../../../commons/Dropdown';
import styles from './switch_network.module.scss';
import { AlertIcon } from '../../../commons/resources';


export default function SwitchNetwork() {
  const { chainID } = useContext(AppContext);
  const currentNetwork = SUPPORTED_NETWORKS.find(item => item.chainID === chainID) || UNKNOW_NETWORK;

  return (
    <Dropdown
      disable={!!currentNetwork.chainID}
      label={
        <div className={styles.label}>
          <img src={currentNetwork.icon} alt="icon" />
          <span>{currentNetwork.name}</span>
        </div>
      }
      content={
        <div className={styles.content}>
          <img src={AlertIcon} alt="alert" />
          <span>Your wallet is connected to an unknown network.</span>
        </div>
      }
      className={styles.switchNetwork}
    />
  )
}
