import mongoose from "mongoose";
import dotenv from 'dotenv'
import users from "./data/users.js";
import User from './models/userModel.js'
import connectDB from "./config/dp.js";

dotenv.config()

connectDB()

const importData = async () => {
    try{
        await User.deleteMany()

        await User.insertMany(users)

        console.log('Data Imported!!')
    }catch(error){
        console.log(`Error ${error.message}`)
        process.exit(1)
    }
}
const destroyData = async () => {
    try{
        await User.deleteMany()

        

        console.log('Data Destroyed!!')
    }catch(error){
        console.log(`Error ${error.message}`)
        process.exit(1)
    }
}

process.argv[2] === "-d" ? destroyData() : importData()