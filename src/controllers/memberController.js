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
    var countF2 = 0;
    if (list_f1.length > 0) {
        for (let i = 0; i < 1; i++) {
            var list_f1s = list_f1[i].ma_gt;
            var [list_f2] = await connection.query('SELECT `ma_gt` AS f2 FROM `users` WHERE `ma_gt_f1` = ?', [list_f1s]);
            if (list_f2.length > 0) {
                countF2 += list_f2.length;
            }
        }
    }
    return res.render('member/promotion/index.ejs', { wallet_bonus, quantity_f1, countF2 });
}

const promotionApply = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [apply] = await connection.execute('SELECT * FROM `wallet_bonus` WHERE `phone_login` = ?', [phone_login]);

    return res.render('member/promotion/apply.ejs', { apply });
}

const promotionApplyRecord = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [withdraw_bonus] = await connection.execute('SELECT * FROM `withdraw_bonus` WHERE `phone_login` = ?', [phone_login]);
    return res.render('member/promotion/applyRecord.ejs', { withdraw_bonus });
}

const promotionBonusRecord = (req, res) => {
    return res.render('member/promotion/bonusRecord.ejs');
}

const promotionPromotion = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    var ma_gt = token.user.ma_gt;
    const [ref_f1] = await connection.execute('SELECT name_user, time, ma_gt FROM `users` WHERE `ma_gt_f1` = ?', [ma_gt]);
    var ref_f2 = []
    if (ref_f1.length > 0) {
        for (let i = 0; i < 1; i++) {
            var list_f1s = ref_f1[i].ma_gt;
            var [ref_f2] = await connection.query('SELECT name_user, time, ma_gt FROM `users` WHERE `ma_gt_f1` = ?', [list_f1s]);
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
}