import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === '' ) {
       next(errorHandler(400, 'All fields are required'));
    }

    const newUser = new User({
        username,
        email,
        password,
    });

    try {
        await newUser.save();
        res.json('Signup Success');
    } catch (error) {
        next(error);
    }

    await newUser.save();
    res.json({ message: 'Signup Successful' });
}