import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UIDReset } from 'react-uid';
import theme from '../features/common/constants/theme';
import useRemoveServerSideCSS from '../features/common/hooks/use-remove-server-side-css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useRemoveServerSideCSS();

  return (
    <UIDReset prefix="uid">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UIDReset>
  );
}
export default MyApp;
