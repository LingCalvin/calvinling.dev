import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from '../theme';
import useRemoveServerSideCSS from '../hooks/use-remove-server-side-css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function MyApp({ Component, pageProps }: AppProps) {
  useRemoveServerSideCSS();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
export default MyApp;
