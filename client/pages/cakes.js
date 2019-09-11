import { PureComponent } from "react";
import { Grid, Container, Box, Card, CardMedia } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { get } from "lodash";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import Layout from "../src/components/common/layout";
import CakeDetails from "../src/components/cake-details/cake-details";
import Spinner from "../src/components/common/spinner";
import { saveOrder } from "../src/actions/login-actions";

const styles = {
  card: {
    maxHeight: 420
  }
};

class Cakes extends PureComponent {
  static async getInitialProps({ ctx }) {
    const { id } = ctx.query;
    try {
      const response = await fetch(
        `http://localhost:3000/api/images/details/${id}`
      );
      const { file } = await response.json();
      return { image: file };
    } catch (e) {
      console.log("error....", e);
      return { error: e };
    }
  }

  handleAddToCartBtnClick = data => {
    this.props.dispatch(saveOrder(data));
  };

  handleBuyBtnClick = data => {};

  render() {
    const { classes, image } = this.props;
    return (
      <Layout>
        <Spinner />
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box p={2}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    alt={get(image, "metadata.title")}
                    image={`http://localhost:3000/api/images/${image.filename}`}
                    title={get(image, "metadata.title")}
                  />
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box p={2}>
                <CakeDetails
                  image={image}
                  onAddToCartBtnClick={this.handleAddToCartBtnClick}
                  onBuyButtonClick={this.handleBuyBtnClick}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

export default connect()(withRouter(withStyles(styles)(Cakes)));
