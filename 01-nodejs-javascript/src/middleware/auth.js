require('dotenv').config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const white_lists = ["/", "/register", "/login"];

    // Cho phép preflight request (CORS)
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    // Nếu URL nằm trong danh sách trắng (public route)
    if (white_lists.find(item => `/v1/api` + item === req.originalUrl)) {
        return next();
    }

    // Kiểm tra Authorization header
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Thiếu token trong header Authorization"
            });
        }

        try {
            // Xác thực token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user={
                email:decoded.email,
                name:decoded.name,
                createdBy:"DuongBaCamLy"
            }
            console.log(">>> Check token:", decoded);
            next();
        } catch (error) {
            console.error(">>> JWT verify error:", error.message);
            return res.status(401).json({
                message: "Token không hợp lệ hoặc đã hết hạn"
            });
        }

    } else {
        return res.status(401).json({
            message: "Bạn chưa truyền access token ở header"
        });
    }
};

module.exports = auth;
