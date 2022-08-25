import * as React from 'react';
import Styles from './GenerationSuccess.module.css';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { green } from '@mui/material/colors';

const GenerationSuccess = () => {
  // TODO: set timeout to redirect to map details
  // TODO: update content of the map success
  return <div>
    <div className={Styles.GenerationSuccess}>
      <p className={Styles.GenerationSuccess_header}><CheckCircleOutlinedIcon sx={{ fontSize: 50, color: green[700] }} />Thanks for waiting, the map is generated successfully</p>
      <p className={Styles.GenerationSuccess_req_id}>Request ID: xh3481f</p>
    </div>
  </div>;
};

export default GenerationSuccess;
