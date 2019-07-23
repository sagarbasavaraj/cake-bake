import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Button,
  Typography,
  Container as MuiContainer
} from "@material-ui/core";
import { Menu, Phone, ShoppingCart } from "@material-ui/icons";
import ImageUpload from "./image-upload";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  shoppingCart: {
    marginRight: theme.spacing(0)
  },
  title: {
    flexGrow: 1
  },
  contact: {
    paddingTop: theme.spacing(0)
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <MuiContainer>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={classes.contact}
        >
          <Phone />
          <Typography>Call Us +49 15218314613</Typography>
        </Grid>
      </MuiContainer>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Cake Bake
        </Typography>
        <ImageUpload />
        <IconButton
          className={classes.shoppingCart}
          color="inherit"
          aria-label="cart"
        >
          <ShoppingCart />
        </IconButton>
        <Button color="inherit">Sign up</Button>
        <Button color="inherit">Sign in</Button>
      </Toolbar>
    </AppBar>
  );
}
