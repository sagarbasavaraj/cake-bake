import { useState } from "react";
import {
  FormControl,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  InputAdornment,
  Box,
  IconButton,
  Divider,
  Link as MLink
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Email, Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { login } from "../src/actions/login-actions";
import { connect } from "react-redux";
import { func } from "prop-types";

const initialValues = {
  email: "",
  password: ""
};

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(0)
  },
  title: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "none"
    }
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  formControl: {
    minWidth: "300px",
    marginBottom: theme.spacing(2)
  },
  link: {
    marginLeft: theme.spacing(1),
    cursor: "pointer"
  },
  iconPassButton: {
    marginRight: "-4px"
  }
}));

const emailFieldInputProps = {
  endAdornment: (
    <InputAdornment position="start">
      <Email />
    </InputAdornment>
  )
};

const Login = ({ dispatch }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleFormSubmit = values => {
    dispatch(login(values));
  };

  return (
    <Container>
      <Box p={3} display="flex" justifyContent="center" alignItems="center">
        <Typography component="h4" variant="h4">
          <Link href="/">
            <MLink className={classes.title}>Cake Bake</MLink>
          </Link>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card className={classes.card}>
          <CardHeader title="Log In" />
          <Divider />
          <CardContent>
            <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
              {({ handleSubmit }) => {
                return (
                  <Form className={classes.form} onSubmit={handleSubmit}>
                    <Field name="email">
                      {({ field }) => {
                        return (
                          <FormControl className={classes.formControl}>
                            <TextField
                              {...field}
                              InputProps={emailFieldInputProps}
                              variant="outlined"
                              label="Email"
                            />
                          </FormControl>
                        );
                      }}
                    </Field>
                    <Field name="password">
                      {({ field }) => {
                        return (
                          <TextField
                            {...field}
                            id="password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    edge="end"
                                    className={classes.iconPassButton}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        );
                      }}
                    </Field>
                    <Box my={3}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="secondary"
                        type="submit"
                      >
                        Log in
                      </Button>
                    </Box>
                    <Divider />
                    <Box mt={2} display="flex" justifyContent="center">
                      <Typography variant="body1" component="span">
                        Don't have an account?
                        <Link href="/signup">
                          <MLink className={classes.link}>Sign up</MLink>
                        </Link>
                      </Typography>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

Login.propTypes = {
  dispatch: func
};

export default connect()(Login);
