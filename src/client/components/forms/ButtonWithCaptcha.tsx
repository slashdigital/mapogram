import React from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { WhiteMainButton } from '../../themes/button';

type Props = {
  label: string;
  onClick: (token: string) => void;
};

export default function ButtonWithCaptcha(props: Props) {
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

  return (
    <WhiteMainButton
      sx={{ height: '50px' }}
      disableElevation
      variant="contained"
      color="contrast"
      onClick={handleReCaptchaVerify}
    >
      {props.label}
    </WhiteMainButton>
  );
}
