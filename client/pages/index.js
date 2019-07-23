import { Component } from "react";
import styled from "styled-components";
import Layout from "../src/components/layout";
import CakesList from "../src/components/home/cakes-list";
import fetch from 'isomorphic-unfetch';

class Index extends Component {
  static async getInitialProps() {
    try {
      const response = await fetch("http://localhost:3000/api/images");
      const {files} = await response.json();
      return { images: files };
    } catch (e) {
      console.log('error....', e);
      return { error: e };
    }
  }

  render() {
    const {images, error} = this.props;
    return (
      <Layout>
        {error && <h1>Error in fetching images....</h1>}
        <CakesList images={images} />
      </Layout>
    );
  }
}

export default Index;
