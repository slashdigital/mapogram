import * as React from 'react';
import Router from 'next/router'
import LinearProgress from '@mui/material/LinearProgress';


type Props = {
  mapId: String,
};
const GenerationProgress = (props: Props) => {
  setTimeout(() => {

    Router.push(`/maps/${props.mapId}`);
  }, 2000);
  // TODO: update content of the map progress
  return <div>
      <h4>Will redirecting in 2s</h4>
      <LinearProgress />
    </div>;
};



export default GenerationProgress
