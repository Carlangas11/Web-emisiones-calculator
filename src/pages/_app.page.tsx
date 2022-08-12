import { Layout } from "@components/Layout";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Fragment } from "react";

import "../styles.css";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
};

export default MyApp;
