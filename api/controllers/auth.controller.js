import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if any required field is missing or empty
        if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
            throw errorHandler(400, 'All fields are required');
        }

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password,
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
