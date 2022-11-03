import '../styles/global.css';

import type { AppProps } from "next/app";

 function myApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default myApp
