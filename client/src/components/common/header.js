import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Container as MuiContainer
} from "@material-ui/core";
import { Phone } from "@material-ui/icons";
import Link from "next/link";
import ImageUpload from "./image-upload";
import Cart from "./cart";
import Auth from "./auth";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#232f3e"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    "& > span:hover": {
      cursor: "pointer"
    }
  },
  contact: {
    paddingTop: theme.spacing(0)
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
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
        <Link href="/">
          <Typography variant="h6" className={classes.title}>
            <span> Cake Bake</span>
          </Typography>
        </Link>
        <Cart />
        <ImageUpload />
        <Auth />
      </Toolbar>
    </AppBar>
  );
}
