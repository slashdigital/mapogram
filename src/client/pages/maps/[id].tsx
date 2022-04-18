import Layout from "../../components/Layout";
import MapModel from "../../../shared/models/map.model";
import MapService from "../../services/MapService";
import { GetStaticProps } from "next";

type Props = {
  map: MapModel;
  items: [];
};

const MapGenerationPage = (props: Props) => {
  const { map = { mapId: "", staticMapUrl: "" } } = props;
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Map Generating - Id: {map.mapId}</h1>
      <p>Getting the map final output :-)</p>
      <p>You are currently on: /users</p>
      <img src={`${map.staticMapUrl}`} />
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
  const map: MapModel = await MapService.getMapById("1");
  console.log(map, "dfdf");
  return { props: { map } };
};

// MapGenerationPage.getInitialProps = async (ctx) => {
//  console.log(ctx);
//   return { map: {}}
// }

export default MapGenerationPage;
