import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "API is running" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(403, "You can update only your account!")
    );
  }

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar
        }
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};
