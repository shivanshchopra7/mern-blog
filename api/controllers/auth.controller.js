import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if any required field is missing or empty
        if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
            throw errorHandler(400, 'All fields are required');
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);
        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.json({ message: 'Signup Success' });
    } catch (error) {
        // Forward any errors to the error handling middleware
        next(error);
    }
};

export const signin = async (req, res, next) => {
const {email, password} = req.body;
if(!email || !password || email === '' || password === '') {
    next(errorHandler(404, 'All fields are required'));
}
try {
    const validUser = await User.findOne({email});
    if (!validUser) {
return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) {
       return next(errorHandler(404, 'Invalid Password'));
    }
    const token = jwt.sign(
        {
            id: validUser._id
        },
        process.env.JWT_SECRET,
    );
    const { password: pass, ...rest} = validUser._doc;
    res.status(200).cookie('access_token', token, {
        httpOnly: true
    }).json(rest);
} catch (error) {
    next(error);
}
};
