import React from "react";
import { withRouter, NextRouter, Router } from "next/router";

import Layout from "../../../components/Layout";
import { MapModel } from "../../../services/MapService";
import GenerationProgress from "../../../components/maps/GenerationProgress";
import GenerationFailed from "../../../components/maps/GenerationFailed";
import GenerationSuccess from "../../../components/maps/GenerationSuccess";
import Ribbon from "../../../components/Ribbon";
import MapService from "../../../services/MapService";
import { GetStaticProps } from "next";

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
      // More than 1 hours
      if (timeWaited > 1 * 60 * 60 * 100) {
        clearInterval(timeout);
        props.router.push(`/maps/${map.id}/error`);
      }
      MapService.getMapById(map.id.toString(), "/")
        .then((result) => {
          if (result.status != "success") {
            setTimeWaited(timeWaited + delay);
          } else {
            clearInterval(timeout);
            props.router.push(`/maps/${map.id}`);
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
    <Layout title="Users List | Next.js + TypeScript Example">
      <Ribbon />
      {map.status == "pending" && (
        <GenerationProgress mapId={map.sessionId} router={props.router} />
      )}
      {map.status == "failed" && <GenerationFailed />}
      {map.status == "success" && <GenerationSuccess />}
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
