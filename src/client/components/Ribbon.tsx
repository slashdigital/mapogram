import * as React from 'react';
import Link from 'next/link';
import Styles from "./Ribbon.module.css";

const Ribbon = () => {
  return <div className={Styles.Ribbon}>
    <div className={Styles.Ribbon_left}>
      <p>Mapogram is a platform powered by <b>Cloud-based QGIS</b> and <b>PowerAutomate</b> to provide map generation service for the map they needed to deal with natural disaster like Forest fire, Flood event etc...</p>
    </div>
    <div className={Styles.Ribbon_right}>
        <Link href="/">
          <button className={Styles.Ribbon_right_button}>Generate more</button>
        </Link>
    </div>
  </div>
};

export default Ribbon;