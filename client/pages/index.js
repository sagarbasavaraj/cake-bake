import styled from "styled-components";
import Layout from "../src/components/layout";
import CakesList from "../src/components/home/cakes-list";

const Title = styled.h1`
  font-size: 40px;
`;

const Index = () => (
  <Layout>
    <CakesList />
  </Layout>
);

export default Index;
