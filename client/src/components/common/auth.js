import { PureComponent } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import { logout } from "../../actions/login-actions";

function styles(theme) {
  return {
    loginButton: {
      marginRight: theme.spacing(1)
    }
  };
}

class Auth extends PureComponent {
  logoutUser = () => {
    this.props.dispatch(logout());
  };
  render() {
    const { classes, user } = this.props;
    return (
      <>
        {!user ? (
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.logoutUser}
          >
            Log out
          </Button>
        )}
      </>
    );
  }
}

export default withStyles(styles)(
  connect(state => ({
    user: state.session.user
  }))(Auth)
);
