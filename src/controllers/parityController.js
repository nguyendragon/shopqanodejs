var jwt = require('jsonwebtoken');
require('dotenv').config();
import connection from '../configs/connectDB';

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
    return day + " " + month + " " + year + ". " + time + " " + am_pm;
}

const getPageParity = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    // user
    const [results, fields] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    var { password_v1, otp, ...user } = results[0];
    // giai đoạn
    const [giai_doan] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` = 0 ORDER BY `id` DESC LIMIT 1 ', []);
    const [orders_list] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` != 0 ORDER BY `id` DESC LIMIT 10 ', []);

    // lịch sử cược
    // const [history_order] = await connection.execute('SELECT * FROM `order_woipy` WHERE `phone_login` = ? ORDER BY `id` DESC', [phone_login]);

    return res.render('parity/index.ejs', { user, giai_doan, orders_list });
}

const getParitycat = async(req, res) => {
    const [giai_doan] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` != 0 ORDER BY `id` DESC LIMIT 0,30 ', []);
    return res.render('parity/paritycat.ejs', { giai_doan });
}

const renderParitycat = async(req, res) => {
    let limit = req.body.limit;
    let start = req.body.start;
    if (limit && start) {
        const [tage] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` != 0 ORDER BY `id` DESC LIMIT ?,? ', [start, limit]);
        const giai_doan = tage.map((list_tage) => list_tage.giai_doan);
        const ket_qua = tage.map((list_tage) => list_tage.ket_qua);
        return res.end(`{"giai_doan": "${giai_doan}","ket_qua": "${ket_qua}"}`);
    } else {
        res.end('{"message": "error"}');
    }
}

const renderIndexOrder = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;

    let limit = req.body.limit;
    let start = req.body.start;
    if (limit && start) {
        const [order] = await connection.execute('SELECT * FROM `order_woipy` WHERE `phone_login` = ? ORDER BY `id` DESC LIMIT ?,? ', [phone_login, start, limit]);
        const giai_doan = order.map((list_order) => list_order.giai_doan);
        const ket_qua = order.map((list_order) => list_order.ket_qua);
        const chon = order.map((list_order) => list_order.chon);
        const so_tien_cuoc = order.map((list_order) => list_order.so_tien_cuoc);
        const giao_hang = order.map((list_order) => list_order.giao_hang);
        const nhan_duoc = order.map((list_order) => list_order.nhan_duoc);
        const phi_dich_vu = order.map((list_order) => list_order.phi_dich_vu);
        const status = order.map((list_order) => list_order.status);
        const time_buy = order.map((list_order) => list_order.time_buy);
        const time_end = order.map((list_order) => list_order.time_end);

        return res.end(`{"giai_doan": "${giai_doan}","ket_qua": "${ket_qua}","chon": "${chon}","so_tien_cuoc": "${so_tien_cuoc}","giao_hang": "${giao_hang}","nhan_duoc": "${nhan_duoc}","phi_dich_vu": "${phi_dich_vu}","status": "${status}","time_buy": "${time_buy}","time_end": "${time_end}"}`);
    } else {
        res.end('{"message": "error"}');
    }
}

const getParityindex = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    // user
    const [user] = await connection.execute('SELECT `money` FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);

    return res.render('parity/parityindex.ejs', { user });
}

const JoinParity = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;

    var join = req.body.join; // tham gia vào
    var price = Number(req.body.price); // Số tiền cược
    var quantity = Number(req.body.quantity); // Số lượng cược
    var quantity1 = Number(req.body.quantity); // Số lượng cược để nhân với price rồi cho vào db    
    if (join && price && quantity && quantity1) {
        (quantity < 1) ? quantity = 1: quantity;
        switch (price) {
            case 2000:
                quantity *= 100;
                break;
            case 20000:
                quantity *= 400;
                break;
            case 100000:
                quantity *= 4000;
                break;
            case 500000:
                quantity *= 10000;
                break;
            default:
                break;
        }
        /***************  xác thực  *****************/
        const [user] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
        const [tage_woipy] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` = ?', [0]);
        var info_user = user[0];
        var permission = info_user.lever; // level
        var giai_doan = tage_woipy[0].giai_doan; // Lấy ra giai đoạn chưa có kết quả
        var price1 = price * quantity1; // Số tiền cược
        var giao_hang = price1 - quantity; // phí trừ dịch vụ = số tiền giao hàng
        var phi_dich_vu = quantity; // Phí dịch vụ
        /**_________________________________ */
        var hh_f1 = 0; // Hoa hồng f1
        var hh_f2 = 0; // Hoa hồng f2
        if (price1 >= 6000 && price1 < 10000) {
            hh_f1 = 30;
            hh_f2 = 20;
        } else if (price1 < 6000) {
            hh_f1 = 0;
            hh_f2 = 0;
        } else {
            hh_f1 = (price1 / 100) * 0.6;
            hh_f2 = (price1 / 100) * 0.4;
        }
        /**_________________________________ */
        var time = TimeCreate();
        /********************* Cược ***********************/

        if (info_user.token == tokenUser) {
            if (info_user.money < price1) {
                res.end('{"message": 0}');
            } else {
                const sql = 'INSERT INTO `order_woipy` SET `phone_login` = ?, `permission` = ?, `giai_doan` = ?, `chon` = ?, `so_tien_cuoc` = ?, `giao_hang` = ?, `phi_dich_vu` = ?, `hh_f1` = ?, `hh_f2` = ?, `time_buy` = ? ';
                const sql2 = 'UPDATE `users` SET `money` = ? WHERE `phone_login` = ?';
                await connection.execute(sql, [phone_login, permission, giai_doan, join, price1, giao_hang, phi_dich_vu, hh_f1, hh_f2, time]);
                await connection.execute(sql2, [info_user.money - price1, phone_login]);
                const [user2] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);

                res.end(`{"message": 1, "money": ${user2[0].money}, "so_tien_cuoc": ${price1},"giai_doan": ${giai_doan},  "giao_hang": ${giao_hang},  "join": "${join}", "phi_dich_vu": ${phi_dich_vu} }`);
            }
        } else {
            res.end('{"message": "error"}');
        }
    } else {
        res.end('{"message": "error"}');
    }
}

module.exports = {
    getPageParity,
    JoinParity,
    getParitycat,
    getParityindex,
    renderParitycat,
    renderIndexOrder,
}