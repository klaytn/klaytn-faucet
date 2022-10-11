import React from 'react'
import ConnectWallet from './ConnectWallet';
import SwitchNetwork from './SwitchNetwork';
import styles from './header.module.scss';
import { LogoIcon } from '../../commons/resources';


export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img src={LogoIcon} alt="logo" />
            <span>Faucets</span>
          </div>
          <div className={styles.right}>
            <SwitchNetwork />
            <ConnectWallet />
          </div>
        </div>
      </div>
    </header>
  )
}
