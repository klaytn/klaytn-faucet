import React, { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import { CaretIcon } from '../resources';
import styles from './dropdown.module.scss';

interface PropsType {
  label: React.ReactNode;
  content: React.ReactNode;
  disable?: boolean;
  className?: string;
  labelClassName?: string;
  contentClassName?: string;
  icon?: React.ReactNode;
  onDropdown?: (visible: boolean) => void;
}

export default function Dropdown(props: PropsType) {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {
    label, content, disable,
    className = "",
    labelClassName = "",
    contentClassName = "",
    icon = <img src={CaretIcon} alt="dropdown" />,
    onDropdown
  } = props;

  const handleClick = () => {
    if (!disable) {
      setDropdown(!dropdown);
      document.documentElement.removeEventListener('click', handleClickBody);
      document.documentElement.addEventListener('click', handleClickBody);
    }
  }

  const handleClickBody = useCallback(
    (e: MouseEvent): void => {
      if (e.target instanceof Element && !ref.current?.contains(e.target)) {
        setDropdown(() => false);
        document.documentElement.removeEventListener('click', handleClickBody);
      }
    }, [])


  useEffect(() => {
    return () => {
      document.documentElement.removeEventListener('click', handleClickBody);
    }
  }, [handleClickBody]);

  useEffect(() => {
    if (disable && dropdown) setDropdown(false);
  }, [disable, dropdown, setDropdown]);

  useEffect(() => {
    if (onDropdown) onDropdown(dropdown);
  }, [dropdown, onDropdown]);

  return (
    <div ref={ref} className={`${styles.dropdownContainer} ${className} ${disable ? styles.disable : ""} `}>
      <div className={`${styles.label} ${labelClassName}`} onClick={handleClick}>
        {label}
        <div className={styles.icon}>{icon}</div>
      </div>
      <div
        className={`${styles.content} ${contentClassName}`}
        style={{ display: dropdown ? "block" : "none" }}
      >
        {content}
      </div>
    </div>
  )
}
