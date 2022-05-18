import User from "../model/users.js";
import bcrypt from "bcrypt";

const hashPassword = async (pass) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(pass, salt);

    return hash;
  } catch (err) {
    console.log(err);
  }
};

const signUp = async (req, res, next) => {
  console.log("userinfo", req.body.user, req.body.password, req.body.email);

  // upload picture on cloudinary

  const checkUserExists = await User.findOne({ user: req.body.user });

  if (checkUserExists) {
    res.status(401).json({ msg: "user allready existing" });
  } else {
    const hashPass = await hashPassword(req.body.password);
    console.log("hashed", hashPass);
    await sendToMongo(
      req.body.user,
      hashPass,
      req.body.email
      //req.body.avatarPicture
    );
    res.status(201).json({
      message: "Post created successfully!",
      post: { id: new Date().toISOString() },
    });
  }
};

const sendToMongo = async (user, password, email) => {
  const persona = new User({
    user: user,
    password: password,
    email: email,
    //avatarPicture: avatarPicture,
  });
  console.log("check if signup works", persona);
  await persona.save();
};

export { signUp };
