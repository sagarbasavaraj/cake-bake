import { Fragment } from "react";
import {
  FormControl,
  InputLabel,
  Typography,
  Select,
  OutlinedInput,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Button
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { object, func } from "prop-types";
import { get } from "lodash";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateMomentUtils from "@date-io/moment";
import moment from "moment";
import CareInstructions from "./care-instructions";
import DeliveryInformation from "./delivery-information";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column"
  },
  formControl: {
    minWidth: 120,
    display: "block",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  field: {
    display: "block"
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  button: {
    margin: theme.spacing(2, 2, 2, 0)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  root: {
    display: "inline"
  }
}));

const initialValues = {
  kg: 1,
  datetime: moment(),
  cakeType: "egg"
};

function CakeDetails({ image, onBuyButtonClick, onAddToCartBtnClick }) {
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
      <Formik initialValues={initialValues}>
        {({ values }) => (
          <Form className={classes.form}>
            <Field name="kg">
              {({ field, form }) => {
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
                      <MenuItem value={0.5}>half</MenuItem>
                      <MenuItem value={1}>One</MenuItem>
                      <MenuItem value={2}>Two</MenuItem>
                      <MenuItem value={3}>Three</MenuItem>
                      <MenuItem value={4}>Four</MenuItem>
                      <MenuItem value={5}>Five</MenuItem>
                    </Select>
                  </FormControl>
                );
              }}
            </Field>
            <Field name="deliveryDateTime">
              {({ field, form }) => {
                const { setFieldValue } = form;
                return (
                  <MuiPickersUtilsProvider utils={DateMomentUtils}>
                    <DateTimePicker
                      {...field}
                      keyboard="true"
                      className={classes.formControl}
                      label="Select Delivery Date and Time"
                      inputVariant="outlined"
                      disablePast
                      onChange={value => {
                        setFieldValue("deliveryDateTime", value);
                      }}
                    />
                  </MuiPickersUtilsProvider>
                );
              }}
            </Field>
            <Field name="cakeType">
              {({ field, form }) => {
                return (
                  <RadioGroup
                    aria-label="cakeType"
                    name={field.name}
                    className={classes.group}
                    {...field}
                    row
                  >
                    <FormControlLabel
                      value="egg"
                      control={<Radio />}
                      label="With Egg"
                    />
                    <FormControlLabel
                      value="eggless"
                      control={<Radio />}
                      label="Eggless"
                    />
                  </RadioGroup>
                );
              }}
            </Field>
            <Field name="message">
              {(field, form) => {
                return (
                  <TextField
                    label="Message on Cake"
                    multiline
                    rowsMax="3"
                    margin="normal"
                    helperText="Max 25"
                    variant="outlined"
                    {...field}
                  />
                );
              }}
            </Field>
            <FormControl className={classes.root}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                size="large"
                onClick={() => onAddToCartBtnClick(values)}
              >
                Add to Cart
                <ShoppingCart className={classes.rightIcon} />
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                size="large"
                onClick={() => onBuyButtonClick(values)}
              >
                Buy Now
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
      <DeliveryInformation />
      <CareInstructions />
    </Fragment>
  );
}

CakeDetails.propTypes = {
  image: object,
  onBuyButtonClick: func.isRequired,
  onAddToCartBtnClick: func.isRequired
};

export default CakeDetails;
