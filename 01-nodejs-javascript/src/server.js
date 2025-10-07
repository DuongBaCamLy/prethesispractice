require('dotenv').config();
const express = require('express'); //commonjs
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./routes/api');
const connection = require('./config/database');
const { getHomepage } = require('./controllers/homeController');
const user = require('./models/user');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 8888;

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

const webAPI = express.Router();
webAPI.get("/",getHomepage)
//khai báo route
app.use('/', webAPI);
app.use('/v1/api', apiRoutes);



(async () => {
    try {
        //using mongoose
        await connection();

        // 🔹 Tạo tài khoản mặc định nếu chưa có
        const defaultEmail = "admin@gmail.com";
        const defaultPassword = "123456"; // Bạn có thể đổi sau
        const existed = await user.findOne({ email: defaultEmail }).lean();

    if (!existed) {
      const hash = await bcrypt.hash(defaultPassword, 10);
      await user.create({
        name: "Admin",
        email: defaultEmail,
        password: hash,
        role: "admin"
      });
      console.log("✅ Created default admin account:");
      console.log(`   Email: ${defaultEmail}`);
      console.log(`   Password: ${defaultPassword}`);
    } else {
      console.log("ℹ️ Default admin already exists.");
    }

        app.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }
})();