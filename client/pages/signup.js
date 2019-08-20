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
import { Email, Person, Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const initialValues = {
  name: "",
  email: "",
  password: ""
};

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(0)
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
  "iconPassButton": {
    marginRight: "-4px"
  }
}));

const nameFieldInputProps = {
  endAdornment: (
    <InputAdornment position="start">
      <Person />
    </InputAdornment>
  )
};

const emailFieldInputProps = {
  endAdornment: (
    <InputAdornment position="start">
      <Email />
    </InputAdornment>
  )
};

const Signup = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Container>
      <Box p={3} display="flex" justifyContent="center" alignItems="center">
        <Typography component="h4" variant="h4">
          Cake Bake
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Card className={classes.card}>
          <CardHeader title="Sign Up" />
          <Divider />
          <CardContent>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {}}
            >
              {({ values, handleSubmit }) => {
                return (
                  <Form className={classes.form}>
                    <Field
                      name="name"
                      render={({ field }) => {
                        return (
                          <FormControl className={classes.formControl}>
                            <TextField
                              {...field}
                              InputProps={nameFieldInputProps}
                              variant="outlined"
                              label="Full Name"
                            />
                          </FormControl>
                        );
                      }}
                    />
                    <Field
                      name="email"
                      render={({ field }) => {
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
                    />
                    <Field
                      name="password"
                      render={({ field }) => {
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
                    />
                    <Box my={3}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="secondary"
                      >
                        Sign Up
                      </Button>
                    </Box>
                    <Divider />
                    <Box mt={2} display="flex" justifyContent="center">
                      <Typography variant="body1" component="span">
                        Already have an account?
                        <Link href="/login">
                          <MLink className={classes.link}>Log In</MLink>
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

export default Signup;
