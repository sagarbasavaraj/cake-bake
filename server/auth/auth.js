const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../db/models/user");
const config = require("config");

//Create a passport middleware to handle user registration
passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password"
    },
    async (req, email, password, done) => {
      const { name } = req.body;
      try {
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
          return done(null, false, { message: "Email already exist" });
        }
        //Save the information provided by the user to the the database
        const user = await UserModel.create({ name, email, password });
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//Create a passport middleware to handle User login
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        //Find the user associated with the email provided by the user
        const user = await UserModel.findOne({ email }).populate("orders");
        if (!user) {
          //If the user isn't found in the database, return a message
          return done(null, false, { message: "User not found" });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }
        //Send the user information to the next middleware
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies['session_token'];
  }
  return null
};

const opts = {
  //secret we used to sign our JWT
  secretOrKey: config.get("secretOrKey"),
  //we expect the user to send the token as a query paramater with the name 'token'
  jwtFromRequest: cookieExtractor
};

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(opts, async (token, done) => {

    if (!token) {
      done("user not valid");
      return;
    }

    try {
      const user = await UserModel.findOne({
        email: token.user.email
      }).populate("orders");
      if (user) {
        const { email, name, id, orders } = user;
        done(null, { email, name, id, orders });
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  })
);
