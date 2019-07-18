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

const useStyles = makeStyles(theme => ({
  cardContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}));

const CakesList = () => {
  const classes = useStyles();
  return (
    <Container className={classes.cardContainer}>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map(val => (
          <Grid item xs={12} sm={3} key={val}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Vanilla"
                  image="../static/images/vanilla.JPG"
                  title="Vanilla"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="h2"
                  >
                    <center>Vanilla</center>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CakesList;
