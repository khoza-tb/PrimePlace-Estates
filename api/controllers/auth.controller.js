import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// =========================
// SIGN UP
// =========================
export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check required fields
        if (!username || !email || !password) {
            return next(
                errorHandler(
                    400,
                    "Please provide username, email and password"
                )
            );
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return next(
                errorHandler(
                    400,
                    "Username or email already exists"
                )
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user
        await newUser.save();

        // Send response
        res.status(201).json({
            success: true,
            message: "User created successfully",
        });

    } catch (error) {
        next(error);
    }
};


// =========================
// SIGN IN
// =========================
export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return next(
                errorHandler(
                    400,
                    "Please provide email and password"
                )
            );
        }

        // Find user
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(
                errorHandler(
                    404,
                    "User not found"
                )
            );
        }

        // Check password
        const validPassword = await bcrypt.compare(
            password,
            validUser.password
        );

        if (!validPassword) {
            return next(
                errorHandler(
                    401,
                    "Wrong credentials"
                )
            );
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: validUser._id,
            },
            process.env.JWT_SECRET
        );

        // Remove password before sending user data
        const { password: hashedPassword, ...userData } =
            validUser._doc;

        // Send token in HTTP-only cookie
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({
                success: true,
                message: "Login successful",
                user: userData,
            });

    } catch (error) {
        next(error);
    }
};