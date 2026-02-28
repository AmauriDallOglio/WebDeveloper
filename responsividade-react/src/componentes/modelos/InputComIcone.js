// src/componentes/modelos/InputComIcone.js
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Icon } from "@iconify/react";

function InputComIcone({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  onBlur, 
  error, 
  helperText, 
  icon 
}) {
  return (
     <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon icon={icon} width="25" height="25" />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiInputBase-input": {
          padding: "10px 8px", // diminui altura e largura internas
        },
      }}
    />

  );
}

export default InputComIcone;
