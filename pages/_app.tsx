import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/global.css';  // Update this line
import { CssBaseline } from '@mui/material';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <CssBaseline />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

export default MyApp;
