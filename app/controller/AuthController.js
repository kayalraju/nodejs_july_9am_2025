const hashedPassword = require('../helper/HashedPassword');
const User = require('../model/user')


class AuthController {

    async register(req, res) {
        try {
            const { name, email, phone, password } = req.body;

            // Validate input
            if (!name || !email || !phone || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPass = await hashedPassword(password)
            // Create new user
            const newUser = new User({
                name,
                email,
                phone,
                password: hashedPass // Note: Password should be hashed in a real application
            });

            const data = await newUser.save();
            res.status(201).json({
                message: 'User registered successfully',
                data: data
            });

        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

}


module.exports = new AuthController();



