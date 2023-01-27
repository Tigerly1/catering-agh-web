import React, { useState } from "react";
import styles from "src/components/input_fields/dropdown.module.scss";
const TextInputField = ({
  label,
  placeholder,
  is_text_area,
  id,
  isSecure,
  handleOnChange,
  value,
  readOnly,
  required,
  viewPassword
}: {
  required?: boolean;
  label: string;
  placeholder?: string;
  is_text_area?: boolean;
  viewPassword?: boolean;
  id?: string;
  isSecure?: boolean;
  handleOnChange?: any;
  value?: string;
  readOnly?: boolean;
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(isSecure ? false : true)

  function setUpOnChange(ev: any) {
    if (id) {
      handleOnChange(id, ev.target.value);
    } else {
      handleOnChange();
    }
  }

  const changeType = () => {
    if (isSecure) {
      let viewPasswords = !isPasswordVisible
      setPasswordVisible(viewPasswords)
    }
  }

  return (
    <div className={styles.text_input_wrapper}>
      <span
        className={styles.label}
        style={isSecure === true ? { textTransform: "none" } : {}}
      >
        {label}
      </span>
      {is_text_area && is_text_area === true ?
        <textarea
          style={{ resize: "none" }}
          id={id ? id : ""}
          className={styles.input_field}
        />
        : (
          <input
            required={required}
            placeholder={placeholder ? placeholder : undefined}
            value={value ? value : undefined}
            onChange={id && handleOnChange ? setUpOnChange : handleOnChange}
            id={id ? id : ""}
            type={isPasswordVisible === true ? "text" : "password"}
            readOnly={readOnly}
            className={styles.input_field}
          />
        )}
      {viewPassword ? <img onClick={changeType} src={isPasswordVisible ? "/images/closedEye.png" : "/images/viewPassword.png"} className={styles.view_password} alt="view" /> : null}
    </div>
  );
};

export default TextInputField;
