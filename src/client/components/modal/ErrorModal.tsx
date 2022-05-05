import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";

type PropType = {
  open: boolean,
  title: String,
  description: String,
  onClose: Function
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ErrorModal(props: PropType)  {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(props.open);
  }, [props])

  const handleClose = () => {
    setIsOpen(false);
    props.onClose();
  }

  return (<Modal
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {props.title}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {props.description}
      </Typography>
    </Box>
  </Modal>);
};