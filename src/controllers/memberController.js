import { logPlugin } from '@babel/preset-env/lib/debug';
import connection from '../configs/connectDB';
var jwt = require('jsonwebtoken');
require('dotenv').config();
let md5 = require('md5');

const getPageMember = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [results, fields] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    var { password_v1, otp, ...user } = results[0];
    return res.render('member/index.ejs', { user });
}

const getmyTask = (req, res) => {
    return res.render('member/myTask.ejs');
}

const redenvelope = (req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    return res.render('member/redenvelope.ejs', { token });
}

// promotion
const promotion = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var ma_gt = token.user.ma_gt;
    const [wallet_bonus] = await connection.execute('SELECT * FROM `wallet_bonus` WHERE `phone_login` = ?', [phone_login]);
    const [quantity_f1] = await connection.execute('SELECT COUNT(*) AS soluong FROM `users` WHERE `ma_gt_f1` = ? ', [ma_gt]);
    const [list_f1] = await connection.query('SELECT `ma_gt` FROM `users` WHERE `ma_gt_f1` = ?', [ma_gt]);
    const [online_f1] = await connection.query('SELECT COUNT(*) as online_f1 FROM `users` WHERE `ma_gt_f1` = ? AND `status_login` = 1', [ma_gt]);
    var countF2 = 0;
    var countOnlineF2 = 0;
    if (list_f1.length > 0) {
        for (let i = 0; i < list_f1.length; i++) {
            var list_f1s = list_f1[i].ma_gt;
            var [list_f2] = await connection.query('SELECT `ma_gt` AS f2 FROM `users` WHERE `ma_gt_f1` = ?', [list_f1s]);
            if (list_f2.length > 0) {
                var f2promax = list_f2[0].f2;
                const [online_f2] = await connection.query('SELECT `status_login` FROM `users` WHERE `ma_gt` = ?', [f2promax]);
                if (online_f2[0].status_login == 1) {
                    countOnlineF2 += 1;
                }
                countF2 += list_f2.length;
            }
        }
    }
    return res.render('member/promotion/index.ejs', { wallet_bonus, quantity_f1, countF2, online_f1, countOnlineF2 });
}

const promotionApply = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [apply] = await connection.execute('SELECT * FROM `wallet_bonus` WHERE `phone_login` = ?', [phone_login]);

    return res.render('member/promotion/apply.ejs', { apply });
}

const withdrawBonus = async(req, res) => {
    // 0. Đang chờ
    // 1. Thành công
    // 2. Có đơn hàng chưa duyệt 
    // 3. Không đủ tiền
    // 4. Hôm nay bạn đã rút tiền rồi

    function formatTime(time) {
        return (time < 10) ? "0" + time : time;
    }
    const dateNow = new Date();
    var day = formatTime(dateNow.getDate());
    var month = formatTime(dateNow.getMonth() + 1);
    var year = dateNow.getFullYear();
    var time_month_year = String(month) + " " + String(year);

    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;

    var bonus = req.body.bonus;
    if (bonus >= 5000 && bonus <= 2000000) {
        const [apply] = await connection.execute('SELECT `money` FROM `wallet_bonus` WHERE `phone_login` = ?', [phone_login]);
        const [withdraw_bonus] = await connection.execute('SELECT * FROM `withdraw_bonus` WHERE `phone_login` = ? ORDER BY `id` DESC LIMIT 1', [phone_login]);
        if (apply[0].money >= Number(bonus)) {
            if (withdraw_bonus[0].day == day && withdraw_bonus[0].time_month_year == time_month_year) {
                res.end('{"message": 4}');
            } else {
                if (withdraw_bonus[0].status != 0) {
                    // tạo đơn rút hoa hồng
                    const sql = "INSERT INTO `withdraw_bonus` SET `phone_login` = ?, `money` = ?, day = ?, time_month_year = ?, status = 0";
                    await connection.execute(sql, [phone_login, bonus, day, time_month_year]);
                    // update tiền
                    const sql2 = "UPDATE `wallet_bonus` SET `money` = ? WHERE `phone_login` = ?";
                    await connection.execute(sql2, [apply[0].money - bonus, phone_login]);
                    res.end('{"message": 1}');
                } else {
                    res.end('{"message": 2}');
                }
            }
        } else {
            res.end('{"message": 3}');
        }
    } else {
        res.end('{"message": "error"}');
    }
}

const promotionApplyRecord = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var ma_gt = token.user.ma_gt;
    const [withdraw_bonus] = await connection.execute('SELECT * FROM `withdraw_bonus` WHERE `phone_login` = ? ORDER BY `id` DESC', [phone_login]);
    return res.render('member/promotion/applyRecord.ejs', { withdraw_bonus });
}

// danh sách hoa hồng
const promotionBonusRecord = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var ma_gt = token.user.ma_gt;
    var ma_gt_f1 = token.user.ma_gt_f1;

    // ví bonus
    const [wallet_bonus] = await connection.query('SELECT money, ref_f1, ref_f2 FROM `wallet_bonus` WHERE `phone_login` = ?', [phone_login]);

    const [quantity_f1] = await connection.execute('SELECT COUNT(*) AS soluong FROM `users` WHERE `ma_gt_f1` = ? ', [ma_gt]);
    const [list_f1] = await connection.query('SELECT `ma_gt` FROM `users` WHERE `ma_gt_f1` = ?', [ma_gt]);

    // danh sách hoa hồng f1
    const [order_woipy_f1] = await connection.query('SELECT phone_login, name_user, hh_f1, hh_f2 FROM `order_woipy` WHERE `ma_gt_f1` = ? AND `hh_f1` > 0 ORDER BY `id` DESC LIMIT 100', [ma_gt]);

    var countF2 = 0;
    var listArray = []; // đẩy danh sách hh f2 vào đây
    if (list_f1.length > 0) {
        for (let i = 0; i < list_f1.length; i++) {
            var list_f1s = list_f1[i].ma_gt;
            var [list_f2] = await connection.query('SELECT `ma_gt` AS f2 FROM `users` WHERE `ma_gt_f1` = ?', [list_f1s]);
            if (list_f2.length > 0) {
                var f2s = list_f2[0].f2;
                var [order_woipy_f2] = await connection.query('SELECT phone_login, name_user, hh_f1, hh_f2 FROM `order_woipy` WHERE `ma_gt` = ? AND `hh_f2` > 0 ORDER BY `id` DESC LIMIT 100', [f2s]);
                listArray.push(order_woipy_f2);
                countF2 += list_f2.length;
            }
        }
    }
    return res.render('member/promotion/bonusRecord.ejs', { quantity_f1, countF2, wallet_bonus, order_woipy_f1, listArray });
}

const promotionPromotion = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var ma_gt = token.user.ma_gt;
    const [ref_f1] = await connection.execute('SELECT name_user, time, ma_gt FROM `users` WHERE `ma_gt_f1` = ? ORDER BY `id` DESC', [ma_gt]);
    var ref_f2 = [];
    if (ref_f1.length > 0) {
        for (let i = 0; i < ref_f1.length; i++) {
            var list_f1s = ref_f1[i].ma_gt;
            var [ref_f2s] = await connection.query('SELECT name_user, time, ma_gt FROM `users` WHERE `ma_gt_f1` = ? ORDER BY `id` DESC', [list_f1s]);
            if (ref_f2s.length > 0) {
                ref_f2.push(ref_f2s);
            }
        }
    }
    return res.render('member/promotion/promotion.ejs', { ref_f1, ref_f2 });
}

const promotionShare = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [ma_gt] = await connection.execute('SELECT `ma_gt` FROM `users` WHERE `phone_login` = ?', [phone_login]);
    return res.render('member/promotion/share.ejs', { ma_gt });
}

const myWallet = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [results, fields] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    var { password_v1, otp, ...user } = results[0];
    return res.render('member/myWallet.ejs', { user });
}

// myBank
const myBank = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [results, fields] = await connection.execute('SELECT * FROM `banking_user` WHERE `phone_login` = ?', [phone_login]);
    return res.render('member/myBank.ejs', { results });
}
const addBanking = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    /////////////
    var grid_banking = req.body.grid_banking;
    var otp = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    if (grid_banking) {
        await connection.execute('UPDATE `users` SET `otp` = ?, `sented` = 0 WHERE `phone_login` = ?', [otp, phone_login]);
        res.end('{"message": 1}');
    }
    // 1. Thành công 
    // 2. Mã xác minh không chính xác
    // 3. tài khoản đã tồn tại trong hệ thống

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
    var name_user_bank = req.body.name_user_bank;
    var name_bank = req.body.name_bank;
    var stk_bank = req.body.stk_bank;
    var tinh = req.body.tinh;
    var thanhpho = req.body.thanhpho;
    var diachi = req.body.diachi;
    var sdt = req.body.sdt;
    var email_bank = req.body.email_bank;
    var otp_bank = req.body.otp_bank;
    var otp_delete = req.body.otp_delete;
    var typeSendOTP = req.body.type;

    if (typeSendOTP === "add") {
        const [results] = await connection.execute('SELECT `otp` FROM `users` WHERE `phone_login` = ?', [phone_login]);
        const [banking] = await connection.execute('SELECT `stk` FROM `banking_user` WHERE `stk` = ?', [stk_bank]);
        if (results[0].otp == otp_bank) {
            if (banking.length > 0) {
                res.end('{"message": 3}');
            } else {
                const sql = 'INSERT INTO `banking_user` SET `phone_login` = ?, `name` = ?, `name_banking` = ?, `stk` = ?, `tinh` = ?, `thanhpho` = ?, `diachi` = ?, `sdt` = ?, `email` = ?, `time` = ? ';
                await connection.execute(sql, [phone_login, name_user_bank, name_bank, stk_bank, tinh, thanhpho, diachi, sdt, email_bank, timeCr]);
                await connection.execute('UPDATE `users` SET `otp` = ? WHERE `phone_login` = ?', [otp, phone_login]);
                res.end('{"message": 1}');
            }
        } else {
            res.end('{"message": 2}');
        }
    }

    if (typeSendOTP === "update") {
        const [results] = await connection.execute('SELECT `otp` FROM `users` WHERE `phone_login` = ?', [phone_login]);
        const [banking] = await connection.execute('SELECT `stk` FROM `banking_user` WHERE `stk` = ?', [stk_bank]);
        if (results[0].otp == otp_bank) {
            if (banking.length > 0) {
                res.end('{"message": 3}');
            } else {
                const sql = 'UPDATE `banking_user` SET `name` = ?, `name_banking` = ?, `stk` = ?, `tinh` = ?, `thanhpho` = ?, `diachi` = ?, `sdt` = ?, `email` = ?, `time` = ? WHERE `phone_login` = ? ';
                await connection.execute(sql, [name_user_bank, name_bank, stk_bank, tinh, thanhpho, diachi, sdt, email_bank, timeCr, phone_login]);
                await connection.execute('UPDATE `users` SET `otp` = ? WHERE `phone_login` = ?', [otp, phone_login]);
                res.end('{"message": 1}');
            }
        } else {
            res.end('{"message": 2}');
        }
    }

    if (typeSendOTP === "delete") {
        const [results] = await connection.execute('SELECT `otp` FROM `users` WHERE `phone_login` = ?', [phone_login]);
        const [banking] = await connection.execute('SELECT `stk` FROM `banking_user` WHERE `phone_login` = ?', [phone_login]);
        if (results[0].otp == otp_delete) {
            if (banking.length > 0) {
                const sql = 'DELETE FROM `banking_user` WHERE `phone_login` = ?';
                await connection.execute(sql, [phone_login]);
                res.end('{"message": 1}');
            }
        } else {
            res.end('{"message": 0}');
        }
    }

}

// myAddress
const myAddress = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [results, fields] = await connection.execute('SELECT * FROM `address_user` WHERE `phone_login` = ?', [phone_login]);
    return res.render('member/myAddress.ejs', { results });
}

const addAddress = async(req, res) => {
    // 1. Thành công 
    // 2. Mã xác minh không chính xác
    // 3. tài khoản đã tồn tại trong hệ thống
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
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
    var full_name = req.body.full_name;
    var phone_number = req.body.phone_number;
    var pin = req.body.pin;
    var Whatsapp = req.body.Whatsapp;
    var address_detail = req.body.address_detail;
    var city = req.body.city;
    var Conscious = req.body.Conscious;
    if (full_name.length < 50 && phone_number.length < 15 && pin.length < 50 && Whatsapp.length < 50 && address_detail.length <= 100 && city.length < 50 && Conscious.length < 20) {
        const [results] = await connection.execute('SELECT `phone_login` FROM `address_user` WHERE `phone_login` = ?', [phone_login]);
        if (results.length > 0) {
            res.end('{"message": 0}');
        } else {
            const sql = 'INSERT INTO `address_user` SET `phone_login` = ?, `hovaten` = ?, `sdt` = ?, `ma_pin` = ?, `what_app` = ?, `address_require` = ?, `city` = ?, `tinh` = ?, `time` = ? ';
            await connection.execute(sql, [phone_login, full_name, phone_number, pin, Whatsapp, address_detail, city, Conscious, timeCr]);
            res.end('{"message": 1}');
        }
    } else {
        res.end('{"message": "error"}');
    }
}

// security
const security = (req, res) => {
    return res.render('member/security/security.ejs');
}

const securityNikname = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [results, fields] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    var { password_v1, otp, ...user } = results[0];
    return res.render('member/security/nikname.ejs', { user });
}

const editNikname = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var get_input = req.body.get_input;
    if (get_input.length <= 25) {
        await connection.execute('UPDATE `users` SET `name_user` = ? WHERE `phone_login` = ?', [get_input, phone_login]);
        res.end('{"message": 1}');
    } else {
        res.end('{"message": "error"}');
    }
}

const changePassword = (req, res) => {
    return res.render('member/security/changePassword.ejs');
}

const editPassword = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var get_input1 = md5(req.body.get_input1);
    var get_input2 = md5(req.body.get_input2);
    const [results] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    if (results[0].password_v1 == get_input1) {
        await connection.execute('UPDATE `users` SET `password_v1` = ? WHERE `phone_login` = ?', [get_input2, phone_login]);
        res.end('{"message": 1}');
    } else {
        res.end('{"message": 0}');
    }
}

const changePaymentPassword = (req, res) => {
    return res.render('member/security/changePaymentPassword.ejs');
}

const editPaymentPassword = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var controlPaymentOTP = req.body.controlPaymentOTP;
    var controlPayment1 = md5(req.body.controlPayment1);
    const [results] = await connection.execute('SELECT `otp` FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    if (results[0].otp == controlPaymentOTP) {
        await connection.execute('UPDATE `users` SET `password_payment` = ? WHERE `phone_login` = ?', [controlPayment1, phone_login]);
        res.end('{"message": 1}');
    } else {
        res.end('{"message": 0}');
    }
}

// financial
const financial = (req, res) => {
    return res.render('member/financial.ejs');
}

const about = (req, res) => {
    return res.render('member/about/index.ejs');
}

const aboutPivacyPolicy = (req, res) => {
    return res.render('member/about/privacyPolicy.ejs');
}

const aboutRda = (req, res) => {
    return res.render('member/about/rda.ejs');
}

const aboutAppStatement = (req, res) => {
    return res.render('member/about/appStatement.ejs');
}

const aboutUS = (req, res) => {
    return res.render('member/about/aboutUs.ejs');
}

const contactUs = (req, res) => {
    return res.render('member/contactUs.ejs');
}

const complaint = (req, res) => {
    return res.render('member/complaint/index.ejs');
}

const complaintHelp = (req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    return res.render('member/complaint/help.ejs', { token });
}

const trade = (req, res) => {
    return res.render('member/trade.ejs');
}

const recharge = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [users] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    var { password_v1, otp, ...user } = users[0];
    return res.render('member/financial/recharge.ejs', { user });
}

const rechargeRecord = async(req, res) => {
    // 0. Đang chờ
    // 1. Thành công
    // 2. Thất bại
    // 3. Đã đóng
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [listrechargeWaiting] = await connection.execute('SELECT * FROM `recharge` WHERE `phone_login` = ? AND `status` = 0 ORDER BY `id` DESC', [phone_login]);
    const [listrechargeSuccess] = await connection.execute('SELECT * FROM `recharge` WHERE `phone_login` = ? AND `status` = 1 ORDER BY `id` DESC', [phone_login]);
    const [listrechargeFail] = await connection.execute('SELECT * FROM `recharge` WHERE `phone_login` = ? AND `status` = 2 ORDER BY `id` DESC', [phone_login]);
    const [listrechargeClosed] = await connection.execute('SELECT * FROM `recharge` WHERE `phone_login` = ? AND `status` = 3 ORDER BY `id` DESC', [phone_login]);

    return res.render('member/financial/rechargeRecord.ejs', { listrechargeWaiting, listrechargeSuccess, listrechargeFail, listrechargeClosed });
}

const withdraw = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [users] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    const [bankings] = await connection.execute('SELECT * FROM `banking_user` WHERE `phone_login` = ?', [phone_login]);
    var { password_v1, otp, ...user } = users[0];
    if (bankings.length == 0) {
        return res.redirect('/member/MyBank');
    } else {
        return res.render('member/financial/withdraw.ejs', { user, bankings });
    }
}

const handlingwithdraw = async(req, res) => {

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

    function readableRandomStringMaker(length) {
        const dateNow = new Date();
        var year = dateNow.getFullYear();
        var month1 = Number(dateNow.getMonth()) + 1;
        var month2 = month1 < 10 ? "0" + month1 : month1;
        var day = dateNow.getDate() < 10 ? "0" + dateNow.getDate() : dateNow.getDate();
        for (var string = ''; string.length < length; string += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.random() * 62 | 0));
        return String(year) + String(month2) + String(day) + string;
    }
    const money = req.body.money;
    const password_payment = md5(req.body.password_payment);
    const checkType = req.body.checkType;
    const id_txn = readableRandomStringMaker(16);
    const tokenUser = req.cookies.token;
    const token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    const phone_login = token.user.phone_login;

    var total_fee = 0;
    if (money <= 500000) {
        total_fee = 15000;
    } else if (money > 500000) {
        total_fee = (money / 100) * 3;
    }

    // 1. thành công 
    // 2. không đủ tiền
    // 3. chưa cài pass rút tiền
    // 4. sai password
    // 5. có đơn hàng chưa được duyệt

    const realmoney = money - total_fee;
    const time = TimeCreate();

    const [results] = await connection.execute('SELECT `password_payment`, `money` FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);
    const [banking] = await connection.execute('SELECT `name_banking`, `stk` FROM `banking_user` WHERE `phone_login` = ?', [phone_login]);
    const [don_hang] = await connection.execute('SELECT COUNT(*) as totalDH FROM `withdraw` WHERE `phone_login` = ? AND `status` = 0', [phone_login]);
    if (money >= 200000 && password_payment && checkType && id_txn && phone_login) {
        if (results[0].money - money >= 100000) {
            if (results[0].password_payment == '0') {
                res.end('{"message": 3}');
            } else if (results[0].password_payment != password_payment) {
                res.end('{"message": 4}');
            } else if (don_hang[0].totalDH > 0) {
                res.end('{"message": 5}');
            } else {
                await connection.execute('UPDATE `users` SET `money` = ? WHERE `phone_login` = ? ', [results[0].money - money, phone_login]);
                await connection.execute('INSERT INTO `financial_details` SET `phone_login` = ?, `loai` = ?, `money` = ?, `time` = ?', [phone_login, 5, money, time]);
                var sql = 'INSERT INTO `withdraw` SET `phone_login` = ?, `id_don` = ?, `name_banking` = ?, `stk` = ?, `money` = ?, `realmoney` = ?, `fee` = ?, `status` = 0, `time` = ? ';
                await connection.execute(sql, [phone_login, id_txn, banking[0].name_banking, banking[0].stk, money, realmoney, total_fee, time]);
                res.end('{"message": 1}');
            }
        } else {
            res.end('{"message": 2}');
        }
    } else {
        res.end('{"message": "error"}');
    }
}

const withdrawRecord = async(req, res) => {
    // 0. Đang chờ
    // 1. Thành công
    // 2. Thất bại
    // 3. Đã đóng
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [withdrawWaiting] = await connection.execute('SELECT * FROM `withdraw` WHERE `phone_login` = ? AND `status` = 0 ORDER BY `id` DESC', [phone_login]);
    const [withdrawSuccess] = await connection.execute('SELECT * FROM `withdraw` WHERE `phone_login` = ? AND `status` = 1 ORDER BY `id` DESC', [phone_login]);
    const [withdrawFail] = await connection.execute('SELECT * FROM `withdraw` WHERE `phone_login` = ? AND `status` = 2 ORDER BY `id` DESC', [phone_login]);
    const [withdrawClose] = await connection.execute('SELECT * FROM `withdraw` WHERE `phone_login` = ? AND `status` = 3 ORDER BY `id` DESC', [phone_login]);
    return res.render('member/financial/withdrawRecord.ejs', { withdrawWaiting, withdrawSuccess, withdrawFail, withdrawClose });
}


const couleepay = async(req, res) => {
    var id_txn = req.params.id_txn;
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [couleepays] = await connection.execute('SELECT * FROM `recharge` WHERE `phone_login` = ? AND `id_txn` = ? ', [phone_login, id_txn]);
    return res.render('member/couleepay/index.ejs', { id_txn, couleepays });
}

const couleepayTXN = async(req, res) => {
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

    function readableRandomStringMaker(length) {
        const dateNow = new Date();
        var year = dateNow.getFullYear();
        var month1 = Number(dateNow.getMonth()) + 1;
        var month2 = month1 < 10 ? "0" + month1 : month1;
        var day = dateNow.getDate() < 10 ? "0" + dateNow.getDate() : dateNow.getDate();
        for (var string = ''; string.length < length; string += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.random() * 62 | 0));
        return String(year) + String(month2) + String(day) + string;
    }

    var timeCr = TimeCreate();
    var id_txn = readableRandomStringMaker(16);

    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var valueMoney = req.body.valueMoney;
    let ma_don = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
    if (valueMoney >= 100000 && valueMoney <= 80000000) {
        const [results] = await connection.execute('SELECT * FROM `recharge` WHERE `phone_login` = ? AND `status` = 0', [phone_login]);
        if (results.length > 0) {
            res.end('{"message": 0}');
        } else {
            const sql = "INSERT INTO `recharge` SET `phone_login` = ?, `money` = ?, id_txn = ?, ma_don = ?, time = ?";
            await connection.execute(sql, [phone_login, valueMoney, id_txn, ma_don, timeCr]);
            res.end(`{"message": 1, "id_txn": "${id_txn}"}`);
        }
    } else {
        res.end(`{"message": "error"}`);
    }
}

const receiptID = async(req, res) => {
    var id_txn = req.params.id_txn;
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [couleepays] = await connection.execute('SELECT * FROM `recharge` WHERE `phone_login` = ? AND `id_txn` = ? ', [phone_login, id_txn]);
    const [bankings] = await connection.execute('SELECT * FROM `account_banking`', []);
    return res.render('member/couleepay/receipt.ejs', { id_txn, couleepays, bankings });
}

const receipt = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var typeS = req.body.typeS;
    var id_don_hang = req.body.id_don_hang;
    var endTime = endTime = (+new Date) + 1000 * (60 * 10 + 0) + 500;
    const [couleepays] = await connection.execute('SELECT * FROM `recharge` WHERE `phone_login` = ? AND `loai` = "0" AND `status` = 0 AND `id_txn` = ? ', [phone_login, id_don_hang]);
    if (couleepays.length > 0) {
        await connection.execute('UPDATE `recharge` SET `loai` = ?, `timeEnd` = ? WHERE `phone_login` = ? AND id_txn = ? ', [typeS, endTime, phone_login, id_don_hang]);
        res.end('{"message": 1}');
    } else {
        res.end('{"message": 0}');
    }
}

const closeReceipt = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var id_don_hang = req.body.id_don_hang;
    const [checkReceipt] = await connection.execute('SELECT * FROM `recharge` WHERE `phone_login` = ? AND `id_txn` = ? ', [phone_login, id_don_hang]);
    if (checkReceipt.length > 0) {
        await connection.execute('UPDATE `recharge` SET `status` = 3 WHERE `phone_login` = ? AND id_txn = ? ', [phone_login, id_don_hang]);
        res.end('{"message": 1}');
    } else {
        res.end('{"message": 0}');
    }
}

const Pageredenvelope = async(req, res) => {
    // 1. Còn lixi
    // 2. Hết lixi
    var id_txn = req.query.id; // id lixi
    let status_lixi = 1;
    if (id_txn != undefined && id_txn != "") {
        var [checkRedenvelope] = await connection.execute('SELECT * FROM `redenvelope` WHERE `id_txn` = ? ', [id_txn]);
    }
    if (id_txn == undefined || id_txn == "" || checkRedenvelope.length <= 0) {
        return res.redirect('/index');
    } else if (checkRedenvelope.length > 0 && checkRedenvelope[0].used != 0) {
        status_lixi = 1;
        var [historyRedenvelope] = await connection.execute('SELECT * FROM `history_redenvelope` WHERE `id_txn` = ? ', [id_txn]);
        return res.render('redenvelope/index.ejs', { status_lixi, checkRedenvelope, historyRedenvelope });
    } else if (checkRedenvelope.length > 0 && checkRedenvelope[0].used == 0) {
        status_lixi = 2;
        var [historyRedenvelope] = await connection.execute('SELECT * FROM `history_redenvelope` WHERE `id_txn` = ? ', [id_txn]);
        return res.render('redenvelope/index.ejs', { status_lixi, checkRedenvelope, historyRedenvelope });
    }
}

const methodRedenvelope = async(req, res) => {
    // 1. thành công 
    // 2. đã hết
    // 3. số điện thoại không tồn tại 
    // 4. đã nhận rồi 
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
    var time = TimeCreate();
    var check_account = req.body.check_account;
    var id_txn = req.body.id;
    const [checkRedenvelope] = await connection.execute('SELECT * FROM `redenvelope` WHERE `id_txn` = ? ', [id_txn]);
    const [checkUser] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? ', [check_account]);
    const [checkHistoryRedenvelope] = await connection.execute('SELECT * FROM `history_redenvelope` WHERE `phone_login` = ? AND `id_txn` = ? ', [check_account, id_txn]);
    if (checkRedenvelope.length > 0) {
        if (checkRedenvelope[0].used > 0) {
            if (checkUser.length > 0) {
                if (checkHistoryRedenvelope.length == 0) {
                    if (checkRedenvelope[0].type == 'ref') {
                        const sql = 'UPDATE `redenvelope` SET `used` = ?, `conlai` = ? WHERE `id_txn` = ? ';
                        await connection.execute(sql, [0, 0, id_txn]);
                        const sql1 = 'INSERT INTO `history_redenvelope` SET `phone_login` = ?, `name_user` = ?, `id_txn` = ?, `money` = ?,`time` = ? ';
                        await connection.execute(sql1, [check_account, checkUser[0].name_user, id_txn, checkRedenvelope[0].money, time]);
                        const sql2 = 'UPDATE `users` SET `money` = ? WHERE `phone_login` = ? ';
                        await connection.execute(sql2, [checkRedenvelope[0].money + checkUser[0].money, check_account]);
                        await connection.execute('INSERT INTO `financial_details` SET `phone_login` = ?, `loai` = ?, `money` = ?, `time` = ?', [check_account, 0, checkRedenvelope[0].money, time]);
                        return res.end(`{"message": 1, "money": ${checkRedenvelope[0].money}}`);
                    }
                    if (checkRedenvelope[0].type == 'equal') {
                        var total = checkRedenvelope[0].conlai - (checkRedenvelope[0].money / checkRedenvelope[0].quantity);
                        const sql = 'UPDATE `redenvelope` SET `used` = ?, `conlai` = ? WHERE `id_txn` = ? ';
                        await connection.execute(sql, [checkRedenvelope[0].used - 1, total, id_txn]);
                        const sql1 = 'INSERT INTO `history_redenvelope` SET `phone_login` = ?, `name_user` = ?, `id_txn` = ?, `money` = ?,`time` = ? ';
                        await connection.execute(sql1, [check_account, checkUser[0].name_user, id_txn, checkRedenvelope[0].money / checkRedenvelope[0].quantity, time]);
                        const sql2 = 'UPDATE `users` SET `money` = ? WHERE `phone_login` = ? ';
                        await connection.execute(sql2, [checkRedenvelope[0].money / checkRedenvelope[0].quantity + checkUser[0].money, check_account]);
                        await connection.execute('INSERT INTO `financial_details` SET `phone_login` = ?, `loai` = ?, `money` = ?, `time` = ?', [check_account, 0, checkRedenvelope[0].money / checkRedenvelope[0].quantity, time]);
                        return res.end(`{"message": 1, "money": ${checkRedenvelope[0].money / checkRedenvelope[0].quantity}}`);
                    }
                    // if (checkRedenvelope[0].type == 'random') {
                    //     const sql = 'UPDATE `redenvelope` SET `used` = ?, `conlai` = ? WHERE `id_txn` = ? ';
                    //     await connection.execute(sql, [0, 0, id_txn]);
                    //     const sql1 = 'INSERT INTO `history_redenvelope` SET `phone_login` = ?, `name_user` = ?, `id_txn` = ?, `money` = ?,`time` = ? ';
                    //     await connection.execute(sql1, [check_account, checkUser[0].name_user, id_txn, checkRedenvelope[0].money, time]);
                    //     const sql2 = 'UPDATE `users` SET `money` = ? WHERE `phone_login` = ? ';
                    //     await connection.execute(sql2, [checkRedenvelope[0].money, check_account]);
                    //     return res.end('{"message": 1}');
                    // }
                } else {
                    return res.end('{"message": 4}');
                }
            } else {
                return res.end('{"message": 3}');
            }
        } else {
            return res.end('{"message": 2}');
        }
    } else {
        return res.end('{"message": "error"}');
    }
}

const renderFinancial = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;

    let limit = req.body.limit;
    let start = req.body.start;
    if (limit && start) {
        const [listDetails] = await connection.execute('SELECT * FROM `financial_details` WHERE `phone_login` = ? ORDER BY `id` DESC LIMIT ?,? ', [phone_login, start, limit]);
        const loai = listDetails.map((list_order) => list_order.loai);
        const money = listDetails.map((list_order) => list_order.money);

        var array = [];
        for (let i = 0; i < listDetails.length; i++) {
            const time_end1 = listDetails[i].time.replace(",", ".");
            array.push(time_end1);
        }

        return res.end(`{"loai": "${loai}","money": "${money}","time": "${array}"}`);
    } else {
        res.end('{"message": "error"}');
    }
}

module.exports = {
    getPageMember,
    getmyTask,
    redenvelope,
    promotion,
    promotionApply,
    promotionApplyRecord,
    promotionBonusRecord,
    promotionPromotion,
    promotionShare,
    myWallet,
    myBank,
    myAddress,
    security,
    financial,
    about,
    aboutPivacyPolicy,
    aboutRda,
    aboutAppStatement,
    aboutUS,
    contactUs,
    complaint,
    complaintHelp,
    trade,
    securityNikname,
    changePassword,
    changePaymentPassword,
    addBanking,
    addAddress,
    recharge,
    rechargeRecord,
    withdraw,
    withdrawRecord,
    editNikname,
    editPassword,
    editPaymentPassword,
    couleepay,
    couleepayTXN,
    receipt,
    receiptID,
    closeReceipt,
    withdrawBonus,
    handlingwithdraw,
    Pageredenvelope,
    methodRedenvelope,
    renderFinancial
}