import React, { FC } from "react";
import styles from "./Button1.module.scss";

interface Button1Props {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Button1: FC<Button1Props> = ({ onClick, className, ...props }) => {
  return (
    <button
      className={`${styles.button1} ${className}`}
      onClick={onClick}
      {...props}
    />
  );
};

export default Button1;
