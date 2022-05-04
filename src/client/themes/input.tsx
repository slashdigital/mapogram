

import { makeStyles } from "@mui/styles";


export const useInputWhiteStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(255, 255, 255)",
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px'
    }
  }
}));