import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => (
  <Layout title="About | Mapogram">
    <Container
      sx={{ mt: 5, mb: 5, width: "100%", height: "400px" }}
      maxWidth="lg"
    >
      <Typography sx={{ mt: 3, mb: 2 }} variant="h4">
        About Mapogram
      </Typography>
      <Typography variant="body1">
        {" "}
        Mapogram is a platform powered by <b>Cloud-based QGIS</b> on Azure VM to
        provide map generation service for the map they needed to deal with
        natural disaster like Forest fire, Flood event etc...
      </Typography>
      <Typography sx={{ mt: 3, mb: 2 }} variant="h5">
        References:
      </Typography>
      <Typography variant="body1">We are using data from:</Typography>

      <br />
      <ul>
        <li>
          FIRMS Active Data Disaster:{" "}
          <Link href="https://firms.modaps.eosdis.nasa.gov/active_fire/">
            https://firms.modaps.eosdis.nasa.gov/active_fire/
          </Link>
        </li>
      </ul>
      <br />
      <Typography variant="body1">GIS Tools:</Typography>

      <br />
      <ul>
        <li>
          QGIS version 3.24:{" "}
          <Link href="https://docs.qgis.org/testing/en/docs/index.html">
            https://docs.qgis.org/testing/en/docs/index.html
          </Link>
        </li>
        <li>
          OSGeo4W:{" "}
          <Link href="https://www.osgeo.org/">https://www.osgeo.org/</Link>
        </li>
      </ul>
    </Container>
  </Layout>
);

export default AboutPage;
