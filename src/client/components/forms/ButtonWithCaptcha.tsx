import React from 'react';
import Button from "@mui/material/Button";
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { RECAPTCHA_SITE_KEY } from '../../utils/constant';

type Props = {
  label: String,
  onClick: (token: String) => void
}

export default function ButtonWithCaptcha (props: Props) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = React.useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('generateMap');
    // Do whatever you want with the token
    props.onClick(token);
  }, [executeRecaptcha, props]);
  
  return <Button type='button' sx={{height: '50px'}} variant="contained" onClick={handleReCaptchaVerify}>{props.label}</Button>;

}
