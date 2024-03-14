const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

// register user
const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        // encrypt the password, save it
        // then verify whether it's the same user
        // then provide jwt 
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




//login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if user exists in database
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User doesn't exist" })


        //checking if password is same
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        //if correct return a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;  //so that password is not sent to the frontend

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports={login,register}
