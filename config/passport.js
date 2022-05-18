import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../model/users.js";
import * as dotenv from "dotenv";
dotenv.config();
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_JWT_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};

export default passportConfig;
