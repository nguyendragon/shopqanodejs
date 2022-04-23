import connection from '../configs/connectDB';
var jwt = require('jsonwebtoken');
require('dotenv').config();

const getPageMember1 = async(req, res) => {

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
    const [temp] = await connection.execute('SELECT * FROM `temp`', []);

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
    return res.render('manage/index.ejs', { temp, topNap, orders_list, giai_doan, orders_waiting, totalRed, totalGreen, totalViolet, totalNumber, totalNumber0, totalNumber1, totalNumber2, totalNumber3, totalNumber4, totalNumber5, totalNumber6, totalNumber7, totalNumber8, totalNumber9 });
}

const createResult = async(req, res) => {
    const result = req.body.result;
    if (result.length > 5 && result.length < 7) {
        await connection.execute('UPDATE `temp` SET `ket_qua` = ? ', [result]);
        res.end('{"message": 1}');
    } else {
        res.end('{"message": "error"}');
    }
}

const Statistical = async(req, res) => {

    // số lượng thành viên
    const [totalMember] = await connection.execute('SELECT COUNT(*) AS totalMember FROM `users` WHERE `veri` = 1 ', []);

    // số lượng thành viên ảo
    const [totalMemberFail] = await connection.execute('SELECT COUNT(*) AS totalMember FROM `users` WHERE `veri` = 0 ', []);

    // số lượt win
    const [totalWin] = await connection.execute('SELECT SUM(nhan_duoc) AS totalMoney, COUNT(*) as totalWin FROM `order_woipy` WHERE `ket_qua` != 0 AND `status` = 1 AND `permission` != "admin" AND `permission` != "boss" ', []);

    // số lượt loss
    const [totalLoss] = await connection.execute('SELECT SUM(so_tien_cuoc) AS totalMoney, COUNT(*) as totalLoss FROM `order_woipy` WHERE `ket_qua` != 0 AND `status` = 2 AND `permission` != "admin" AND `permission` != "boss" ', []);

    // online hôm nay 
    const [onlineToday] = await connection.execute('SELECT COUNT(*) AS onlineToday FROM `users` WHERE `status_login` = 1 AND `veri` = 1 AND `lever` = "user" ', []);

    // nạp tiền thành công
    const [rechargeSucces] = await connection.execute('SELECT SUM(recharge.money) AS rechargeSucces, COUNT(recharge.id) AS totalRecharge FROM `recharge` INNER JOIN `users` ON recharge.phone_login = users.phone_login WHERE recharge.status = 1 AND users.lever = "user" ', []);

    // rút tiền thành công
    const [withdrawSucces] = await connection.execute('SELECT SUM(withdraw.realmoney) AS withdrawSucces, COUNT(withdraw.id) AS totalWithdraw FROM `withdraw` INNER JOIN `users` ON withdraw.phone_login = users.phone_login WHERE withdraw.status = 2 AND users.lever = "user"', []);

    // rút tiền hoa hồng thành công
    const [withdrawBonus] = await connection.execute('SELECT SUM(money) AS totalMoney, COUNT(*) as totalBonus FROM `withdraw_bonus` WHERE `status` = 1', []);

    return res.render('manage/statistical.ejs', { totalMember, totalMemberFail, totalWin, totalLoss, onlineToday, rechargeSucces, withdrawSucces, withdrawBonus });
}

const browseRecharge = async(req, res) => {
    const [recharges] = await connection.execute('SELECT * FROM `recharge` WHERE `status` = 0 AND `loai` != "0" ', []);

    var recharge = []
    for (let i = 0; i < recharges.length; i++) {
        const timeWait = recharges[i].timeEnd;
        var today = new Date(Number(timeWait)).getTime();
        var now = new Date().getTime();
        var timeRest = today - now;
        if (timeRest >= 0) {
            recharge.push(recharges[i]);
        }
    }

    return res.render('manage/recharge.ejs', { recharge });
}

// duyệt nạp tiền
const methodRecharge = async(req, res) => {
    const id_product = req.body.id_product;
    const type = req.body.type;
    const [infoProduct] = await connection.execute('SELECT * FROM `recharge` WHERE `id` = ? ', [id_product]);

    var khuyen_mai = 0;
    if (infoProduct[0].money >= 3000000) {
        khuyen_mai = (infoProduct[0].money / 100) * 2;
    }
    const phone_login = infoProduct[0].phone_login;
    const [infoMember] = await connection.execute('SELECT `money`, `total_money` FROM `users` WHERE `phone_login` = ? ', [phone_login]);
    if (id_product && type == "confirm") {
        await connection.execute('UPDATE `recharge` SET `status` = 1 WHERE `id` = ? ', [id_product]);
        await connection.execute('UPDATE `users` SET `money` = ? , `total_money` = ? WHERE `phone_login` = ? ', [infoMember[0].money + infoProduct[0].money + khuyen_mai, infoMember[0].total_money + infoProduct[0].money + khuyen_mai, phone_login]);
        res.end('{"message": 1}');
    } else if (id_product && type == "delete") {
        await connection.execute('UPDATE `recharge` SET `status` = 2 WHERE `id` = ? ', [id_product]);
        res.end('{"message": 1}');
    } else {
        res.end('{"message": "error"}');
    }
}

const rechargeRecord = async(req, res) => {
    const [recharge] = await connection.execute('SELECT * FROM `recharge` WHERE `loai` != "0" ORDER BY `id` DESC ', []);
    return res.render('manage/rechargeRecord.ejs', { recharge });
}

const withdraw = async(req, res) => {
    const [withdraw] = await connection.execute('SELECT * FROM `withdraw` WHERE `status` = 0 ', []);
    return res.render('manage/withdraw.ejs', { withdraw });
}

const withdrawRecord = async(req, res) => {
    const [withdraw] = await connection.execute('SELECT * FROM `withdraw` ORDER BY `id` DESC ', []);
    return res.render('manage/withdrawRecord.ejs', { withdraw });
}

const methodWithdraw = async(req, res) => {
    const id_product = req.body.id_product;
    const type = req.body.type;
    const [infoProduct] = await connection.execute('SELECT * FROM `withdraw` WHERE `id` = ? ', [id_product]);
    const phone_login = infoProduct[0].phone_login;
    const [infoUser] = await connection.execute('SELECT `money` FROM `users` WHERE `phone_login` = ? ', [phone_login]);
    if (id_product && type == "confirm") {
        await connection.execute('UPDATE `withdraw` SET `status` = 2 WHERE `id` = ? ', [id_product]);
        res.end('{"message": 1}');
    } else if (id_product && type == "delete") {
        await connection.execute('UPDATE `withdraw` SET `status` = 3 WHERE `id` = ? ', [id_product]);
        await connection.execute('UPDATE `users` SET `money` = ? WHERE `phone_login` = ? ', [infoProduct[0].money + infoUser[0].money, phone_login]);
        res.end('{"message": 1}');
    } else {
        res.end('{"message": "error"}');
    }
}

const withdrawBonus = async(req, res) => {
    const [bonus] = await connection.execute('SELECT * FROM `withdraw_bonus` WHERE `status` = 0 ', []);
    return res.render('manage/withdrawBonus.ejs', { bonus });
}

const bonusRecord = async(req, res) => {
    const [bonusRecord] = await connection.execute('SELECT * FROM `withdraw_bonus` ORDER BY `id` DESC ', []);
    return res.render('manage/bonusRecord.ejs', { bonusRecord });
}

const methodBonus = async(req, res) => {
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
    const id_product = req.body.id_product;
    const type = req.body.type;
    const [infoProduct] = await connection.execute('SELECT * FROM `withdraw_bonus` WHERE `id` = ? ', [id_product]);
    const phone_login = infoProduct[0].phone_login;
    const [infoWalletBonus] = await connection.execute('SELECT * FROM `wallet_bonus` WHERE `phone_login` = ? ', [phone_login]);
    const [infoMember] = await connection.execute('SELECT `money` FROM `users` WHERE `phone_login` = ? ', [phone_login]);
    if (id_product && type == "confirm") {
        await connection.execute('UPDATE `withdraw_bonus` SET `status` = 1 WHERE `id` = ? ', [id_product]);
        await connection.execute('UPDATE `users` SET `money` = ? WHERE `phone_login` = ? ', [infoMember[0].money + infoProduct[0].money, phone_login]);
        await connection.execute('INSERT INTO `financial_details` SET `phone_login` = ?,`loai` = ?, `money` = ?, `time` = ?', [phone_login, 3, infoProduct[0].money, time]);
        res.end('{"message": 1}');
    } else if (id_product && type == "delete") {
        await connection.execute('DELETE FROM `withdraw_bonus` WHERE `id` = ? ', [id_product]);
        await connection.execute('UPDATE `wallet_bonus` SET `money` = ? WHERE `phone_login` = ? ', [infoWalletBonus[0].money + infoProduct[0].money, phone_login]);
        res.end('{"message": 1}');
    } else {
        res.end('{"message": "error"}');
    }
}

const listMembers = async(req, res) => {
    var tokenUser = req.cookies.token;
    var token = jwt.verify(tokenUser, process.env.JWT_ACCESS_TOKEN);
    var phone_login = token.user.phone_login;
    const [info] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` != 0 ORDER BY `id` DESC ', [phone_login]);
    const [listMembers] = await connection.execute('SELECT * FROM `users` WHERE `veri` != 0 ORDER BY `id` DESC ', []);
    return res.render('manage/members.ejs', { listMembers, info });
}

const profileMember = async(req, res) => {
    const phone_login = req.params.phone;
    const [info] = await connection.execute('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` != 0 ORDER BY `id` DESC ', [phone_login]);
    const [info_banking] = await connection.execute('SELECT * FROM `banking_user` WHERE `phone_login` = ?', [phone_login]);
    if (info.length > 0) {
        // ví hoa hồng
        const [wallet_bonus] = await connection.execute('SELECT * FROM `wallet_bonus` WHERE `phone_login` = ?', [phone_login]);
        // số lượng f1
        const [quantity_f1] = await connection.execute('SELECT COUNT(*) AS soluong FROM `users` WHERE `ma_gt_f1` = ? ', [info[0].ma_gt]);
        const [list_f1] = await connection.query('SELECT `ma_gt` FROM `users` WHERE `ma_gt_f1` = ?', [info[0].ma_gt]);
        const [online_f1] = await connection.query('SELECT COUNT(*) as online_f1 FROM `users` WHERE `ma_gt_f1` = ? AND `status_login` = 1', [info[0].ma_gt]);
        const [order_woipy] = await connection.query('SELECT `giai_doan`,`so_tien_cuoc`,`nhan_duoc`,`status`,`chon`,`ket_qua` FROM `order_woipy` WHERE `phone_login` = ?', [phone_login]);
        const [ref_f1] = await connection.execute('SELECT phone_login, name_user, time, ma_gt,`status_login` FROM `users` WHERE `ma_gt_f1` = ? ORDER BY `id` DESC', [info[0].ma_gt]);
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
        var ref_f2 = [];
        if (ref_f1.length > 0) {
            for (let i = 0; i < ref_f1.length; i++) {
                var list_f1s = ref_f1[i].ma_gt;
                var [ref_f2s] = await connection.query('SELECT phone_login, name_user, time, ma_gt,status_login FROM `users` WHERE `ma_gt_f1` = ? ORDER BY `id` DESC', [list_f1s]);
                if (ref_f2s.length > 0) {
                    ref_f2.push(ref_f2s);
                }
            }
        }

        return res.render('manage/profileMember.ejs', { info, wallet_bonus, quantity_f1, countF2, online_f1, countOnlineF2, order_woipy, ref_f1, ref_f2, info_banking });
    } else {
        return res.redirect('/manage/admin/members');
    }
}

const createBonus = async(req, res) => {
    return res.render('manage/createBonus.ejs');
}

const methodCreateBonus = async(req, res) => {
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

    // 0. --- Chọn loại ---
    // 1. Thưởng tuyển thành viên
    // 2. Tạo Lixi Random
    // 3. Tạo Lixi chia đều

    var [userInfo] = await connection.query('SELECT `lever` FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [phone_login]);

    const value = req.body.value; // loại
    const quantity = req.body.quantity; // số lượng
    const money = req.body.money; // số tiền 
    if (userInfo[0].lever == "boss") {
        if (value == 1) {
            const sql = "INSERT INTO `redenvelope` SET `id_txn` = ?, `used` = ?, `quantity` = ?, `conlai` = ?, `money` = ?, `type` = ?, `time` = ?";
            await connection.execute(sql, [id_txn, 1, 1, money, money, "ref", timeCr]);
            return res.end(`{"message": 1,"id_txn": "${id_txn}"}`);
        } else if (value == 2) {
            const sql = "INSERT INTO `redenvelope` SET `id_txn` = ?, `used` = ?, `quantity` = ?, `conlai` = ?, `money` = ?, `type` = ?, `time` = ?";
            await connection.execute(sql, [id_txn, quantity, quantity, money, money, "random", timeCr]);
            return res.end(`{"message": 2,"id_txn": "${id_txn}"}`);
        } else if (value == 3) {
            const sql = "INSERT INTO `redenvelope` SET `id_txn` = ?, `used` = ?, `quantity` = ?,`conlai` = ?, `money` = ?, `type` = ?, `time` = ?";
            await connection.execute(sql, [id_txn, quantity, quantity, money, money, "equal", timeCr]);
            return res.end(`{"message": 3,"id_txn": "${id_txn}"}`);
        } else {
            return res.end('{"message": "error"}');
        }
    } else {
        return res.end('{"message": 4}');
    }
}

const settings = async(req, res) => {
    const [info_acccount] = await connection.execute('SELECT * FROM `account_banking`', []);
    const [sale] = await connection.execute('SELECT * FROM `temp`', []);
    return res.render('manage/settings.ejs', { info_acccount, sale });
}

const settingSale = async(req, res) => {
    const valueSale = req.body.valueSale; // loại
    const sql = "UPDATE `temp` SET `khuyen_mai` = ?";
    await connection.execute(sql, [valueSale]);
    return res.end('{"message": 1}');
}

const methodSettings = async(req, res) => {
    const params1 = req.body.params1; // lấy ra sđt
    const params2 = req.body.params2; // lấy ra sđt hoặc tên
    const typer = req.body.typer;
    var [userInfo] = await connection.query('SELECT * FROM `users` WHERE `phone_login` = ? AND `veri` = 1', [params1]);
    if (typer == "buff") {
        if (userInfo.length > 0) {
            await connection.execute('UPDATE `users` SET `money` = ? WHERE `phone_login` = ? ', [userInfo[0].money + Number(params2), params1]);
            return res.end('{"message": 1}');
        } else {
            return res.end('{"message": 2}');
        }
    } else if (typer == "edit") {
        if (userInfo.length > 0) {
            await connection.execute('UPDATE `users` SET `name_member` = ? WHERE `phone_login` = ? ', [params2, params1]);
            return res.end('{"message": 1}');
        } else {
            return res.end('{"message": 2}');
        }
    } else {
        return res.end('{"message": "error"}');
    }
}

const methodSettingBank = async(req, res) => {
    const name_bank = req.body.name_bank;
    const name = req.body.name;
    const info = req.body.info;
    const typer = req.body.typer;

    var [check] = await connection.query('SELECT * FROM `account_banking` WHERE `type` = ?', [typer]);
    if (typer == "momo") {
        if (check.length > 0) {
            await connection.execute('UPDATE `account_banking` SET `name_bank` = ?, `name` = ?, `info`= ? WHERE `type` = ? ', [name_bank, name, info, typer]);
            return res.end('{"message": 1}');
        } else {
            return res.end('{"message": 2}');
        }
    } else if (typer == "bank") {
        if (check.length > 0) {
            await connection.execute('UPDATE `account_banking` SET `name_bank` = ?, `name` = ?, `info`= ? WHERE `type` = ? ', [name_bank, name, info, typer]);
            return res.end('{"message": 1}');
        } else {
            return res.end('{"message": 2}');
        }
    } else {
        return res.end('{"message": "error"}');
    }
}

const sendOtp = async(req, res) => {
    const [listOTP] = await connection.execute('SELECT * FROM `users` WHERE `sented` = 0 ORDER BY `id` ASC ', []);
    return res.render('manage/sendotp.ejs', { listOTP });
}

const methodSendOtp = async(req, res) => {
    const phone = req.body.phone;
    if (phone != "") {
        await connection.execute('UPDATE `users` SET `sented` = 1 WHERE `phone_login` = ? ', [phone]);
        res.end('{"message": 1}');
    } else {
        res.end('{"message": "error"}');
    }
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
    middlewareAdminController,
    createResult,
    methodRecharge,
    methodWithdraw,
    methodBonus,
    profileMember,
    sendOtp,
    methodSendOtp,
    methodCreateBonus,
    methodSettings,
    methodSettingBank,
    settingSale
}