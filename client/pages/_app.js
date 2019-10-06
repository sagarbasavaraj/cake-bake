import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/helpers/theme";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import NProgress from 'nprogress';
import Router from 'next/router';
import createStore from "../src/store/store";
import storage from "../src/helpers/storage-service";
import { USER_INFO_STORAGE_KEY } from "../src/helpers/constants";
import { setCommonHeaderParams } from "../src/helpers/api";
import { loadProfile } from "../src/actions/login-actions";


NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (/*url*/) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


class CakeBakeApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  constructor() {
    super();
    //initialize storage service
    storage.init();
    //verify the user if token exist.
    storage.getItem(USER_INFO_STORAGE_KEY).then(user => {
      if (user) {
        const { store } = this.props;
        setCommonHeaderParams({ token: user.token });
        store.dispatch(loadProfile(user.token));
      }
    });
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Head>
          <title>Cake Bake</title>
          <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
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
