import styles from './background.module.scss';

export default function Background() {
  return (
    <div className={styles.background}>
      <div className={styles.bg_level_1}>
        <div className={styles.bg_level_2}>
          <div className={styles.bg_level_3}>
            <div className={styles.bg_level_4}>
              <div className={styles.bg_item_1} />
              <div className={styles.bg_item_2} />
              <div className={styles.bg_item_3} />
              <div className={styles.bg_item_4} />
              <div className={styles.bg_item_5} />
              <div className={styles.bg_item_6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
