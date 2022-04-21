

import { withRouter, NextRouter, Router } from 'next/router'

import Layout from "../../../components/Layout";
import MapModel from "../../../../shared/models/map.model";
import GenerationProgress from '../../../components/maps/GenerationProgress';
import GenerationFailed from '../../../components/maps/GenerationFailed';
import GenerationSuccess from '../../../components/maps/GenerationSuccess';
import Ribbon from '../../../components/Ribbon';
import MapService from '../../../services/MapService';
import { GetStaticProps } from 'next';


interface WithRouterProps {
  router: NextRouter
}

interface MapStatusPageProps extends WithRouterProps {

  map: MapModel,
  items: []
}

const MapGenerationStatusPage = (props: MapStatusPageProps) => {
  const { map = { mapId: "", staticMapUrl: "", status: 0 } } = props;
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <Ribbon />
      { map.status == 2 && <GenerationProgress mapId={map.mapId} router={props.router} /> }
      { map.status == 0 && <GenerationFailed /> }
      { map.status == 3 && <GenerationSuccess /> }
      
    </Layout>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: false,
//   };
// }

export async function getServerSideProps() {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const map: MapModel = await MapService.getMapById('1');
  console.log(map);
  return { props: { map } }
}

export default withRouter(MapGenerationStatusPage);
