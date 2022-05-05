

import { withRouter, NextRouter, Router } from 'next/router'

import Layout from "../../../components/Layout";
import GenerationFailed from "../../../components/maps/GenerationFailed"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Ribbon from '../../../components/Ribbon';

import Styles from "./status.module.css";

interface WithRouterProps {
  router: NextRouter
}

interface MapStatusPageProps extends WithRouterProps {

}

const MapGenerationErrorPage = (props: MapStatusPageProps) => {
  return (
    <Layout title="Map Generating Error">
      

      <Ribbon />

      <Box className={Styles.status_page}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ alignItems: "center", display: "flex" }}>
              <Container maxWidth="lg">
                <GenerationFailed />
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
    </Layout>
  );
};


export async function getServerSideProps() {
  return { props: {  } }
}

export default withRouter(MapGenerationErrorPage);
