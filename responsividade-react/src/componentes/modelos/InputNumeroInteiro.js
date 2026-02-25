import React from "react";
import InputComIcone from "./InputComIcone";

function InputNumeroInteiro({ label, value, onChange, onBlur, error, helperText, icon }) {
  return (
    <InputComIcone
      label={label}
      type="number"
      value={value}
      onChange={(e) => {
        // só aceita números inteiros
        const val = e.target.value.replace(/\D/g, "");
        onChange({ target: { value: val } });
      }}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      icon={icon}
    />
  );
}

export default InputNumeroInteiro;
