const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const createUserService = async (name,email,password) => {
    try{
    //hash user password
    const hashPassword = await bcrypt.hash(password,saltRounds);
    //save user to db
    let result = await User.create({
        name: name,
        email: email,
        password: password,
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
            //check user
            console.log(">>> check user: ", user);
            //compare password
            const isMatchPassword = await bcrypt.compare(password,user.password);
            if(!isMatchPassword){
                return{
                    EC:2,
                    EM:"wrong password",
                }
            }else{
                //Create access token
                return "Create access token";
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

module.exports = {
    createUserService, loginService
}