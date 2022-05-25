import mongoose from "mongoose";
import path from "path";
import Bike from "../model/rides.js";

//ALL OF THIS IS PLACEHOLDER TO TEST WHAT IS HAPPENING 16:33 23.05

const profile = async (req, res, next) => {
  try {
    console.log("body", req.body.user, req.body.password);
    const user = await User.findOne({
      user: req.body.user,
    });
    console.log("user", user);
    if (!user) {
      console.log("line");
      res.status(401).json({ msg: "user not found" });
    } else {
      try {
        const verified = await verifyPassword(req.body.password, user.password);
        console.log("verified", verified);
        if (!verified) {
          res.status(401).json({ msg: "wrong password" });
        } else {
          console.log("user singin", user);
          const token = issueToken(user._id);

          res.status(200).json({
            msg: "login worked",
            user: {
              user: user.user,
              email: user.email,
              id: user._id,
            },
            token,
          });
        }
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "broken stuff",
    });
  }
};

export { profile };
