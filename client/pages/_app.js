import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/helpers/theme";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import NProgress from "nprogress";
import Router from "next/router";
import createStore from "../src/store/store";
import InitUser from "../src/components/init-user";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", (/*url*/) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
    this.state = {
      userInitialized: false
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  handleUserInitilazed = () => {
    this.setState({ userInitialized: true });
  };

  _renderComponent = () => {
    const { userInitialized } = this.state;
    const { Component, pageProps, store } = this.props;

    if (!userInitialized) {
      return (
        <InitUser
          dispatch={store.dispatch}
          onUserInitialized={this.handleUserInitilazed}
        />
      );
    }

    return <Component {...pageProps} />;
  };

  render() {
    const { store } = this.props;

    return (
      <>
        <Head>
          <title>Cake Bake</title>
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={store}>{this._renderComponent()}</Provider>
        </ThemeProvider>
      </>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(CakeBakeApp));
