import User from "../model/users.js";
import { v2 as cloudinary } from "cloudinary";
import { hashPassword, verifyPassword } from "../utils/bcrypt.js";

import { issueToken } from "../utils/jwt.js";

const getUserInfo = async (req, res, next) => {
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

//uploading a user picture
const uploadUserImage = async (req, res) => {
  try {
    console.log("req file", req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "bikeroute-bikes",
    });
    res
      .status(200)
      .json({ msg: "picture uploaded succesfully", pictureUrl: result.url });
  } catch (error) {
    console.log("err", error);

    res.status(500).json({ msg: "picture failed uploading", error: error });
  }
};

const getSingleUserInfo = async (req, res, next) => {
  console.log("console1", req.params.user, req.params.password);
  try {
    const singleUserInfo = await User.find({
      user: req.params.user,
      password: req.params.password,
    }).exec();
    res.status(200).json({ singleUserInfo });
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "more stuff broken",
    });
  }
};

export { getUserInfo, getSingleUserInfo, uploadUserImage };

// const getUserInfo = async (req, res, next) => {
//   try {
//     const allUserInfo = await User.find({});
//     res.status(200).json({
//       allUserInfo,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error,
//       msg: "broken stuff",
//     });
//   }
// };

// const getSingleUserInfo = async (req, res, next) => {
//   console.log(req.params.user, req.params.password);
//   try {
//     const singleUserInfo = await User.find({
//       user: req.params.user,
//       password: req.params.password,
//     }).exec();
//     res.status(200).json({ singleUserInfo });
//   } catch (error) {
//     res.status(500).json({
//       error: error,
//       msg: "more stuff broken",
//     });
//   }
// };
