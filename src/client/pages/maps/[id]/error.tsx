

import { withRouter, NextRouter, Router } from 'next/router'

import Layout from "../../../components/Layout";
import GenerationFailed from "../../../components/maps/GenerationFailed"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Ribbon from '../../../components/Ribbon';

import { MapModel } from "../../../services/MapService";
import MapService from "../../../services/MapService";

import Styles from "./status.module.css";

interface WithRouterProps {
  router: NextRouter
}

interface MapStatusPageProps extends WithRouterProps {

  map: MapModel;
  
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
                <GenerationFailed id={props.map.sessionId} />
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
    </Layout>
  );
};


export async function getServerSideProps(context) {
  
  const id = context.params.id;
  const map: MapModel = await MapService.getMapById(id);
  return { props: { map } };
}

export default withRouter(MapGenerationErrorPage);
