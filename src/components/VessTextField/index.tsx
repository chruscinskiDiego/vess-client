import React from 'react';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export type VessTextFieldProps = TextFieldProps;

export const VessTextField: React.FC<VessTextFieldProps> = ({ sx, ...props }) => (
  <TextField
    {...props}
    variant="filled"
    size="small"
    fullWidth
    sx={{
      background: 'linear-gradient(180deg, #f2e2b3 0%,rgb(255, 223, 163) 100%)',
      borderRadius: 1,
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'black',
      },
      '& .MuiFilledInput-underline:before': {
        borderBottomColor: 'rgba(0,0,0,0.23)',
      },
      '& .MuiFilledInput-underline:after': {
        borderBottomColor: 'black',
      },
      ...sx,
    }}
  />
);