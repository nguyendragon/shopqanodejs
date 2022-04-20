import connection from '../configs/connectDB';
require('dotenv').config();

const getPageMember = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [results, fields] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    var { password_v1, otp, ...user } = results[0];
    return res.render('member/index.ejs', { user });
}

const sendMessageAdmin = (io) => {
    // var time = TimeCreate();
    io.on('connection', (socket) => {
        socket.on('data-server', (msg) => {
            io.emit('data-server', msg);
        });
        // socket.on("disconnect", () => {
        // console.log('a user disconnect ' + socket.id);
        // });
    });
}
module.exports = {
    sendMessageAdmin,
}