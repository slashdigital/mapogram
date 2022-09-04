import { withRouter, NextRouter } from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Image from 'next/image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import Layout from '../../components/Layout';
import MapService, { MapModel } from '../../services/MapService';
import Ribbon from '../../components/Ribbon';

import Placeholder from '../../assets/placeholder.jpeg';
import { Typography } from '@mui/material';

dayjs.extend(utc);

const MAP_LIMIT = 10;
interface WithRouterProps {
  router: NextRouter;
}

interface MapListPageProps extends WithRouterProps {
  maps: [MapModel];
  items: [];
}

const MapListPage = (props: MapListPageProps) => {
  const { maps = [] } = props;
  const getDate = item => {
    return dayjs.utc(item.createdAt).local().format('YYYY/MM/DD HH:mm');
  };

  return (
    <Layout title="Map List | Mapogram">
      <Ribbon />
      <Container sx={{ mt: 5, mb: 5, width: '100%' }} maxWidth="lg">
        <Typography variant="h4">Map Gallery</Typography>
        <Typography variant="caption">
          All the recent {MAP_LIMIT} generated map are being shown here.
        </Typography>
        <ImageList sx={{ mt: 5 }} cols={3} gap={45}>
          {maps.map(item => (
            <ImageListItem key={item.id} sx={{ overflow: 'hidden', width: '100%' }}>
              <Image
                src={`maps/sizes/small${item.outputPath}`}
                alt={item.title}
                onError={error => {
                  console.log(error.currentTarget);
                  const { currentTarget } = error;
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = Placeholder.src;
                  currentTarget.srcset = Placeholder.src;
                }}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  whiteSpace: 'wordwrap'
                }}
                title={item.title}
                subtitle={<span>Date: {getDate(item)}</span>}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps() {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const maps: MapModel[] = await MapService.getMapGallery(MAP_LIMIT);
  return { props: { maps } };
}

export default withRouter(MapListPage);
