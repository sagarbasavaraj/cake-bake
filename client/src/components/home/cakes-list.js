import {
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { arrayOf, object } from "prop-types";
import { map, get } from "lodash";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  cardContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}));

const CakesList = ({ images }) => {
  const classes = useStyles();
  return (
    <Container className={classes.cardContainer}>
      <Grid container spacing={2}>
        {map(images, img => (
          <Grid item xs={12} sm={3} key={img._id}>
            <Link href={{ pathname: "/cakes", query: { id: img._id } }}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={get(img, "metadata.title")}
                    image={`http://localhost:3000/api/images/${img.filename}`}
                    title={get(img, "metadata.title")}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="h2"
                    >
                      <center>{get(img, "metadata.title")}</center>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

CakesList.propTypes = {
  images: arrayOf(object)
};

CakesList.defaultProps = {
  images: []
};

export default CakesList;
