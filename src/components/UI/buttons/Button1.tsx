import React, { FC } from "react";
import styles from "./Button1.module.scss";

interface Button1Props {
  onClick: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

const Button1: FC<Button1Props> = ({ onClick, ...props }) => {
  return <button className={styles.button1} onClick={onClick} {...props} />;
};

export default Button1;
