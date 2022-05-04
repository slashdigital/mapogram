
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

export const WhiteMainButton = styled(Button)<ButtonProps>(({ theme }) => ({
 
  backgroundColor: '#2697d7',
  borderColor: '#2697d7',
  border: '1px solid',
  color: 'white',
  '&:hover': {
    backgroundColor: '#2697d7',
    borderColor: '#fff',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#2697d7',
    borderColor: '#fff',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
}));

export const MainButton = styled(Button)({
  border: '1px solid',
  color: '#55b4ea',
  borderColor: '#55b4ea',
  '&:hover': {
    backgroundColor: '#3da6e2',
    borderColor: '#2697d7',
    color: '#fff',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#3da6e2',color: '#fff',
    borderColor: '#2697d7',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});