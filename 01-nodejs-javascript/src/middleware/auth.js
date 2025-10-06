require('dotenv').config();
const jwt = require("jsonwebtoken");
const auth = (req,res,next) => {
    const white_lists = ["/","/register","/login"];
    // console.log(">>> Check req: ",req.originalUrl, req.route);

    if(white_lists.find(item => `/v1/api`+ item === req.originalUrl) ){
        next();
    }else{
        if(req.headers&&req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];

            //verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            console.log(">>> Check token: ",decoded)
            next();

        } else {
        return res.status(401).json({
            message:"Ban chua truyen access token o header"})
        }
    }

}
module.exports = auth;