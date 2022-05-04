import * as React from "react";
import Link from "next/link";

import { WhiteMainButton } from "../themes/button";
import Styles from "./Ribbon.module.css";
import { Typography } from "@mui/material";

const Ribbon = () => {
  return (
    <div className={Styles.Ribbon}>
      <div className={Styles.Ribbon_left}>
        <Typography variant="body2">
          Mapogram is a platform powered by <b>Cloud-based QGIS</b> and{" "}
          <b>PowerAutomate</b> to provide map generation service for the map
          they needed to deal with natural disaster like Forest fire, Flood
          event etc...
        </Typography>
      </div>
      <div className={Styles.Ribbon_right}>
        <Link href="/">
          <WhiteMainButton>Generate more</WhiteMainButton>
        </Link>
      </div>
    </div>
  );
};

export default Ribbon;
