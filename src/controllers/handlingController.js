import connection from '../configs/connectDB';

// Get time dạng: 14 Apr 2022, 20:40 pm
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

const handlingOrder = async() => {
    // Lấy ra 1 giai đoạn trên đầu có kết quả khác 0
    const [giai_doan_khac_0] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` != 0 ORDER BY `id` DESC LIMIT 1 ', []);
    const get_giai_doan_khac_0 = giai_doan_khac_0[0]; // VD: { id: 20,giai_doan: '20220413237',cau: '237', ket_qua: 205442 }
    let ket_qua_cau_truoc = get_giai_doan_khac_0.ket_qua; // VD: 205442
    const ket_qua = String(ket_qua_cau_truoc).split("")[5]; // VD: 2

    // update kết quả cho đơn hàng
    var time = TimeCreate();
    await connection.execute('UPDATE `order_woipy` SET `ket_qua` = ?, `time_end` = ? WHERE `status` = 0', [ket_qua_cau_truoc, time]);
    var ket_qua_N = Number(ket_qua);
    switch (ket_qua_N) {
        case 0:
            await connection.execute('UPDATE `order_woipy` SET `status` = 2 WHERE `status` = 0 AND `chon` != "d" AND `chon` != "0" AND `chon` != "t" ', []);
            break;
        case 1:
            await connection.execute('UPDATE `order_woipy` SET `status` = 2 WHERE `status` = 0 AND `chon` != "x" AND `chon` != "1" ', []);
            break;
        case 2:
            await connection.execute('UPDATE `order_woipy` SET `status` = 2 WHERE `status` = 0 AND `chon` != "d" AND `chon` != "2" ', []);
            break;
        case 3:
            await connection.execute('UPDATE `order_woipy` SET `status` = 2 WHERE `status` = 0 AND `chon` != "x" AND `chon` != "3" ', []);
            break;
        case 4:
            await connection.execute('UPDATE `order_woipy` SET `status` = 2 WHERE `status` = 0 AND `chon` != "d" AND `chon` != "4" ', []);
            break;
        case 5:
            await connection.execute('UPDATE `order_woipy` SET `status` = 2 WHERE `status` = 0 AND `chon` != "x" AND `chon` != "5" AND `chon` != "t" ', []);
            break;
        case 6:
            await connection.execute('UPDATE `order_woipy` SET `status` = 2 WHERE `status` = 0 AND `chon` != "d" AND `chon` != "6" ', []);
            break;
        case 7:
            await connection.execute('UPDATE `order_woipy` SET `status` = 2 WHERE `status` = 0 AND `chon` != "x" AND `chon` != "7" ', []);
            break;
        case 8:
            await connection.execute('UPDATE `order_woipy` SET `status` = 2 WHERE `status` = 0 AND `chon` != "d" AND `chon` != "8" ', []);
            break;
        case 9:
            await connection.execute('UPDATE `order_woipy` SET `status` = 2 WHERE `status` = 0 AND `chon` != "x" AND `chon` != "9" ', []);
            break;
        default:
            break;
    }

    // lấy ra danh sách đặt cược chưa xử lý
    const [order] = await connection.execute('SELECT * FROM `order_woipy` WHERE `status` = 0 ', []);
    for (let i = 0; i < order.length; i++) {
        const list_order = order[i]; // lấy ra danh sách chưa xử lý
        var ket_qu = Number(String(list_order.ket_qua).split("")[5]); // VD: 5 trong bảng đơn hàng
        var chon = list_order.chon; // VD: d,x,t,1,2 trong bảng đơn hàng
        var id = list_order.id; // VD: 1, 2, 3, 4,... trong bảng đơn hàng
        var giao_hang = list_order.giao_hang; // VD: Số tiền cược : 100k Giao Hàng: 96k Phí 4k
        var phone_login = list_order.phone_login; // VD: Số điện thoại
        var nhan_duoc = 0;
        if (ket_qu == 0 || ket_qu == 5) {
            if (chon == 'd' || chon == 'x') {
                nhan_duoc = giao_hang * 1.5;
            } else if (chon == 't') {
                nhan_duoc = giao_hang * 4.5;
            } else if (chon == "0" || chon == "5") {
                nhan_duoc = giao_hang * 9;
            }
        } else {
            if (ket_qu == 1 && chon == "1") {
                nhan_duoc = giao_hang * 9;
            } else {
                if (ket_qu == 1 && chon == 'x') {
                    nhan_duoc = giao_hang * 2;
                }
            }
            if (ket_qu == 2 && chon == "2") {
                nhan_duoc = giao_hang * 9;
            } else {
                if (ket_qu == 2 && chon == 'd') {
                    nhan_duoc = giao_hang * 2;
                }
            }
            if (ket_qu == 3 && chon == "3") {
                nhan_duoc = giao_hang * 9;
            } else {
                if (ket_qu == 3 && chon == 'x') {
                    nhan_duoc = giao_hang * 2;
                }
            }
            if (ket_qu == 4 && chon == "4") {
                nhan_duoc = giao_hang * 9;
            } else {
                if (ket_qu == 4 && chon == 'd') {
                    nhan_duoc = giao_hang * 2;
                }
            }
            if (ket_qu == 6 && chon == "6") {
                nhan_duoc = giao_hang * 9;
            } else {
                if (ket_qu == 6 && chon == 'd') {
                    nhan_duoc = giao_hang * 2;
                }
            }
            if (ket_qu == 7 && chon == "7") {
                nhan_duoc = giao_hang * 9;
            } else {
                if (ket_qu == 7 && chon == 'x') {
                    nhan_duoc = giao_hang * 2;
                }
            }
            if (ket_qu == 8 && chon == "8") {
                nhan_duoc = giao_hang * 9;
            } else {
                if (ket_qu == 8 && chon == 'd') {
                    nhan_duoc = giao_hang * 2;
                }
            }
            if (ket_qu == 9 && chon == "9") {
                nhan_duoc = giao_hang * 9;
            } else {
                if (ket_qu == 9 && chon == 'x') {
                    nhan_duoc = giao_hang * 2;
                }
            }
        }

        const [users] = await connection.execute('SELECT `money` FROM `users` WHERE `phone_login` = ?', [phone_login]);
        var total = users[0].money + nhan_duoc;
        await connection.execute('UPDATE `order_woipy` SET `nhan_duoc` = ?, `status` = 1 WHERE `id` = ? ', [nhan_duoc, id]);
        const sql = 'UPDATE `users` SET `money` = ? WHERE `phone_login` = ? ';
        await connection.execute(sql, [total, phone_login]);

    }
}

// Thêm cầu mới
const add_tage_woipy = async(req, res) => {
    // 0. Chờ
    // 1. Thắng
    // 2. Thua

    var time = TimeCreate();
    // lấy ra giai đoạn hiện tại
    const [giai_doan] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` = 0 ORDER BY `id` DESC LIMIT 1 ', []);
    const get_giai_doan = giai_doan[0];
    // Giai đoạn mới 
    var giai_doan_moi = 0;
    var cau_moi = 0;
    if (get_giai_doan.cau == 480) {
        cau_moi = '1';
        giai_doan_moi = Number(get_giai_doan.giai_doan) + 521;
    } else {
        cau_moi = Number(get_giai_doan.cau) + 1;
        giai_doan_moi = Number(get_giai_doan.giai_doan) + 1;
    }
    var update_kq = Math.floor(Math.random() * (205999 - 205000)) + 205000;; // Ra kết quả trong cầu cũ
    const sql2 = 'UPDATE `tage_woipy` SET `ket_qua` = ?, `time_end` = ? WHERE `ket_qua` = 0';
    const sql = 'INSERT INTO `tage_woipy` SET `giai_doan` = ?, `ket_qua` = 0, `cau` = ?, `time_create` = ?';
    await connection.execute(sql2, [update_kq, time]);
    await connection.execute(sql, [giai_doan_moi, cau_moi, time]);
    handlingOrder();
}

module.exports = {
    add_tage_woipy,
    handlingOrder,
}