
import Router from 'next/router'
import Layout from "../components/Layout";
import Button from "@mui/material/Button";
import Styles from "./pages.module.css";
import MapService from "../services/MapService";

const IndexPage = () => {
  const generateMap = async () => {
    console.log('Generate maps');
    // get value from input
    // pass as params
    const data = await MapService.generateMap('');
    console.log(data);
    // redirect to the loading page
    Router.push(`/maps/${data.mapId}/status`);
  };

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
              <input
                className={`${Styles.homepage__right_form_input} placeholder-blue-400`}
                type="text"
                id="source"
                name="source"
                placeholder="Fire data source"
                required
              />
            </div>
            <div className={Styles.homepage__right_form_group}>
              <div className={Styles.homepage__right_form_label}>
                <label htmlFor="location">Location:</label>
              </div>
              <input
                className={`${Styles.homepage__right_form_input} placeholder-blue-400`}
                type="text"
                id="location"
                name="location"
                placeholder="Search for map location"
                required
              />
            </div>
            <div className={Styles.homepage__right_form_group}>
              <div className={Styles.homepage__right_form_label}>
                <label htmlFor="date">Date:</label>
              </div>
              <div className={Styles.homepage__right_form_input}>
                <input
                  className={Styles.homepage__right_form_input_date}
                  type="date"
                />
                <span className={Styles.homepage__right_form_input_separator}>
                  to
                </span>
                <input
                  className={Styles.homepage__right_form_input_date}
                  type="date"
                />
              </div>
            </div>
          </div>
          <div className={Styles.homepage__right_button}>
          <Button className={Styles.homepage__right_button_generate} variant="contained" onClick={generateMap}>Generate a map</Button>
          <Button className={Styles.homepage__right_button_clear} variant="contained">Clear</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
