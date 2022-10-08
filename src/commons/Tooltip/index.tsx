import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './tooltip.module.scss';

type Children = React.DetailedReactHTMLElement<any, any> | React.ReactHTMLElement<any> | React.ReactSVGElement |
  React.DOMElement<any, any> | React.FunctionComponentElement<any> | React.CElement<any, any> | React.ReactElement<any>;

interface PropsType {
  children: Children;
  title: React.ReactNode;
  place?: "top" | "right" | "bottom" | "left";
  style?: React.CSSProperties;
  className?: string;
  hidden?: boolean;
}

export default function Tooltip(props: PropsType) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const { children, title, place = "right", hidden, style = {} } = props;
  const className = ["top", "right", "bottom", "left"].includes(place) ? styles[place] : styles.right;

  const onMouseMove = (e: MouseEvent) => {
    setVisible(true);
    const position = { top: 0, left: 0 };
    switch (place) {
      case ("top"): {
        position.left = e.clientX;
        position.top = e.clientY - 10;
        break;
      }
      case ("right"): {
        position.left = e.clientX + 10;
        position.top = e.clientY;
        break;
      }
      case ("bottom"): {
        position.left = e.clientX;
        position.top = e.clientY + 10;
        break;
      }
      default: {
        position.left = e.clientX - 10;
        position.top = e.clientY;
        break;
      }
    }
    setPosition(position);
  }

  const onMouseLeave = (e: MouseEvent) => {
    setVisible(false);
  }

  return (
    <>
      {React.cloneElement(children, { onMouseMove, onMouseLeave })}
      {!hidden && visible && ReactDOM.createPortal(
        <div className={styles.tooltip} style={position}>
          <div className={styles.point}>
            <div className={`${styles.container} ${className}`} style={style}>
              {title}
            </div>
          </div>
        </div>
        , document.body)}
    </>
  );
}
