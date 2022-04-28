import User from "../model/users.js";

const getUserInfo = async (req, res, next) => {
  try {
    const allUserInfo = await User.find({});
    res.status(200).json({
      allUserInfo,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "broken stuff",
    });
  }
};

const getSingleUserInfo = async (req, res, next) => {
  console.log(req.params.user, req.params.password);
  try {
    const singleUserInfo = await User.find({
      user: req.params.user,
    }).exec();
    res.status(200).json({ singleUserInfo });
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "more stuff broken",
    });
  }
};

export { getUserInfo, getSingleUserInfo };
