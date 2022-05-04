import React, { useState } from "react";
import { withRouter, NextRouter, Router } from "next/router";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Styles from "./pages.module.css";
import Layout from "../components/Layout";
import MapTypeModel from "../models/MapType";
import MapService from "../services/MapService";
import PlaceAutocomplete from "../components/forms/PlaceAutocomplete";
import ButtonWithCaptcha from "../components/forms/ButtonWithCaptcha";
import { RECAPTCHA_SITE_KEY } from "../utils/constant";

import { useInputWhiteStyles } from "../themes/input";
import { Typography } from "@mui/material";
import ErrorModal from "../components/modal/ErrorModal";

interface WithRouterProps {
  router: NextRouter;
}

interface IndexPageProps extends WithRouterProps {
  mapTypes: MapTypeModel[];
}

const IndexPage = (props: IndexPageProps) => {
  const [hasError, setHasError] = useState(false);
  const [dataSource, setDataSource] = useState("");
  const [zoomLevel, setZoomLevel] = useState("default");
  const [address, setAddress] = useState("");

  const validate = (token) => {
    const valid = !!dataSource && !!zoomLevel && !!address && !!token;
    if (!valid) {
      setHasError(true);
    }
    return valid;
  };

  const generateMap = async (token) => {
    const isValid = validate(token);
    if (!isValid) {
      return false;
    }
    // get value from input
    // pass as params
    const data = await MapService.generateMap("", {
      layout: dataSource,
      zoom: zoomLevel,
      address: address,
      token: token,
    });
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
  });

  const classes = useInputWhiteStyles();

  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <Layout title="Mapogram">
        <div className={Styles.homepage}>
          <div className={Styles.homepage__left}>
            <Typography variant="h6" sx={{ lineHeight: "2", fontWeight: 'normal' }}>
              Mapogram is a platform powered by <b>Cloud-based QGIS</b> and 
              <b> PowerAutomate</b> to provide map generation service for the map
              they needed to deal with natural disaster like Forest fire, Flood
              event etc...
            </Typography>
          </div>
          <div className={Styles.homepage__vertical_line} />
          <div className={Styles.homepage__right}>
            <Typography variant="body1">
              I would like to generate a map of:{" "}
            </Typography>
            <Typography variant="caption">{address}</Typography>
            <div className={Styles.homepage__right_form}>
              <div className={Styles.homepage__right_form_group}>
                <div className={Styles.homepage__right_form_label}>
                  <Typography variant="body1">Source:</Typography>
                </div>
                <FormControl fullWidth>
                  <TextField
                    select
                    variant="filled"
                    className={classes.root}
                    id="form-data-source"
                    label="Data Source"
                    value={dataSource}
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
                  <Typography variant="body1">Zoom:</Typography>
                </div>

                <FormControl fullWidth>
                  <TextField
                    select
                    variant="filled"
                    className={classes.root}
                    id="form-zoom-level"
                    value={zoomLevel}
                    label="Zoom Level"
                    inputProps={{
                      color: "contrast",
                    }}
                    onChange={(e) => setZoomLevel(e.target.value)}
                  >
                    <MenuItem value={"default"}>Default</MenuItem>
                  </TextField>
                </FormControl>
              </div>

              <div className={Styles.homepage__right_form_group}>
                <div className={Styles.homepage__right_form_label}>
                  <Typography variant="body1">Location:</Typography>
                </div>
                <PlaceAutocomplete
                  onChange={(value) => {
                    console.log("Set location", value);
                    if (value != null) {
                      setAddress(value.description);
                    }
                  }}
                />
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
        <ErrorModal
          open={hasError}
          onClose={() => setHasError(false)}
          title="Error Generating Map"
          description="There was a request or validation error. Please, check all the field properly."
        />
      </Layout>
    </GoogleReCaptchaProvider>
  );
};

export async function getServerSideProps() {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const mapTypes: MapTypeModel[] = await MapService.getMapTypes();
  return { props: { mapTypes } };
}

export default withRouter(IndexPage);
