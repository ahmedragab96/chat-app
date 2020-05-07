const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//=================================
//             User
//=================================

router.get("/auth", async (req, res) => {
    const {
        id,
      } = req.body;
    const user = User.findOne({
        id,
     });
    res.status(200).json({
        _id: user._id,
        isAdmin: user.role === 0 ? false : true,
        isAuth: true,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        image: user.image,
    });
});

router.post("/register", async (req, res, next) => {

    try {
        const {
          email,
          password,
          name,
          lastname,
          image,
        } = req.body;
        // check for user exists
        const existedUser = await User.findOne({
          email,
        });
    
        if (existedUser) {
          throw new Error('User already exists');
        }
  
        const hashedPassword = await bcrypt.hash(password, 12);
  
        const user = new User({
          email,
          password: hashedPassword,
          name,
          lastname,
          image,
        });
  
        // save user in database
        const result = await user.save();
        res.status(200).json({
            success: true,
            data: result._doc,
        });
      } catch (error) {
        throw error;
      }
});

router.post("/login", async (req, res) => {
    try {
        const {
          email,
          password,
        } = req.body;
        console.log(email, password);
    
        const user = await User.findOne({email});
        if (!user) {
          throw new Error('user doesn\'t exist');
        }
    
        console.log(user.password);
        const isEqual = bcrypt.compare(password, user.password);
        if (!isEqual) {
            res.status(200).json({
                message: 'Wrong Password',
                loginSuccess: false,
            });
        }
        const token = jwt.sign({
          userId: user.id,
          email: user.email
        },
        process.env.JWTSECRETKEY,{
          expiresIn: '1h'
        });
    
        res.status(200).json({
            userId: user.id,
            token,
            loginSuccess: true,
        });
      } catch (error) {
        throw error;
      }
});

module.exports = router;
