import connection from '../configs/connectDB';
var jwt = require('jsonwebtoken');
require('dotenv').config();

const getPageMember1 = async(req, res) => {
    // var tokenUser = req.cookies.token;
    // var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    // var phone_login = token.user.phone_login;
    // const [results, fields] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    // var { password_v1, otp, ...user } = results[0];
    return res.render('manage/index.ejs');
}

module.exports = {
    getPageMember1,
}