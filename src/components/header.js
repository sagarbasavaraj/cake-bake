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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontFamily: "Comic Sans MS, cursive, sans-serif"
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
        >
          <Phone />
          <Typography>+49 15210240459</Typography>
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
        <ShoppingCart />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
