import React, { PropsWithChildren, useEffect, useState } from 'react';
import { CloseIcon } from '../resources';
import styles from './modal.module.scss';

interface PropsType extends PropsWithChildren {
  visible?: boolean;
  className?: string;
  contentClassName?: string;
  closeIcon?: React.ReactNode;
  closeIconClassName?: string;
  onClose?: () => void;
  backdrop?: boolean | (() => void);
  backdropClassName?: string;
}

export default function Modal(props: PropsType) {
  const [visible, setVisible] = useState<boolean>(!!props.visible);
  const {
    children,
    contentClassName = "",
    className = "",
    closeIcon = <img src={CloseIcon} alt="visible" className={styles.closeIcon} />,
    closeIconClassName = "",
    backdrop = true, onClose,
    backdropClassName = "",
  } = props;

  const handleClose = () => {
    if (props.visible === undefined) setVisible(!visible);
    onClose?.();
  }

  const handleClickBackDrop = () => {
    handleClose();
    if (typeof backdrop === "function") {
      backdrop();
    }
  }

  useEffect(() => {
    if (props.visible !== undefined) setVisible(props.visible);
  }, [props.visible]);

  if (!visible) return null;

  return (
    <div className={`${styles.modal} ${className}`}>
      <div className={`${styles.backdrop} ${backdropClassName}`} onClick={handleClickBackDrop} />
      <div className={styles.contentContainer}>
        {closeIcon &&
          <div
            className={`${styles.close} ${closeIconClassName}`}
            onClick={handleClose}
          >
            {closeIcon}
          </div>
        }
        <div className={`${styles.content} ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  )
}
