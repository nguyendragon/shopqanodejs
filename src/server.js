import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './route/web';
import connection from './configs/connectDB';
import handlingOrder from './controllers/handlingController';
import socketIoController from './controllers/socketIoController';
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var cron = require('node-cron');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

// tạo 1 sever socketio
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// config web
configViewEngine(app);

// cron 3p 1 lần theo giờ VN 1 ngày 480 lần
cron.schedule('*/3 * * * *', async() => {
    await handlingOrder.add_tage_woipy();
    const [giai_doan] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` = 0 ORDER BY `id` DESC LIMIT 1 ', []);
    const [orderbox] = await connection.execute('SELECT * FROM `tage_woipy` WHERE `ket_qua` != 0 ORDER BY `id` DESC LIMIT 1 ', []);
    const data = giai_doan[0]; // Cầu mới chưa có kết quả
    const data2 = orderbox[0]; // Cầu có kết quả khác 0
    io.emit('data-server', { data: data, data2: data2 });
}, {
    scheduled: true,
    timeZone: 'Asia/Ho_Chi_Minh'
});

// init route
initWebRoutes(app);

// Check xem ai connect vào sever
socketIoController.sendMessageAdmin(io);

server.listen(port, () => {
    console.log("Connected success port: " + port);
});

// app.listen(port, () => {
//     console.log("Connected success port: " + port);
// });