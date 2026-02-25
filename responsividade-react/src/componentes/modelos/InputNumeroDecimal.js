import React from "react";
import InputComIcone from "./InputComIcone";

function InputNumeroDecimal({ label, value, onChange, onBlur, error, helperText, icon }) {
  return (
    <InputComIcone
      label={label}
      type="number"
      value={value}
      onChange={(e) => {
        // aceita decimais com ponto ou vírgula
        const val = e.target.value.replace(",", ".");
        onChange({ target: { value: val } });
      }}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      icon={icon}
      step="0.01"
    />
  );
}

export default InputNumeroDecimal;
