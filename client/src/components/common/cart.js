import { PureComponent, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Popover,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Avatar,
  Card,
  CardHeader,
  CardContent
} from "@material-ui/core";
import { ShoppingCart, Close, Delete } from "@material-ui/icons";
import { red, grey } from "@material-ui/core/colors";

const popover = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  }
};

function styles(theme) {
  return {
    shoppingCart: {
      marginRight: theme.spacing(0)
    },
    badge: {
      margin: theme.spacing(2)
    },
    cartContainer: {},
    carHeader: {
      display: "flex",
      "align-items": "center",

      "& > body1": {
        "flex-grow": 1
      }
    },
    avatar: {
      background: red[500]
    }
  };
}

class Cart extends PureComponent {
  state = {
    anchorEl: null
  };

  handlePopoverOpen = ({ currentTarget }) => {
    this.setState({ anchorEl: currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? "cart-popover" : undefined;

    return (
      <Fragment>
        <IconButton
          className={classes.shoppingCart}
          color="inherit"
          aria-label="cart"
          aria-describedby={id}
          onClick={this.handlePopoverOpen}
        >
          <Badge className={classes.badge} badgeContent={4} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={popover.anchorOrigin}
          transformOrigin={popover.transformOrigin}
          onClose={this.handlePopoverClose}
        >
          <Box className={classes.cartContainer}>
            <Box className={classes.carHeader} px={2} py={1} borderBottom={1}>
              <Typography component="body1">My Cart</Typography>
              <IconButton
                color="inherit"
                aria-label="close"
                onClick={this.handlePopoverClose}
              >
                <Close />
              </IconButton>
            </Box>
            <Box p={2}>
              <Box component={Card} boxShadow={1}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="delete">
                      <Delete />
                    </IconButton>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <Box p={2}>
                  <Box
                    textAlign="center"
                    bgcolor={grey[100]}
                    component={CardContent}
                    borderRadius={3}
                    p={2}
                  >
                    <Typography>July 12, 2019 16:45 PM</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Button fullWidth variant="contained" size="large" color="primary">
              Proceed to Checkout
            </Button>
          </Box>
        </Popover>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Cart);
