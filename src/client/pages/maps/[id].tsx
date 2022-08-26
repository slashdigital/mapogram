import { withRouter, NextRouter } from 'next/router';
import Layout from '../../components/Layout';
import Container from '@mui/material/Container';
import MapService, { MapModel } from '../../services/MapService';
import Ribbon from '../../components/Ribbon';
import CardMap from '../../components/maps/CardMap';

interface WithRouterProps {
  router: NextRouter;
}

interface MapPageProps extends WithRouterProps {
  map: MapModel;
  items: [];
}

const MapGenerationPage = (props: MapPageProps) => {
  const { map } = props;
  return (
    <Layout title={`${map.title} - Mapogram`}>
      <Ribbon />
      <Container sx={{ mt: 10, mb: 10 }} maxWidth="sm">
        <CardMap map={map} />
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  const id = context.params.id;
  const map: MapModel = await MapService.getMapById(id);
  return { props: { map } };
}

export default withRouter(MapGenerationPage);
