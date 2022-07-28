const { RECAPTCHA_SECRET_KEY } = process.env;

export const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';

    const formData = new URLSearchParams();
    formData.append('secret', RECAPTCHA_SECRET_KEY);
    formData.append('response', token.toString());
    console.log(formData.toString());
    const res = await fetch(recaptchaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });
    const data = await res.json();
    console.log('recaptcha verification:', data);
    return data.success;
  } catch (e) {
    console.log('recaptcha verification failed:', e);
    return false;
  }
};
