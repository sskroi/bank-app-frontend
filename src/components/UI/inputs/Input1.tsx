import React, { FC } from "react";
import styles from "./Input1.module.scss";

interface Input1Props {
  onChange?: (e: React.ChangeEvent) => void;
  disabled?: boolean;
  placeholder?: string;
  value?: string | number;
  type?: string;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input1: FC<Input1Props> = (props) => {
  return <input className={styles.input1} {...props} />;
};

export default Input1;
