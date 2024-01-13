// Packages Import
import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";

const StyledOutlinedInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "black",
    fontWeight: 500,
    fontSize: "12px",
    transform: "none",
    top: "2px",
    left: "14px",
    right: "14px",
    paddingTop: "5px",
    zIndex: 2,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#222222",
  },
  "& .MuiInputBase-root": {
    "& input, & textarea": {
      fontSize: "14px",
      lineHeight: "19.69px",
      padding: "30px 14px 10px",
    },
    "& .MuiInputBase-formControl": {
      padding: 0,
    },
  },
  "& .MuiOutlinedInput-root": {
    padding: 0,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.black,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.error.main,
    },
  },
  ".MuiInputAdornment-root": {
    marginLeft: "16px",
    marginRight: "-8px",
    marginTop: "18px",
    ".MuiTypography-root": {
      fontWeight: 500,
      color: "black",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black",
  },
}));

const CustomInput = React.forwardRef(function Input(props, ref) {
  const {
    id,
    type,
    name,
    label,
    placeholder,
    value,
    onChange,
    multiline,
    helperText,
    error,
    required,
    disabled,
    forPhone,
    showAdornment,
    adornmentValue,
    positionAdornment,
    autoComplete = "off",
    dataAttributes = {},
  } = props;
  return (
    <>
      <StyledOutlinedInput
        fullWidth
        variant="outlined"
        ref={ref}
        InputLabelProps={{
          shrink: true,
          variant: "standard",
        }}
        InputProps={{
          notched: false,
          startAdornment: showAdornment && (
            <InputAdornment position={positionAdornment}>
              {adornmentValue}
            </InputAdornment>
          ),
        }}
        inputProps={{ ...dataAttributes }}
        id={id}
        type={type}
        name={name}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        multiline={multiline}
        minRows={multiline ? 3 : ""}
        maxRows={multiline ? 3 : ""}
        disabled={disabled ? disabled : false}
        helperText={helperText}
        error={!!error}
        required={required}
        autoComplete={autoComplete}
        sx={
          forPhone
            ? {
                "& .MuiOutlinedInput-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  },
                },
              }
            : {
                "& .MuiOutlinedInput-root": {
                  ".MuiOutlinedInput-input": {
                    cursor: disabled ? "not-allowed" : "pointer",
                  },
                },
              }
        }
      />
    </>
  );
});

export default CustomInput;
