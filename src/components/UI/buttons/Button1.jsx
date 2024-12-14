import React from "react";
import styles from "./Button1.module.scss";
import PropTypes from "prop-types";

export default function Button1({ onClick, ...props }) {
  return <button className={styles.button1} onClick={onClick} {...props} />;
}

Button1.propTypes = {
  onClick: PropTypes.func,
};
