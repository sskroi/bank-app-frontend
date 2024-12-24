import React, { FC } from "react";
import Input1 from "./Input1";
import styles from "./Input1WithLabel.module.scss";

interface Input1WithLabelProps {
  placeholder?: string;
  labelValue?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent) => void;
}

const Input1WithLabel: FC<Input1WithLabelProps> = ({
  placeholder,
  labelValue = placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={styles.cont}>
      <label>{labelValue}</label>
      <Input1
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input1WithLabel;
