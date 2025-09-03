const comparePassword = require("../helper/ComparePassword");
const hashedPassword = require("../helper/HashedPassword");
const User = require('../model/user')
const jwt=require('jsonwebtoken')


class AuthEjsController {

    async checkAuth(req,res,next){
        if(req.user){
            next()
        }else{
           return res.redirect('/signin')
        }   
    }
    async signup(req, res) {
       return res.render('register', {
            title: "User Registration",
            error: req.flash('error')
        });
    }


    async signupCreate(req, res) {
        try {
            const { name, email, phone, password } = req.body;

            // Validate input
            if (!name || !email || !phone || !password) {
                req.flash('error', 'All fields are required');
                return res.redirect('/signup');
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                req.flash('error', 'User already exists');
                return res.redirect('/signup');
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
            //console.log('User data:', data);

            if (data && data._id) {
                req.flash('success', 'Registration successful. Please log in.');
                res.redirect('/signin');
            } else {
                req.flash('error', 'User registration failed');
                res.redirect('/signup');
            }

        } catch (err) {
            console.error(err)
             req.flash('error', 'User registration failed');
             res.redirect('/signup');
        }
    }

    async signin(req, res) {
        res.render('login', {
            title: "User Login",
            success: req.flash('success'),
            error: req.flash('error')
        });
    }

    async signinCreate(req, res) {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                console.log('All filed is required');
                
            }

            const user = await User.findOne({ email });
            //console.log('user',user);

            if (!user) {
               console.log('user not found');
        
            }
            const isMatchPassword = await comparePassword(password, user.password)
            if (user && isMatchPassword) {
                // Create token
                const token = jwt.sign(
                    {
                        id: user._id,
                        name: user?.name,
                        email: user?.email,
                        phone: user?.phone,
                    },
                    process.env.JWT_SECRET || "hellowelcometowebskittersacademy123456",
                    { expiresIn: '60m' }
                );

                if (token) {
                    res.cookie('userToken', token)
                    res.redirect('/user/dashboard');
                } else {
                    console.log('login failed');
                    res.redirect('/signin');
                }
            }

        } catch (err) {
            console.error(err)
            res.redirect('/signin');
        }

    }
    async logout(req, res) {
        res.clearCookie('userToken');
        res.redirect('/signin');
    }
    async userdashboard(req, res) {
        res.render('dashboard', {
            title: "User Dashboard",
            data:req.user
        });
    }

}



module.exports = new AuthEjsController();
