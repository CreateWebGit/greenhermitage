import React from "react";
import styles from "./styles.module.css";

const StyledInput = ({ labeName, type, value, onChanges }) => {
  return (
    <div className={styles.styledInput}>
      {type === "textarea" ? (
        <textarea
          type={type}
          name="user_name"
          value={value}
          onChange={onChanges}
          placeholder=" "
          required
        />
      ) : (
        <input
          type={type}
          name="user_name"
          value={value}
          onChange={onChanges}
          placeholder=" "
          required
        />
      )}
      <label>{labeName}</label>
      <div className="line"></div>
    </div>
  );
};

export default StyledInput;
