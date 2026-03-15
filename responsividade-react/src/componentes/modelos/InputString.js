// src/componentes/modelos/InputString.js
import React from "react";
import InputComIcone from "./InputComIcone";

function InputString({ label, type = "text", value, onChange, onBlur, error, helperText, icon, endAdornment }) {
  return (
    <InputComIcone
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      icon={icon}
      endAdornment={endAdornment}
    />
  );
}

export default InputString;
