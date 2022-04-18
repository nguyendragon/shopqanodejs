var jwt = require('jsonwebtoken');
require('dotenv').config();
import connection from '../configs/connectDB';

const middlewareController = async(req, res, next) => {
    // xác nhận token
    var tokenUser = req.cookies.token;
    try {
        var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
        var phone_login = token.user.phone_login;
        const [rows] = await connection.execute('SELECT `token` FROM `users` WHERE `phone_login` = ? AND veri = 1', [phone_login]);
        if (tokenUser == rows[0].token) {
            next();
        } else {
            return res.redirect("/account/login");
        }
    } catch (error) {
        return res.redirect("/account/login");
    }
}

export default middlewareController;