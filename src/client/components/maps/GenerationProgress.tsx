import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import LinearProgress from "@mui/material/LinearProgress";
import Styles from "./GenerationProgress.module.css";
import { Typography } from "@mui/material";

type Props = {
  mapId: String;
  router: NextRouter;
};
const GenerationProgress = (props: Props) => {
  return (
    <div>
      <div className={Styles.GenerationProgress}>
        <Typography variant="h5" sx={{ color: "grey" }}>
          <span className={Styles.GenerationProgress_header}>
            Hold on tight, we are generating the map for you....
          </span>
        </Typography>

        <Typography variant="body1" sx={{ color: "grey" }}>
          <span className={Styles.GenerationProgress_subheader}>
            Please wait
          </span>
        </Typography>

        <Typography variant="caption">Request ID: {props.mapId}</Typography>
        <LinearProgress />
        <div className={Styles.GenerationProgress_refresh}>
          <Typography variant="caption">
            Refresh if you don’t see progress
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default GenerationProgress;
