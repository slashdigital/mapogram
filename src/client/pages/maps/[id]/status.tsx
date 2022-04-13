
import LinearProgress from '@mui/material/LinearProgress';

import Layout from "../../../components/Layout";
import MapModel from "../../../../shared/models/map.model";
import GenerationProgress from '../../../components/maps/GenerationProgress';
import GenerationFailed from '../../../components/maps/GenerationFailed';
import GenerationSuccess from '../../../components/maps/GenerationSuccess';
import MapService from '../../../services/MapService';
import { GetStaticProps } from 'next';

type Props = {
  map: MapModel,
  items: []
};

const MapGenerationStatusPage = (props: Props) => {
  const { map = { mapId: "", staticMapUrl: "", status: 0 } } = props;
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Map Generating - Id: {map.mapId }</h1>
      <p>
        Please wait while map is generating
      </p>
      { map.status == 2 && <GenerationProgress mapId={map.mapId} /> }
      { map.status == 0 && <GenerationFailed /> }
      { map.status == 3 && <GenerationSuccess /> }
      
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/maps/first-id/status',
      // Object variant:
      { params: { id: 'second-id' } },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const map: MapModel = await MapService.getMapById('1');
  console.log(map);
  return { props: { map } }
}

export default MapGenerationStatusPage;
