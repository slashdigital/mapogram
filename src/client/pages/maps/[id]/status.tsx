import React from "react";
import { withRouter, NextRouter, Router } from "next/router";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Layout from "../../../components/Layout";
import { MapModel } from "../../../services/MapService";
import MapService from "../../../services/MapService";
import GenerationProgress from "../../../components/maps/GenerationProgress";
import GenerationFailed from "../../../components/maps/GenerationFailed";
import GenerationSuccess from "../../../components/maps/GenerationSuccess";
import Ribbon from "../../../components/Ribbon";

import Styles from "./status.module.css";

interface WithRouterProps {
  router: NextRouter;
}

interface MapStatusPageProps extends WithRouterProps {
  map: MapModel;
  items: [];
}

const MapGenerationStatusPage = (props: MapStatusPageProps) => {
  const { map } = props;
  const [timeWaited, setTimeWaited] = React.useState(0);
  let delay = 7000;
  let timeout = null;

  const queryMap = () => {
    if (timeout) {
      clearInterval(timeout);
    }
    timeout = setInterval(() => {
      // More than 20min
      if (timeWaited > 20 * 60 * 100) {
        clearInterval(timeout);
        props.router.push(`/maps/${map.id}/error`);
      }
      MapService.getMapById(map.id.toString(), "/")
        .then((result) => {
          if (result.status == "failed") {
            clearInterval(timeout);
            props.router.push(`/maps/${map.id}/error`);
          } else if (result.status == "success") {
            clearInterval(timeout);
            props.router.push(`/maps/${map.id}`);
          } else {
            setTimeWaited(timeWaited + delay);
          }
        })
        .catch((e) => {
          // delay = delay * 2;
          setTimeWaited(timeWaited + delay);
        });
    }, delay);
  };

  React.useEffect(() => {
    if (map.status == "pending") {
      queryMap();
    }
  }, [map]);

  return (
    <Layout title="Generating Map | Mapogram">
      <Ribbon />

      <Box className={Styles.status_page}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ alignItems: "center", display: "flex" }}>
              <Container maxWidth="lg">
                {map.status == "pending" && (
                  <GenerationProgress
                    mapId={map.sessionId}
                    router={props.router}
                  />
                )}
                {map.status == "failed" && <GenerationFailed id={map.sessionId}/>}
                {map.status == "success" && <GenerationSuccess />}
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: false,
//   };
// }

export async function getServerSideProps(context) {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const id = context.params.id;
  const map: MapModel = await MapService.getMapById(id);
  console.log(map);
  return { props: { map } };
}

export default withRouter(MapGenerationStatusPage);
