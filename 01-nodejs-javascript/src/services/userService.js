const User = require('../models/user');
const bcrypt = require('bcrypt');
const { name } = require('ejs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();


const createUserService = async (name,email,password) => {
    try{
    //check email exist
    const user = await User.findOne({email});
    if(user){
        console.log(`>>email already in use, chon email khac:${email}`);
        return null; //de phan hashword ko chay nua
    }





    //hash user password
    const hashPassword = await bcrypt.hash(password,saltRounds);
    //save user to db
    let result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        role: 'Duongbacamly'
    })
        return result;

    }catch(error){
        console.log(error);
        return null;
    }
}

const loginService = async (email1,password) => {
    try{
    //
        const user = await User.findOne({email: email1}).exec();
        if(user){  
            //compare password
            const isMatchPassword = await bcrypt.compare(password,user.password);
            if(!isMatchPassword){
                return{
                    EC:2,
                    EM:"wrong password",
                }
            }else{
                const payload={
                    email: user.email,
                    name: user.name
                }
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    }
                )

                //Create access token
                return {
                    EC:0,
                    access_token,
                    user:{
                        email: user.email,
                        name: user.name
                    }
                };
            }
        }
        else{
            return{
                EC:1,
                EM:"user not found",
            }
        }
    }catch(error){
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try{
    let result = await User.find({}).select('-password');
        return result;

    }catch(error){
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService, loginService, getUserService
}