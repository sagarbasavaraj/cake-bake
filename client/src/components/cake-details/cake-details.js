import { Fragment } from "react";
import {
  FormControl,
  InputLabel,
  Typography,
  Select,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";
import { object } from "prop-types";
import { get } from "lodash";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateMomentUtils from "@date-io/moment";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column"
  },
  formControl: {
    minWidth: 120,
    display: "block",
    marginBottom: theme.spacing(2)
  },
  field: {
    display: "block"
  }
}));

const initialValues = {
  kg: "",
  datetime: moment()
};

function CakeDetails({ image }) {
  const onFormSubmit = (values, { setSubmitting }) => {};
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>
        {get(image, "metadata.title")}
      </Typography>
      <Formik onSubmit={onFormSubmit} initialValues={initialValues}>
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              name="kg"
              render={({ field, form }) => {
                console.log(field);
                return (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel ref={inputLabel} htmlFor="kg">
                      Kg
                    </InputLabel>
                    <Select
                      {...field}
                      input={
                        <OutlinedInput
                          labelWidth={labelWidth}
                          name={field.name}
                          id="kg"
                        />
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>One</MenuItem>
                      <MenuItem value={2}>Two</MenuItem>
                      <MenuItem value={3}>Three</MenuItem>
                      <MenuItem value={4}>Four</MenuItem>
                      <MenuItem value={5}>Five</MenuItem>
                    </Select>
                  </FormControl>
                );
              }}
            />
            <Field
              name="datetime"
              render={({ field, form }) => {
                const { setFieldValue } = form;
                return (
                  <MuiPickersUtilsProvider utils={DateMomentUtils}>
                    <DateTimePicker
                      {...field}
                      keyboard
                      className={classes.formControl}
                      label="DateTime"
                      inputVariant="outlined"
                      disablePast
                      onChange={value => {
                        setFieldValue("datetime", value);
                      }}
                    />
                  </MuiPickersUtilsProvider>
                );
              }}
            />
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}

CakeDetails.propTypes = {
  image: object
};

export default CakeDetails;
