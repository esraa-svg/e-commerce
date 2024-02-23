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


//@desc GET User Profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = User.findById(req.user._id)
    res.json({
        email: user.email
    })
    
  })
  


export { authUser,  getUserProfile}