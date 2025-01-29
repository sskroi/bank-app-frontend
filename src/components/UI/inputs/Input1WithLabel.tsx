import React, { FC } from "react";
import Input1 from "./Input1";
import styles from "./Input1WithLabel.module.scss";

interface Input1WithLabelProps extends React.ComponentProps<typeof Input1> {
  labelValue?: string;
}

const Input1WithLabel: FC<Input1WithLabelProps> = ({
  placeholder,
  labelValue = placeholder,
  ...props
}) => {
  return (
    <div className={styles.cont}>
      <label>{labelValue}</label>
      <Input1 placeholder={placeholder} {...props} />
    </div>
  );
};

export default Input1WithLabel;
