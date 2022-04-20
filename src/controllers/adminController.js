import connection from '../configs/connectDB';
var jwt = require('jsonwebtoken');
require('dotenv').config();

const getPageMember1 = async(req, res) => {
    // var tokenUser = req.cookies.token;
    // var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    // var phone_login = token.user.phone_login;
    // const [results, fields] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    // var { password_v1, otp, ...user } = results[0];
    const [giai_doan] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` = 0 ORDER BY `id` DESC LIMIT 1 ', []);
    const [orders_list] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` != 0 ORDER BY `id` DESC LIMIT 10 ', []);
    const [orders_waiting] = await connection.execute('SELECT * FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" ORDER BY `id` ASC ', []);


    const [totalMoneyRed] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "d" ', []);
    const [totalMoneyGreen] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "x" ', []);
    const [totalMoneyViolet] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "t" ', []);
    const [totalMoney] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` != "d" AND `chon` != "x" AND `chon` != "t"', []);
    const [totalMoney0] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "0" ', []);
    const [totalMoney1] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "1" ', []);
    const [totalMoney2] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "2" ', []);
    const [totalMoney3] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "3" ', []);
    const [totalMoney4] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "4" ', []);
    const [totalMoney5] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "5" ', []);
    const [totalMoney6] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "6" ', []);
    const [totalMoney7] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "7" ', []);
    const [totalMoney8] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "8" ', []);
    const [totalMoney9] = await connection.execute('SELECT SUM(so_tien_cuoc) AS total FROM `order_woipy` WHERE `ket_qua` = 0 AND `status` = 0 AND `permission` != "admin" AND `permission` != "boss" AND `chon` = "9" ', []);

    const [topNap] = await connection.execute('SELECT * FROM `users` WHERE `lever` != "admin" AND `lever` != "boss" AND `veri` = 1 ORDER BY `total_money` DESC LIMIT 10', []);

    function formatMoneys(money) {
        return (money == null) ? 0 : money;
    }
    var totalRed = formatMoneys(totalMoneyRed[0].total); // tổng số tiền cược đỏ
    var totalGreen = formatMoneys(totalMoneyGreen[0].total); // tổng số tiền cược xanh
    var totalViolet = formatMoneys(totalMoneyViolet[0].total); // tổng số tiền cược tím

    var totalNumber = formatMoneys(totalMoney[0].total); // tổng s ố tiền cược số
    var totalNumber0 = formatMoneys(totalMoney0[0].total); // tổng số tiền cược 0
    var totalNumber1 = formatMoneys(totalMoney1[0].total); // tổng số tiền cược 1
    var totalNumber2 = formatMoneys(totalMoney2[0].total); // tổng số tiền cược 2
    var totalNumber3 = formatMoneys(totalMoney3[0].total); // tổng số tiền cược 3
    var totalNumber4 = formatMoneys(totalMoney4[0].total); // tổng số tiền cược 4
    var totalNumber5 = formatMoneys(totalMoney5[0].total); // tổng số tiền cược 5
    var totalNumber6 = formatMoneys(totalMoney6[0].total); // tổng số tiền cược 6
    var totalNumber7 = formatMoneys(totalMoney7[0].total); // tổng số tiền cược 7
    var totalNumber8 = formatMoneys(totalMoney8[0].total); // tổng số tiền cược 8
    var totalNumber9 = formatMoneys(totalMoney9[0].total); // tổng số tiền cược 9

    return res.render('manage/index.ejs', { topNap, orders_list, giai_doan, orders_waiting, totalRed, totalGreen, totalViolet, totalNumber, totalNumber0, totalNumber1, totalNumber2, totalNumber3, totalNumber4, totalNumber5, totalNumber6, totalNumber7, totalNumber8, totalNumber9 });
}

const Statistical = async(req, res) => {
    return res.render('manage/statistical.ejs');
}

const browseRecharge = async(req, res) => {
    return res.render('manage/recharge.ejs');
}

const rechargeRecord = async(req, res) => {
    return res.render('manage/rechargeRecord.ejs');
}

const withdraw = async(req, res) => {
    return res.render('manage/withdraw.ejs');
}

const withdrawBonus = async(req, res) => {
    return res.render('manage/withdrawBonus.ejs');
}

const bonusRecord = async(req, res) => {
    return res.render('manage/bonusRecord.ejs');
}

const withdrawRecord = async(req, res) => {
    return res.render('manage/withdrawRecord.ejs');
}

const listMembers = async(req, res) => {
    return res.render('manage/members.ejs');
}

const createBonus = async(req, res) => {
    return res.render('manage/createBonus.ejs');
}

const settings = async(req, res) => {
    return res.render('manage/settings.ejs');
}


// xác nhận admin
const middlewareAdminController = async(req, res, next) => {
    // xác nhận token
    var tokenUser = req.cookies.token;
    try {
        var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
        var phone_login = token.user.phone_login;
        const [rows] = await connection.execute('SELECT `token`,`lever` FROM `users` WHERE `phone_login` = ? AND veri = 1', [phone_login]);
        if (tokenUser == rows[0].token) {
            if (rows[0].lever == 'admin' || rows[0].lever == 'boss') {
                next();
            } else {
                return res.redirect("/index");
            }
        } else {
            return res.redirect("/account/login");
        }
    } catch (error) {
        return res.redirect("/account/login");
    }
}


module.exports = {
    getPageMember1,
    Statistical,
    browseRecharge,
    rechargeRecord,
    withdraw,
    withdrawBonus,
    bonusRecord,
    withdrawRecord,
    listMembers,
    createBonus,
    settings,
    middlewareAdminController
}