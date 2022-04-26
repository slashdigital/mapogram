import * as React from 'react';
import Styles from './GenerationFailed.module.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { red } from '@mui/material/colors';


const GenerationFailed = () => {
  // TODO: update content of the map success
  return <div>
    <div className={Styles.GenerationFailed}>
      <p className={Styles.GenerationFailed_header}><CancelOutlinedIcon sx={{ fontSize: 50, color: red[900] }}/> Sorry, there is a problem in generating the maps</p>
      <p className={Styles.GenerationFailed_req_id}>Request ID: xh3481f</p>
    </div>
  </div>;
};

export default GenerationFailed;
