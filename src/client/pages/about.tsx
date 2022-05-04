import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => (
  <Layout title="About | Mapogram">
    <Container sx={{ mt: 5, mb: 5, width: "100%", height: '400px' }} maxWidth="lg">

    <Typography variant='h4'>About Mapogram</Typography>
        <Typography variant='body2'>  Mapogram is a platform powered by <b>Cloud-based QGIS</b> and 
              <b> PowerAutomate</b> to provide map generation service for the map
              they needed to deal with natural disaster like Forest fire, Flood
              event etc...</Typography>
    </Container>
  </Layout>
);

export default AboutPage;
