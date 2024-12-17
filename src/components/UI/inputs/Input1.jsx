import React from "react";
import styles from "./Input1.module.scss";
import PropTypes from "prop-types";

const Input1 = (props) => {
  return <input className={styles.input1} {...props} />;
};

Input1.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
};

export default Input1;
