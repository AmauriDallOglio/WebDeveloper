// src/componentes/modelos/InputString.js
import React from "react";
import InputComIcone from "./InputComIcone";

function InputString({ label, value, onChange, onBlur, error, helperText, icon }) {
  return (
    <InputComIcone
      label={label}
      type="text"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      icon={icon}
    />
  );
}

export default InputString;
