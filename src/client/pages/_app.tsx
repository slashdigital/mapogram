import React from 'react'
import { createTheme } from '@mui/material/styles';

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp