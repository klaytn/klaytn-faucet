import React from 'react'
import styles from './description.module.scss';


export default function Description() {
  return (
    <div className={styles.description}>
      <div className="container">
        <h1>Request testnet LINK</h1>
        <p>
          {'Get testnet KLAY for an account on one of the supported blockchain testnets so you can create and test your own oracle and Klaytn smart contract. '}
          <a href='#learnmore'>Learn more</a>
        </p>
      </div>
    </div>
  )
}
