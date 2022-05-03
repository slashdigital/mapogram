import { withRouter, NextRouter, Router } from 'next/router'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import Layout from "../../components/Layout";
import { MapModel } from "../../services/MapService";
import { GetStaticProps } from "next";
import MapService from "../../services/MapService";
import Ribbon from '../../components/Ribbon';


import Placeholder from '../../assets/placeholder.jpeg'

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
      <Container>
        <ImageList sx={{ width: '100%', height: '100%' }} variant="masonry" cols={3} gap={5}>
          {maps.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={item.outputPath}
                srcSet={item.outputPath}
                alt={item.title}
                onError={(error) => {
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
                    background:
                      'grey',
                    whiteSpace: 'wordwrap'
                  }}
                title={item.title}
                subtitle={<span>#: {item.sessionId}</span>}
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
  const maps: MapModel[] = await MapService.getMapGallery();
  console.log(maps);
  return { props: { maps } }
}

export default withRouter(MapListPage);
