import * as React from 'react';
import Link from 'next/link';

import { WhiteMainButton } from '../themes/button';
import Styles from './Ribbon.module.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Ribbon = () => {
  return (
    <Box className={Styles.Ribbon}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography variant="body2">
              Mapogram is a platform powered by <b>Cloud-based QGIS</b> on Azure VM to provide map
              generation service for the map they needed to deal with natural disaster like Forest
              fire, Flood event etc...
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              display: 'flex',
              textAlign: 'right'
            }}
          >
            <Link href="/">
              <WhiteMainButton>Generate more</WhiteMainButton>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Ribbon;
