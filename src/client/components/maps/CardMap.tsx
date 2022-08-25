import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { MapModel } from '../../services/MapService';

dayjs.extend(utc);

type PropType = {
  map: MapModel;
};

export default function CardMap(props: PropType) {
  const { map } = props;

  const getDate = item => {
    return dayjs.utc(item.createdAt).local().format('YYYY/MM/DD HH:mm');
  };

  return (
    <Card sx={{ maxWidth: 1000 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={map.title}
        subheader={getDate(map)}
      />
      <CardMedia
        component="img"
        height="194"
        image={`/maps/sizes/preview${map.outputPath}`}
        alt={map.title.toString()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {map.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
