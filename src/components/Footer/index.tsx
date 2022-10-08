import { DiscordIcon, KlaytnIcon, MediumIcon, TwitterIcon } from '../../commons/resources';
import styles from './footer.module.scss';


export default function Footer() {
  return (
    <footer>
      <div className={`${styles.footerBox} container`}>
        <a href="https://www.klaytn.com" target="_blank" rel="noreferrer" className={styles.footerLogo}>
          <img src={KlaytnIcon} alt="logo" />
          <span>Klaytn</span>
        </a>
        <ul className={styles.social}>
          <li>
            <a href="https://twitter.com/klaytn_official/" target="_blank" rel="noreferrer">
              <img src={TwitterIcon} alt="Twitter" />
              <span>Twitter</span>
            </a>
          </li>
          <li>
            <a href="https://medium.com/klaytn" target="_blank" rel="noreferrer">
              <img src={MediumIcon} alt="Medium" />
              <span>Medium</span>
            </a>
          </li>
          <li>
            <a href="https://discord.com/invite/hNcrS4BQrm" target="_blank" rel="noreferrer">
              <img src={DiscordIcon} alt="Discord" />
              <span>Discord</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
