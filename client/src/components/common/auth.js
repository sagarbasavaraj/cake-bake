import { Button } from "@material-ui/core";
import Link from "next/link";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import UserProfile from "./user-profile";

function styles(theme) {
  return {
    loginButton: {
      marginRight: theme.spacing(1)
    }
  };
}

const useStyles = makeStyles(styles);

const getIsUserLoggedIn = state => state.session.isUserLoggedIn;

function Auth() {
  const isUserLoggedIn = useSelector(getIsUserLoggedIn);
  const classes = useStyles();

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
        <UserProfile />
      )}
    </>
  );
}

export default Auth;
