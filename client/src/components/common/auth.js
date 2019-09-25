import { PureComponent } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import { bool } from "prop-types";
import { logout } from "../../actions/login-actions";
import UserProfile from "./user-profile";

function styles(theme) {
  return {
    loginButton: {
      marginRight: theme.spacing(1)
    }
  };
}

class Auth extends PureComponent {
  static propTypes = {
    isUserLoggedIn: bool.isRequired
  };

  logoutUser = () => {
    this.props.dispatch(logout());
  };

  render() {
    const { classes, isUserLoggedIn } = this.props;
    return (
      <>
        {!isUserLoggedIn ? (
          <>
            <Link href="/login">
              <Button
                variant="outlined"
                color="secondary"
                className={classes.loginButton}
              >
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="contained" color="secondary">
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <UserProfile onLogout={this.logoutUser} />
        )}
      </>
    );
  }
}

export default withStyles(styles)(
  connect(state => ({
    isUserLoggedIn: state.session.isUserLoggedIn
  }))(Auth)
);
