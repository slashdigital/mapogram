import { withRouter, NextRouter, Router } from 'next/router'
import Layout from "../../components/Layout";
import { MapModel } from "../../services/MapService";
import { GetStaticProps } from "next";
import MapService from "../../services/MapService";
import Ribbon from '../../components/Ribbon';

interface WithRouterProps {
  router: NextRouter
}

interface MapListPageProps extends WithRouterProps {

  maps: [MapModel],
  items: []
}

const MapListPage = (props: MapListPageProps) => {

  const { maps = [] } = props;
  return (
    <Layout title="Map List | Mapogram">
      <Ribbon />
      <h1>Map Listing:</h1>
      <p>You are currently on: Map List</p>
      <ul>
      {maps.map((map) => (
      <li key={`${map.sessionId}`}>
        <div> Map Id {map.sessionId }</div>
      <img width={300} src={`${map.outputPath}`} />
      </li>
    ))}
    </ul>
    </Layout>
  );
};

export async function getServerSideProps() {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const maps: MapModel[] = await MapService.getMapGallery();
  return { props: { maps } }
}

export default withRouter(MapListPage);
