// Packages Import
import React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// Styles Import
import { styled } from "@mui/material/styles";
// import "../../../../styles/ConversionForm/ConversionForm.css";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "0px",
    "& .MuiAutocomplete-input": {
      fontSize: "14px",
      lineHeight: "19.69px",
      padding: "30px 14px 10px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.black,
      top: "0px",
      "& legend": {
        display: "none",
      },
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
  "& .MuiInputLabel-root": {
    color: "black",
    fontWeight: 500,
    fontSize: "12px",
    transform: "none",
    top: "7px",
    left: "14px",
    zIndex: 2,
    maxWidth: "70%",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black",
  },
}));

function StyledAutocompleteWithProps(props) {
  return <StyledAutocomplete {...props} />;
}

const CustomAutocomplete = React.forwardRef(function AutocompleteField(
  {
    id,
    name,
    label,
    placeholder,
    options,
    value,
    onChange,
    onInputChange,
    getOptionLabel,
    isOptionEqualToValue,
    renderOption,
    helperText = "",
    error = "",
    required,
    autoFocus,
    userInput,
    forPhone,
    disabled,
    disablePortal,
    startAdornment,
    disableClearable,
    noOptionsText,
    inputValue,
    dataAttributes = {},
    open,
    filterOptions = createFilterOptions(),
  },
  ref
) {
  return (
    <StyledAutocompleteWithProps
      fullWidth
      id={id}
      options={options}
      value={value}
      onChange={(event, option) => onChange(option)}
      onInputChange={(event, option) =>
        onInputChange ? onInputChange(option) : {}
      }
      getOptionLabel={(option) => getOptionLabel(option)}
      isOptionEqualToValue={(option) => isOptionEqualToValue(option)}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ fontSize: "14px" }}>
          {renderOption(option)}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={ref}
          variant="outlined"
          name={name}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={!!error}
          InputLabelProps={{ shrink: true, variant: "standard" }}
          required={required}
          autoFocus={autoFocus}
          InputProps={{
            ...params.InputProps,
            startAdornment,
          }}
          sx={
            forPhone
              ? {
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRight: 0,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
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
          inputProps={{
            ...params.inputProps,
            ...dataAttributes,
          }}
        />
      )}
      disabled={disabled ? disabled : false}
      disablePortal={disablePortal}
      disableClearable={disableClearable}
      forcePopupIcon={false}
      freeSolo={userInput}
      autoSelect={userInput}
      blurOnSelect
      classes="listBox"
      noOptionsText={noOptionsText ? noOptionsText : "Not found"}
      inputValue={inputValue}
      open={open}
      filterOptions={filterOptions}
    />
  );
});

export default CustomAutocomplete;
