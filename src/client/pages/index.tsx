

import React, { useState } from 'react'
import { withRouter, NextRouter, Router } from 'next/router'
import Layout from "../components/Layout";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Styles from "./pages.module.css";
import MapService from "../services/MapService";
import PlaceAutocomplete from "../components/forms/PlaceAutocomplete";
interface WithRouterProps {
  router: NextRouter
}

interface IndexPageProps extends WithRouterProps {}

const IndexPage = (props: IndexPageProps) => {

  const [dataSource, setDataSource] = useState('fire-template');
  const [zoomLevel, setZoomLevel] = useState('default');
  const [location, setLocation] = useState(null);
  // const [dataSource, setDataSource] = useState('');
  const generateMap = async () => {
    console.log('Generate maps');
    // get value from input
    // pass as params
    const data = await MapService.generateMap('');
    console.log(data);
    // redirect to the loading page
    props.router.push(`/maps/${data.mapId}/status`);
  };

  React.useEffect(() => {
    console.log(location);
  });

  return (
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
          <p>Generate me a map over of:</p>
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
                  onChange={e => setDataSource(e.target.value)}
                >
                  {
                    [{value: 'fire-template', label: 'Fire Data Source'}].map((item) => (
                      <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))
                  }
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
                      color: "contrast" 
                    }}
                    color="contrast"
                    onChange={e => setZoomLevel(e.target.value)}
                  >
                    <MenuItem value={'default'}>Default</MenuItem>
                  </TextField>
                </FormControl>
            </div>

            <div className={Styles.homepage__right_form_group}>
              <div className={Styles.homepage__right_form_label}>
                <label htmlFor="location">Location:</label>
              </div>
              <PlaceAutocomplete onChange={value => setLocation(value)}/>
            </div>
          </div>
          <div className={Styles.homepage__right_button}>
          <Button sx={{height: '50px'}} variant="contained" onClick={generateMap}>Generate a map</Button>
          <Button sx={{height: '50px', ml: 2}} color="contrast" variant="outlined">Clear</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(IndexPage);