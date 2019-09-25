import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/helpers/theme";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import createStore from "../src/store/store";
import storage from "../src/helpers/storage-service";

class CakeBakeApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    //initialize storage service
    storage.init();
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Head>
          <title>Cake Bake</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(CakeBakeApp));
