import * as React from 'react';
import { NextRouter, useRouter } from 'next/router'
import LinearProgress from '@mui/material/LinearProgress';
import Styles from './GenerationProgress.module.css';


type Props = {
  mapId: String,
  router: NextRouter
};
const GenerationProgress = (props: Props) => {
    setTimeout(() => {

      props.router.push(`/maps/${props.mapId}`);
    }, 2000);
  return <div>
      <div className={Styles.GenerationProgress}>
        <p className={Styles.GenerationProgress_header}>Hold on tight, we are generating the map for you....</p>
        <p className={Styles.GenerationProgress_subheader}>Please wait</p>
        <p className={Styles.GenerationProgress_req_id}>Request ID: xh3481f</p>
        <LinearProgress />
        <div className={Styles.GenerationProgress_refresh}>
          <button>Refresh if you don’t see progress</button>
        </div>
      </div>
    </div>;
};



export default GenerationProgress
