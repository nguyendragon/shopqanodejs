import connection from '../configs/connectDB';
var jwt = require('jsonwebtoken');
let md5 = require('md5');
require('dotenv').config();


// trang login
const getPageLogin = (req, res) => {
    const idIntive = req.query.invite_key;
    var status = 0;
    if (idIntive != undefined && idIntive != "") {
        return res.render('login/index.ejs', { idIntive, status });
    } else {
        status = 1;
        return res.render('login/index.ejs', { status });
    }
}

// Đăng Nhập
const loginFunc = async(req, res) => {
    // 1. thành công
    // 2. không tồn tại
    // 3. sai mật khẩu
    let timeNow = Date.now();
    let phone_login = req.body.phone_login;
    let password_login = md5(req.body.password_login);
    const [rows] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND veri = 1', [phone_login]);
    if (rows.length == 0) {
        res.end('{"message": 2}');
    } else if (rows.length == 1 && rows[0]['password_v1'] != password_login) {
        res.end('{"message": 3}');
    } else {
        const { password_v1, otp, ip, token, total_money, password_payment, lever, ma_gt_f2, sented, ...others } = rows[0];
        const accessToken = jwt.sign({
            user: {...others },
            timeNow: timeNow
        }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "7d" });
        await connection.execute('UPDATE `users` SET `token` = ?, `status_login` = ? WHERE `phone_login` = ? ', [accessToken, 1, phone_login]);
        res.end(`{"message": 1, "username": "${phone_login}", "token": "${accessToken}"}`);
    }
}

// Gửi OTP
const sendOTP = async(req, res) => {
    let phone_signup = req.body.phone_signup;
    let ip = req.body.ip;
    let otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    if (phone_signup.length == 9) {
        const [result] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ?', [phone_signup]);
        const [checkIP] = await connection.execute('SELECT `ip` FROM `users` WHERE `ip` = ?', [ip]);
        if (result.length == 0) {
            if (checkIP.length > 2) {
                res.end('{"message": "error"}');
            } else {
                await connection.execute('INSERT INTO `users` SET `phone_login` = ?, `token` = ?, `ip` = ?, `otp` = ?', [phone_signup, "0", ip, otp]);
                res.end('{"message": 1}');
            }
        } else if (result.length != 0) {
            await connection.execute('UPDATE `users` SET `sented` = 0, `otp` = ? WHERE `phone_login` = ? ', [otp, phone_signup]);
            res.end('{"message": 1}');
        }
    } else {
        res.end('{"message": "error"}');
    }
}

// Đăng ký
const register = async(req, res) => {
    // 0. Số điện thoại đã được đăng ký
    // 1. thành công
    // 2. Sai mã xác minh
    // 3. Mã đề xuất không tồn tại
    function readableRandomStringMaker(length) {
        for (var string = ''; string.length < length; string += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.random() * 62 | 0));
        return string;
    }
    var id_user = readableRandomStringMaker(16);
    var phone_signup = req.body.phone_signup;
    var password_v1 = md5(req.body.password_v1);
    var codeOTP = req.body.codeOTP;
    var MaGioiThieu = req.body.MaGioiThieu;
    var otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    let MaGioiThieu_User = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
    let name_user = "Member" + phone_signup.substring(5);

    // lấy ra số tiền khuyến mãi trong temp
    const [money_temp] = await connection.execute("SELECT `khuyen_mai` FROM `temp`", []);

    const TimeCreate = () => {
        var arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        const dateNow = new Date();
        var day = dateNow.getDate() < 10 ? "0" + dateNow.getDate() : dateNow.getDate();
        var month = arr[dateNow.getMonth()];
        var year = dateNow.getFullYear();
        var hour = dateNow.getHours() < 10 ? "0" + dateNow.getHours() : dateNow.getHours();
        var minute = dateNow.getMinutes() < 10 ? "0" + dateNow.getMinutes() : dateNow.getMinutes();
        var time = hour + ":" + minute;
        var am_pm = "";
        if (dateNow.getHours() >= 12) {
            am_pm = "pm";
        } else {
            am_pm = "am";
        }
        return day + " " + month + " " + year + ", " + time + " " + am_pm;
    }


    var timeCr = TimeCreate();

    if (phone_signup) {
        const [result] = await connection.execute("SELECT * FROM `users` WHERE `phone_login` = ? AND `otp` = ? ", [phone_signup, codeOTP]);
        if (result.length == 0) {
            res.end('{"message": 2}');
        } else if (result[0].veri == 1) {
            res.end('{"message": 0}');
        } else if (result[0].veri == 0) {
            const [rows] = await connection.execute("SELECT `ma_gt` FROM `users` WHERE ma_gt = ? ", [MaGioiThieu]);
            if (rows.length == 1) {
                var sql = 'UPDATE `users` SET `id_user` = ?, `password_v1` = ?, `name_user` = ?, `ma_gt` = ?, `ma_gt_f1` = ?, `veri` = 1, `otp` = ?, `time` = ?, `money` = ? WHERE `phone_login` = ? ';
                await connection.execute(sql, [id_user, password_v1, name_user, MaGioiThieu_User, MaGioiThieu, otp, timeCr, money_temp[0].khuyen_mai, phone_signup]);
                var sql_wallet_bonus = 'INSERT INTO `wallet_bonus` SET `phone_login` = ?, `time` = ?';
                await connection.execute(sql_wallet_bonus, [phone_signup, timeCr]);
                res.end('{"message": 1}');
            } else {
                res.end('{"message": 3}');
            }
        }
    }
}


module.exports = {
    getPageLogin,
    loginFunc,
    sendOTP,
    register,
}