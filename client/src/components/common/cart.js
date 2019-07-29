import { PureComponent, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Popover,
  Typography,
  Button,
  IconButton,
  Badge,
  Box
} from "@material-ui/core";
import { ShoppingCart, Close } from "@material-ui/icons";

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
    cartContainer: {
      "min-width": "320px"
    },
    carHeader: {
      display: "flex",
      "align-items": "center",

      "& > body1": {
        "flex-grow": 1
      }
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
          </Box>
        </Popover>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Cart);
