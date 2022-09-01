import getConfig from 'next/config';

export const { GOOGLE_MAP_API_KEY, RECAPTCHA_SITE_KEY } =
  getConfig().publicRuntimeConfig;
