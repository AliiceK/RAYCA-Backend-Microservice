const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');




// jwt takes three parameters payload ( data that you want to store in jwt) , secret key ( private key to sign JWT), expiry date.

const generateToken = (id, role) => {
    return jwt.sign({id,role}, process.env.JWT_SECRET, {expiresIn: '1h'})
}

const registerUser = async ( req, res ) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password, role} = req.body;

    const userAlreadyExists = await User.findOne({email});

    if (userAlreadyExists) {
        return res.status(400).json({message: "User already exists"});
    }

    // user doesnt exists; let's create one ; step 1 ; encrypt pass
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({name, email, password: hashedpassword, role});

    if (newUser) {
        res.status(201).json({token: generateToken(newUser._id, newUser.role)});
    } else {
        res.status(400).json({message: "invalid user data"})
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "No user with this email. Sign up instead!" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = generateToken(existingUser._id, existingUser.role);
        return res.json({ token });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

module.exports = { registerUser, loginUser };

