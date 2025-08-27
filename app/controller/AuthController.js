const comparePassword = require('../helper/ComparePassword');
const hashedPassword = require('../helper/HashedPassword');
const User = require('../model/user')
const jwt=require('jsonwebtoken')


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

    async login(req, res) {
        try {
            const {email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const user=await User.findOne({email});
            //console.log('user',user);
            
            if(!user){
                return res.status(400).json({
                    status:false,
                    message:'User not exist'
                })
            }
            // if (!user.is_verified) {
            //     return res.status(401).json({ status: false, message: "Your account is not verified" });
            // }

            const isMatchPassword= await comparePassword(password,user.password)
            if(!isMatchPassword){
                return res.status(400).json({
                    status:false,
                    message:'Invalid password'
                })
            }

            const token = jwt.sign({ 
                id: user._id,
                name:user.name,
                email:user.email,
             }, process.env.JWT_SECRET ||"hellowelcometowebskittersacademy123456", { expiresIn: '60m' });

           return res.status(200).json({
                message: 'Login successful',
                user:{
                id: user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                },
                token: token

            });

        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }


    async dashboard(req,res){
        try{
            return res.status(200).json({
                "message": "Welcome to the dashboard",
                data: req.user
            })

        }catch(err){
            console.error(err)
            res.status(500).json({ message: 'Internal Server Error' })
        }

    }

}


module.exports = new AuthController();



