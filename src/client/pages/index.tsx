import React, { useState } from "react";
import { withRouter, NextRouter, Router } from "next/router";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Styles from "./pages.module.css";
import Layout from "../components/Layout";
import MapTypeModel from "../models/MapType";
import MapService from "../services/MapService";
import PlaceAutocomplete from "../components/forms/PlaceAutocomplete";
import ButtonWithCaptcha from "../components/forms/ButtonWithCaptcha";
import { RECAPTCHA_SITE_KEY } from "../utils/constant";

interface WithRouterProps {
  router: NextRouter;
}

interface IndexPageProps extends WithRouterProps {
  mapTypes: MapTypeModel[];
}

const IndexPage = (props: IndexPageProps) => {
  const [dataSource, setDataSource] = useState("");
  const [zoomLevel, setZoomLevel] = useState("default");
  const [address, setAddress] = useState("");
  // const [dataSource, setDataSource] = useState('');
  const generateMap = async (token) => {
    console.log("Generate maps",  {
      layout: dataSource,
      zoom: zoomLevel,
      address:address,
      token: token,
    });
    // get value from input
    // pass as params
    const data = await MapService.generateMap("", {
      layout: dataSource,
      zoom: zoomLevel,
      address: address,
      token: token,
    });
    console.log(data);
    if (!data.error && data.data && data.data.id) {
      // redirect to the loading page
      props.router.push(`/maps/${data.data.id}/status`);
    } else {
      props.router.push(`/maps/${data.data.id}/error`);
    }
  };

  console.log(props.mapTypes);

  React.useEffect(() => {
    if (props.mapTypes.length && dataSource == "") {
      setDataSource(props.mapTypes[0].layout.toString());
    }
    console.log('effect', address, dataSource);
  });

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <Layout title="Mapogram">
        <div className={Styles.homepage}>
          <div className={Styles.homepage__left}>
            <p>
              Mapogram is a platform powered by <b>Cloud-based QGIS</b> and{" "}
              <b>PowerAutomate</b> to provide map generation service for the map
              they needed to deal with natural disaster like Forest fire, Flood
              event etc...
            </p>
          </div>
          <div className={Styles.homepage__vertical_line} />
          <div className={Styles.homepage__right}>
            <p>Generate me a map over of {address} :</p>
            <div className={Styles.homepage__right_form}>
              <div className={Styles.homepage__right_form_group}>
                <div className={Styles.homepage__right_form_label}>
                  <label htmlFor="source">Source:</label>
                </div>
                <FormControl fullWidth>
                  <TextField
                    select
                    id="form-data-source"
                    label="Data Source"
                    value={dataSource}
                    color="contrast"
                    onChange={(e) => setDataSource(e.target.value)}
                  >
                    {props.mapTypes.map((item, index) => (
                      <MenuItem key={index} value={item.layout.toString()}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </div>

              <div className={Styles.homepage__right_form_group}>
                <div className={Styles.homepage__right_form_label}>
                  <label htmlFor="source">Zoom:</label>
                </div>

                <FormControl fullWidth>
                  <TextField
                    select
                    id="form-zoom-level"
                    value={zoomLevel}
                    label="Zoom Level"
                    inputProps={{
                      color: "contrast",
                    }}
                    color="contrast"
                    onChange={(e) => setZoomLevel(e.target.value)}
                  >
                    <MenuItem value={"default"}>Default</MenuItem>
                  </TextField>
                </FormControl>
              </div>

              <div className={Styles.homepage__right_form_group}>
                <div className={Styles.homepage__right_form_label}>
                  <label htmlFor="location">Location:</label>
                </div>
                <PlaceAutocomplete onChange={(value) => {
                  console.log('Set location', value);
                  if (value != null) {
                    setAddress(value.description);
                  }
                }} />
              </div>
            </div>
            <div className={Styles.homepage__right_button}>
              <ButtonWithCaptcha
                label="Generate map"
                onClick={(token) => generateMap(token)}
              />
              <Button
                sx={{ height: "50px", ml: 2 }}
                color="contrast"
                variant="outlined"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </GoogleReCaptchaProvider>)
 ;
};

export async function getServerSideProps() {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const mapTypes: MapTypeModel[] = await MapService.getMapTypes();
  return { props: { mapTypes } };
}

export default withRouter(IndexPage);
