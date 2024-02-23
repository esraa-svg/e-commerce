import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@desc Auth user @ get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check if email and password exist
    const user = await User.findOne({ email })

    if (user && (await user.matchPasswords(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
        } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})


//@desc Register new User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name,email, password } = req.body;
  //Check if email and password exist
    const userExists = await User.findOne({ email })

    if(userExists){
      res.status(400).json({ msg: "User Already Exists" })
    }

    const user = await User.create({
      name,
      email,
      password
    })
    if(user) {
      res.status(201).json({
        _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
      })
    }else{
      res.status(404).json({ msg: "User Not Found" })
    }
    
})

//@desc GET User Profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    try {
      const user = req.user
      if(!user) {
          res.status(404)
          throw new Error("User not found")
      }else {
        res.json({
        _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
      })}
    } catch (error) {
      // console.log(error.message);
      res.status(404).json({ message: error.message });

    }
    
  })
  


export { authUser,registerUser,getUserProfile}