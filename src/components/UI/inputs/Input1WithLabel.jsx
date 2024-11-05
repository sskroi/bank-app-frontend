import React from "react";
import Input1 from "./Input1";
import styles from "./Input1WithLabel.module.scss";

export default function Input1WithLabel({ placeholder, labelValue = placeholder, value, onChange, ...props }) {
  return (
    <div className={styles.cont}>
      <label>{labelValue}</label>
      <Input1 placeholder={placeholder} value={value} onChange={onChange} {...props} />
    </div>
  );
}
