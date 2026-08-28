import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide username, email and password",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
        });

    } catch (error) {
        next(error);
    }
};
