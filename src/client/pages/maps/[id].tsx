import { withRouter, NextRouter, Router } from 'next/router'
import Layout from "../../components/Layout";
import { MapModel } from "../../services/MapService";
import MapService from "../../services/MapService";
import Ribbon from '../../components/Ribbon';

interface WithRouterProps {
  router: NextRouter
}

interface MapPageProps extends WithRouterProps {

  map: MapModel,
  items: []
}

const MapGenerationPage = (props: MapPageProps) => {
  const { map } = props;
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <Ribbon />
      <h1>Map Generating - Id: {map.sessionId}</h1>
      <p>Getting the map final output :-)</p>
      <p>You are currently on: /users</p>
      <img src={`${map.outputPath }`} />
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
  console.log(map, "dfdf");
  return { props: { map } };
};

// MapGenerationPage.getInitialProps = async (ctx) => {
//  console.log(ctx);
//   return { map: {}}
// }

export default withRouter(MapGenerationPage);
