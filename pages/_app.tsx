import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CssBaseline } from '@material-ui/core';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
