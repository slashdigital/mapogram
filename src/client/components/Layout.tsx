import React, { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

import Container from '@mui/material/Container';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { MainButton } from '../themes/button';
import Logo from '../assets/logo.png';
import styles from './Layout.module.css';

import theme from '../themes/theme';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Mapogram' }: Props) => (
  <ThemeProvider theme={theme}>
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <header>
        <Box className={styles.header}>
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Link href="/">
                  <Image
                    src={Logo}
                    alt="mapogram logo"
                    className={styles.header__left_image}
                  />
                </Link>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  display: 'flex',
                  textAlign: 'right',
                }}
              >
                <Link href="/about">
                  <MainButton variant="outlined">About Us</MainButton>
                </Link>
                <Link href="/maps" as="/maps">
                  <MainButton color="primary" sx={{ ml: 2 }}>
                    Visit Map Gallery{' '}
                    <ArrowForwardIosOutlinedIcon fontSize="small" />
                  </MainButton>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </header>
      {children}
      <footer className={styles.footer}>
        <hr className={styles.footer__line} />
        <Box className={styles.header}>
          <Container maxWidth="lg" sx={{ display: 'flex' }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <span className={styles.footer__text}>
                  Mapogram 2022. Supported Slash.co and Sponsored by ADPC Grant
                </span>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </footer>
    </div>
  </ThemeProvider>
);

export default Layout;
