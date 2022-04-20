const socket = io();
$(document).ready(function() {

    function formatMoney(money) {
        return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    socket.on('data-server', function(msg) {
        // in ra cầu mới
        if (msg.data) {
            var data_gd = msg.data.giai_doan;
            $('.reservation-chunk-sub-num:eq(0)').html(data_gd);
        }
        // in ra kết quả
        if (msg.data2) {
            var giai_doan = msg.data2.giai_doan; // VD: 20220414033
            var ket_qua = msg.data2.ket_qua; // VD: 205436
            var formatKq = formatMoney(msg.data2.ket_qua); // VD: 205.436
            var ket_qua1 = String(ket_qua).split("")[5]; // VD: 6
            $('.van-list:eq(0) .van-row--flex:last').remove();
            if (ket_qua1 == "2" || ket_qua1 == "4" || ket_qua1 == "6" || ket_qua1 == "8") {
                $(".van-list:eq(0)").prepend(
                    `<div data-v-3978cf5e="" class="content van-row van-row--flex van-row--justify-center">` +
                    `<div data-v-3978cf5e="" class="header__noe van-col van-col--9">${giai_doan}</div>` +
                    `<div data-v-3978cf5e="" class="van-col van-col--5">${formatKq}</div>` +
                    `<div data-v-3978cf5e="" class="van-col van-col--5">` +
                    `<b data-v-3978cf5e="" class="conten__aneven">${ket_qua1}</b>` +
                    `</div>` +
                    `<div data-v-3978cf5e="" class="header__child point van-col van-col--5">` +
                    `<div data-v-3978cf5e="" class="point-box">` +
                    `<div data-v-3978cf5e="" class="point-box__aneven"></div>` +
                    `<div data-v-3978cf5e="" class="point-box__add"></div>` +
                    `</div>` +
                    `</div>` +
                    `</div>`
                );
            }
            if (ket_qua1 == "1" || ket_qua1 == "3" || ket_qua1 == "7" || ket_qua1 == "9") {
                $(".van-list:eq(0)").prepend(
                    `<div data-v-3978cf5e="" class="content van-row van-row--flex van-row--justify-center">` +
                    `<div data-v-3978cf5e="" class="header__noe van-col van-col--9">${giai_doan}</div>` +
                    `<div data-v-3978cf5e="" class="van-col van-col--5">${formatKq}</div>` +
                    `<div data-v-3978cf5e="" class="van-col van-col--5">` +
                    `<b data-v-3978cf5e="" class="content__anodd">${ket_qua1}</b>` +
                    `</div>` +
                    `<div data-v-3978cf5e="" class="header__child point van-col van-col--5">` +
                    `<div data-v-3978cf5e="" class="point-box">` +
                    `<div data-v-3978cf5e="" class="point-box__anodd"></div>` +
                    `<div data-v-3978cf5e="" class="point-box__add"></div>` +
                    `</div>` +
                    `</div>` +
                    `</div>`
                );
            }
            if (ket_qua1 == "0") {
                $(".van-list:eq(0)").prepend(
                    `<div data-v-3978cf5e="" class="content van-row van-row--flex van-row--justify-center">` +
                    `<div data-v-3978cf5e="" class="header__noe van-col van-col--9">${giai_doan}</div>` +
                    `<div data-v-3978cf5e="" class="van-col van-col--5">${formatKq}</div>` +
                    `<div data-v-3978cf5e="" class="van-col van-col--5">` +
                    `<b data-v-3978cf5e="" class="conten__aneven">${ket_qua1}</b>` +
                    `</div>` +
                    `<div data-v-3978cf5e="" class="header__child point van-col van-col--5">` +
                    `<div data-v-3978cf5e="" class="point-box">` +
                    `<div data-v-3978cf5e="" class="point-box__aneven"></div>` +
                    `<div data-v-3978cf5e="" class="point-box__aliquot"></div>` +
                    `</div>` +
                    `</div>` +
                    `</div>`
                );
            }
            if (ket_qua1 == "5") {
                $(".van-list:eq(0)").prepend(
                    `<div data-v-3978cf5e="" class="content van-row van-row--flex van-row--justify-center">` +
                    `<div data-v-3978cf5e="" class="header__noe van-col van-col--9">${giai_doan}</div>` +
                    `<div data-v-3978cf5e="" class="van-col van-col--5">${formatKq}</div>` +
                    `<div data-v-3978cf5e="" class="van-col van-col--5">` +
                    `<b data-v-3978cf5e="" class="content__anodd">${ket_qua1}</b>` +
                    `</div>` +
                    `<div data-v-3978cf5e="" class="header__child point van-col van-col--5">` +
                    `<div data-v-3978cf5e="" class="point-box">` +
                    `<div data-v-3978cf5e="" class="point-box__anodd"></div>` +
                    `<div data-v-3978cf5e="" class="point-box__aliquot"></div>` +
                    `</div>` +
                    `</div>` +
                    `</div>`
                );
            }
        }
    });
});

document.querySelector(".checkedd").checked = true;
// $('.complaints').click(function() {
//     location.href = '/complaint/help';
// });

$('.van-overlay, .cancel').click(function(e) {
    e.preventDefault();
    $('.van-overlay').fadeOut();
    $('.van-popup--center').fadeOut(100);
    $('body').removeClass('van-overflow-hidden');
    $('.sellz').addClass('van-popup--bottoms');

    $('.show-order1').removeClass('box-pre-order sell');
    $('.show-order1').removeClass('box-pre-number violet');
    $('.show-order1').removeClass('box-pre-order');
    $('.show-order1').removeClass('box-pre-number');
    $('.show-order1').text('');

    $('.show-order2').removeClass('confirm');
    $('.show-order2').removeClass('confirmNumber');
    $('.show-order2').removeClass('confirmNumber violet');
    $('.show-order2').removeClass('confirm order');

    $('.itemSell button').removeClass('active');
    $('.itemSell button:eq(0)').addClass('active');

    $('.itemNumber button').removeClass('active');

    $('.van-stepper__inputD').val(1)
    $('.van-stepper__minus').addClass('van-stepper__minus--disabled');
    $('.itemSell').attr('price', 2000);
});
// Đỏ
$('.sell button').click(function(e) {
    e.preventDefault();
    $('.van-overlay').fadeIn();
    $('body').addClass('van-overflow-hidden');
    $('.sellz').removeClass('van-popup--bottoms');
    $('.sellz').addClass('van-popup--bottom');
    $('.show-order1').addClass('box-pre-order sell');
    $('.show-order1').text('Tham gia Đỏ');
    $('.show-order2').addClass('confirm');
    $('.show-order2').attr('join', 'd');
});
// Tím
$('.violet button').click(function(e) {
    e.preventDefault();
    $('.van-overlay').fadeIn();
    $('body').addClass('van-overflow-hidden');
    $('.sellz').removeClass('van-popup--bottoms');
    $('.sellz').addClass('van-popup--bottom');
    $('.show-order1').addClass('box-pre-number violet');
    $('.show-order1').text('Tham gia Tím');
    $('.show-order2').addClass('confirmNumber violet');
    $('.show-order2').attr('join', 't');
});
// Xanh
$('.order button').click(function(e) {
    e.preventDefault();
    $('.van-overlay').fadeIn();
    $('body').addClass('van-overflow-hidden');
    $('.sellz').removeClass('van-popup--bottoms');
    $('.sellz').addClass('van-popup--bottom');
    $('.show-order1').addClass('box-pre-order');
    $('.show-order1').text('Tham gia Xanh lục');
    $('.show-order2').addClass('confirm order');
    $('.show-order2').attr('join', 'x');
});
// Số
$('.number button').click(function(e) {
    e.preventDefault();
    const number_join = $(this).text();
    $('.van-overlay').fadeIn();
    $('body').addClass('van-overflow-hidden');
    $('.sellz').removeClass('van-popup--bottoms');
    $('.sellz').addClass('van-popup--bottom');
    $('.show-order1').addClass('box-pre-number');
    $('.show-order1').text(`Chọn ${number_join}`);
    $('.show-order2').addClass('confirmNumber');
    $('.show-order2').attr('join', number_join);
});
// active 
$('.itemSell button').click(function(e) {
    e.preventDefault();
    $('.itemSell button').removeClass('active');
    $('.itemSell').attr('price', );
    $(this).addClass('active');
});
$('.itemSell button:eq(0)').click(function(e) {
    e.preventDefault();
    $('.itemSell').attr('price', 2000);
});
$('.itemSell button:eq(1)').click(function(e) {
    e.preventDefault();
    $('.itemSell').attr('price', 20000);
});
$('.itemSell button:eq(2)').click(function(e) {
    e.preventDefault();
    $('.itemSell').attr('price', 100000);
});
$('.itemSell button:eq(3)').click(function(e) {
    e.preventDefault();
    $('.itemSell').attr('price', 500000);
});


$('.itemNumber button').click(function(e) {
    e.preventDefault();
    var joinItemNumber = $(this).text().trim();
    $('.van-stepper__inputD').val(joinItemNumber);
    $('.itemNumber button').removeClass('active');
    $(this).addClass('active');
    $('.van-stepper__minus').removeClass('van-stepper__minus--disabled');
});

// arrow number
$('.van-stepper__plus').click(function(e) {
    e.preventDefault();
    var total = $('.van-stepper__inputD').val();
    var results = Number(total) + 1;
    $('.van-stepper__inputD').val(results);
    if (results > 0) {
        $('.van-stepper__minus').removeClass('van-stepper__minus--disabled');
    }
    if (results == 3) {
        $('.itemNumber button').removeClass('active');
        $('.itemNumber button:eq(0)').addClass('active');
    } else if (results == 5) {
        $('.itemNumber button').removeClass('active');
        $('.itemNumber button:eq(1)').addClass('active');
    } else if (results == 10) {
        $('.itemNumber button').removeClass('active');
        $('.itemNumber button:eq(2)').addClass('active');
    } else if (results == 20) {
        $('.itemNumber button').removeClass('active');
        $('.itemNumber button:eq(3)').addClass('active');
    } else {
        $('.itemNumber button').removeClass('active');
    }
});
$('.van-stepper__minus').click(function(e) {
    e.preventDefault();
    var total = $('.van-stepper__inputD').val();
    if (total > 1) {
        var results = Number(total) - 1;
        $('.van-stepper__inputD').val(results);
        if (results == 1) {
            $('.van-stepper__minus').addClass('van-stepper__minus--disabled');
        }
        if (results == 3) {
            $('.itemNumber button').removeClass('active');
            $('.itemNumber button:eq(0)').addClass('active');
        } else if (results == 5) {
            $('.itemNumber button').removeClass('active');
            $('.itemNumber button:eq(1)').addClass('active');
        } else if (results == 10) {
            $('.itemNumber button').removeClass('active');
            $('.itemNumber button:eq(2)').addClass('active');
        } else if (results == 20) {
            $('.itemNumber button').removeClass('active');
            $('.itemNumber button:eq(3)').addClass('active');
        } else {
            $('.itemNumber button').removeClass('active');
        }
    }
});

$('.van-stepper__inputD').keyup(function() {
    var results = $('.van-stepper__inputD').val();
    if (results == 1) {
        $('.van-stepper__minus').addClass('van-stepper__minus--disabled');
    } else if (results > 1) {
        $('.van-stepper__minus').removeClass('van-stepper__minus--disabled');
    }
    if (results == 3) {
        $('.itemNumber button').removeClass('active');
        $('.itemNumber button:eq(0)').addClass('active');
    } else if (results == 5) {
        $('.itemNumber button').removeClass('active');
        $('.itemNumber button:eq(1)').addClass('active');
    } else if (results == 10) {
        $('.itemNumber button').removeClass('active');
        $('.itemNumber button:eq(2)').addClass('active');
    } else if (results == 20) {
        $('.itemNumber button').removeClass('active');
        $('.itemNumber button:eq(3)').addClass('active');
    } else {
        $('.itemNumber button').removeClass('active');
    }
});

function formatMoney(money) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

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

$('.show-order2').click(function(e) {
    e.preventDefault();
    var checkbox = document.querySelector(".checkedd").checked;
    var quantity = $('.van-stepper__inputD').val();
    var join = $('.show-order2').attr('join');
    var price = $('.itemSell').attr('price');
    var checkInput = $.isNumeric(quantity);
    if (checkInput && checkbox) {
        $.ajax({
            type: "POST",
            url: "/parity/tran",
            data: {
                join: join,
                price: price,
                quantity: quantity
            },
            dataType: "json",
            success: function(response) {
                if (response.message == 1) {

                    var money = formatMoney(response.money);
                    var totalMoney = formatMoney(response.so_tien_cuoc);
                    var totalMoney1 = response.so_tien_cuoc;
                    var giao_hang = formatMoney(response.giao_hang);
                    var phi_dich_vu = formatMoney(response.phi_dich_vu);
                    var name_member = response.name_member;
                    var level = response.level;
                    var time = TimeCreate();
                    socket.emit('data-server', { name_member, totalMoney, totalMoney1, join, level, time });
                    $('.left_money').text(money);
                    if (join == "d") {
                        $(".van-list:eq(1)").prepend(
                            `<div class="order-box">` +
                            `<div class="top">` +
                            `<em>₫</em>` +
                            `<span class="money">${totalMoney}</span>` +
                            `<div>kim ngạch thỏa thuận </div>` +
                            `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time}</span>` +
                            `</div>` +
                            `<div class="other">` +
                            `<div class="left">` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Giai đoạn</span>` +
                            `<b>${response.giai_doan}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Trạng thái</span>` +
                            `<b>Chờ</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Thời gian mở bán</span>` +
                            `<b>Chờ</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `</div>` +
                            `</div>` +
                            `<div class="right">` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Chọn</span>` +
                            `<b style="color: rgb(245, 41, 38);">Đỏ</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Giao hàng</span>` +
                            `<b>${giao_hang}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Phí dịch vụ</span>` +
                            `<b>${phi_dich_vu}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `</div>` +
                            `</div>` +
                            `</div>` +
                            `<div class="end-time">` +
                            `<button class="van-button van-button--default van-button--small complaints">` +
                            `<div class="van-button__content">` +
                            `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                            `</div>` +
                            `</button>` +
                            `</div>` +
                            `</div>`
                        );
                    }
                    if (join == "x") {
                        $(".van-list:eq(1)").prepend(
                            `<div class="order-box">` +
                            `<div class="top">` +
                            `<em>₫</em>` +
                            `<span class="money">${totalMoney}</span>` +
                            `<div>kim ngạch thỏa thuận </div>` +
                            `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time}</span>` +
                            `</div>` +
                            `<div class="other">` +
                            `<div class="left">` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Giai đoạn</span>` +
                            `<b>${response.giai_doan}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Trạng thái</span>` +
                            `<b>Chờ</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Thời gian mở bán</span>` +
                            `<b>Chờ</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `</div>` +
                            `</div>` +
                            `<div class="right">` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Chọn</span>` +
                            `<b style="color: rgb(30, 184, 63);">Xanh</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Giao hàng</span>` +
                            `<b>${giao_hang}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Phí dịch vụ</span>` +
                            `<b>${phi_dich_vu}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `</div>` +
                            `</div>` +
                            `</div>` +
                            `<div class="end-time">` +
                            `<button class="van-button van-button--default van-button--small complaints">` +
                            `<div class="van-button__content">` +
                            `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                            `</div>` +
                            `</button>` +
                            `</div>` +
                            `</div>`
                        );
                    }
                    if (join == "t") {
                        $(".van-list:eq(1)").prepend(
                            `<div class="order-box">` +
                            `<div class="top">` +
                            `<em>₫</em>` +
                            `<span class="money">${totalMoney}</span>` +
                            `<div>kim ngạch thỏa thuận </div>` +
                            `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time}</span>` +
                            `</div>` +
                            `<div class="other">` +
                            `<div class="left">` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Giai đoạn</span>` +
                            `<b>${response.giai_doan}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Trạng thái</span>` +
                            `<b>Chờ</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Thời gian mở bán</span>` +
                            `<b>Chờ</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `</div>` +
                            `</div>` +
                            `<div class="right">` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Chọn</span>` +
                            `<b style="color: rgb(234, 58, 240);">Tím</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Giao hàng</span>` +
                            `<b>${giao_hang}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Phí dịch vụ</span>` +
                            `<b>${phi_dich_vu}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `</div>` +
                            `</div>` +
                            `</div>` +
                            `<div class="end-time">` +
                            `<button class="van-button van-button--default van-button--small complaints">` +
                            `<div class="van-button__content">` +
                            `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                            `</div>` +
                            `</button>` +
                            `</div>` +
                            `</div>`
                        );
                    }
                    if (join != "t" && join != "x" && join != "d") {
                        $(".van-list:eq(1)").prepend(
                            `<div class="order-box">` +
                            `<div class="top">` +
                            `<em>₫</em>` +
                            `<span class="money">${totalMoney}</span>` +
                            `<div>kim ngạch thỏa thuận </div>` +
                            `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time}</span>` +
                            `</div>` +
                            `<div class="other">` +
                            `<div class="left">` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Giai đoạn</span>` +
                            `<b>${response.giai_doan}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Trạng thái</span>` +
                            `<b>Chờ</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Thời gian mở bán</span>` +
                            `<b>Chờ</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `</div>` +
                            `</div>` +
                            `<div class="right">` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Chọn</span>` +
                            `<b style="color: rgb(0, 122, 204);">${response.join}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Giao hàng</span>` +
                            `<b>${giao_hang}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `<span class="auto">Phí dịch vụ</span>` +
                            `<b>${phi_dich_vu}</b>` +
                            `</div>` +
                            `<div class="item flex-box">` +
                            `</div>` +
                            `</div>` +
                            `</div>` +
                            `<div class="end-time">` +
                            `<button class="van-button van-button--default van-button--small complaints">` +
                            `<div class="van-button__content">` +
                            `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                            `</div>` +
                            `</button>` +
                            `</div>` +
                            `</div>`
                        );
                    }
                    $('.van-toast--success').fadeIn(100);
                    setTimeout(() => {
                        $('.van-toast--success').fadeOut(100);
                    }, 1200);
                    setTimeout(() => {
                        $('.van-overlay').fadeOut();
                        $('body').removeClass('van-overflow-hidden');
                        $('.sellz').addClass('van-popup--bottoms');
                        $('.show-order1').removeClass('box-pre-order sell');
                        $('.show-order1').removeClass('box-pre-number violet');
                        $('.show-order1').removeClass('box-pre-order');
                        $('.show-order1').removeClass('box-pre-number');
                        $('.show-order1').text('');
                        $('.show-order2').removeClass('confirm');
                        $('.show-order2').removeClass('confirmNumber');
                        $('.show-order2').removeClass('confirmNumber violet');
                        $('.show-order2').removeClass('confirm order');
                        $('.itemSell button').removeClass('active');
                        $('.itemSell button:eq(0)').addClass('active');
                        $('.itemNumber button').removeClass('active');
                        $('.van-stepper__inputD').val(1)
                        $('.van-stepper__minus').addClass('van-stepper__minus--disabled');
                    }, 200);
                    $('.itemSell').attr('price', 2000);
                } else if (response.message == 0) {
                    $('.van-toast--fail').fadeIn(100);
                    setTimeout(() => {
                        $('.van-toast--fail').fadeOut();
                    }, 1500);
                }
            }
        });
    } else if (!checkInput) {
        $('.van-toast--text .van-toast__text').text('Vui lòng nhập đúng số lượng cho phép !');
        $('.van-toast--text').fadeIn(100);
        setTimeout(() => {
            $('.van-toast--text').fadeOut();
        }, 1500);
    } else if (!checkbox) {
        $('.van-toast--text .van-toast__text').text('Vui lòng đồng ý với quy tắc quản lý bán trước.');
        $('.van-toast--text').fadeIn(100);
        setTimeout(() => {
            $('.van-toast--text').fadeOut();
        }, 1500);
    }
});

$('.top-selete-sub').click(function(e) {
    e.preventDefault();
    $('.top-selete-sub').removeClass('active');
    $(this).addClass('active');
    var textSelect = $('.top-selete .active').text().trim();
    if (textSelect == "Woipy") {
        $('.img-stage').addClass('display-none');
    } else {
        $('.img-stage').removeClass('display-none');
    }
});

$('.van-button--mini').click(function(e) {
    e.preventDefault();
    $('.van-overlay').fadeIn();
    $('.van-popup--center').fadeIn(100);
    $('body').addClass('van-overflow-hidden');
});

$('.van-popup__close-icon--top-right').click(function(e) {
    e.preventDefault();
    $('.van-overlay').fadeOut();
    $('.van-popup--center').fadeOut(100);
    $('body').removeClass('van-overflow-hidden');
});
$(document).ready(function() {
    var limit = 15;
    var start = 0;
    var action = 'inactive';

    function load_country_data(limit, start) {
        $.ajax({
            url: "/parity/orderWoipy",
            method: "POST",
            data: {
                limit: limit,
                start: start
            },
            cache: false,
            success: function(data) {
                const datas = JSON.parse(data);
                const chon = datas.chon.split(',');
                const giai_doan = datas.giai_doan.split(',');
                const giao_hang = datas.giao_hang.split(',');
                const ket_qua = datas.ket_qua.split(','); // VD: 208120
                const nhan_duoc = datas.nhan_duoc.split(',');
                const phi_dich_vu = datas.phi_dich_vu.split(',');
                const so_tien_cuoc = datas.so_tien_cuoc.split(',');
                const status = datas.status.split(',');
                const time_buy = datas.time_buy.split(',');
                const time_end = datas.time_end.split(',');
                for (let i = 0; i < ket_qua.length; i++) {
                    const ket_qua1 = formatMoney(ket_qua[i]);
                    const ket_qua2 = String(ket_qua[i]).split("")[5]; // VD: 0
                    const money = formatMoney(so_tien_cuoc[i]);
                    const chon1 = chon[i];
                    const status1 = status[i];
                    const giai_doan1 = giai_doan[i];
                    const nhan_duoc1 = formatMoney(nhan_duoc[i]);
                    const giao_hang1 = formatMoney(giao_hang[i]);
                    const phi_dich_vu1 = formatMoney(phi_dich_vu[i]);
                    const time_buy1 = time_buy[i].replace(".", ",");
                    const time_end1 = time_end[i].replace(".", ",");
                    if (chon1 == "d") {
                        if (status1 == "1") {
                            if (ket_qua2 != "0") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Thành công</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Đỏ` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Đỏ</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b>+</b> ${nhan_duoc1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            } else if (ket_qua2 == "0") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Thành công</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Đỏ` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Đỏ</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b>+</b> ${nhan_duoc1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            }
                        } else if (status1 == "2") {
                            if (ket_qua2 != "5") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Thất bại</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b style="color: rgb(30, 184, 63);">
                                    <b style="color: rgb(0, 122, 204);">${ket_qua2}</b>
                                    Xanh lục</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Đỏ</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b>-</b> ${giao_hang1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            } else if (ket_qua2 == "5") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Thất bại</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Xanh lục` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Đỏ</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b>-</b> ${giao_hang1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            }
                        } else if (status1 == "0") {
                            $('.van-list:eq(1)').append(
                                `<div class="order-box">` +
                                `<div class="top">` +
                                `<em>₫</em>` +
                                `<span class="money">${money}</span>` +
                                `<div>kim ngạch thỏa thuận </div>` +
                                `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                `</div>` +
                                `<div class="other">` +
                                `<div class="left">` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Giai đoạn</span>` +
                                `<b>${giai_doan1}</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Trạng thái</span>` +
                                `<b>Chờ</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Thời gian mở bán</span>` +
                                `<b>Chờ</b>` +
                                `</div>` +
                                `</div>` +
                                `<div class="right">` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Chọn</span>` +
                                `<b style="color: rgb(245, 41, 38);">Đỏ</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Giao hàng</span>` +
                                `<b>${giao_hang1}</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Phí dịch vụ</span>` +
                                `<b>${phi_dich_vu1}</b>` +
                                `</div>` +
                                `</div>` +
                                `</div>` +
                                `<div class="end-time">` +
                                `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                `<div class="van-button__content">` +
                                `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                `</div>` +
                                `</button>` +
                                `</div>` +
                                `</div>`
                            );
                        }
                    }
                    if (chon1 == "x") {
                        if (status1 == "1") {
                            if (ket_qua2 != "5") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Thành công</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Xanh lục` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Xanh lục</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b>+</b> ${nhan_duoc1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            } else if (ket_qua2 == "5") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Thành công</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Xanh lục` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Xanh lục</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b>+</b> ${nhan_duoc1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            }
                        } else if (status1 == "2") {
                            if (ket_qua2 != "0") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Thất bại</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Đỏ` +
                                    `</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Xanh lục</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b>-</b> ${giao_hang1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            } else if (ket_qua2 == "0") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Thất bại</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Đỏ` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Xanh lục</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b>-</b> ${giao_hang1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            }
                        } else if (status1 == "0") {
                            $('.van-list:eq(1)').append(
                                `<div class="order-box">` +
                                `<div class="top">` +
                                `<em>₫</em>` +
                                `<span class="money">${money}</span>` +
                                `<div>kim ngạch thỏa thuận </div>` +
                                `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                `</div>` +
                                `<div class="other">` +
                                `<div class="left">` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Giai đoạn</span>` +
                                `<b>${giai_doan1}</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Trạng thái</span>` +
                                `<b>Chờ</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Thời gian mở bán</span>` +
                                `<b>Chờ</b>` +
                                `</div>` +
                                `</div>` +
                                `<div class="right">` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Chọn</span>` +
                                `<b style="color: rgb(30, 184, 63);">Xanh lục</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Giao hàng</span>` +
                                `<b>${giao_hang1}</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Phí dịch vụ</span>` +
                                `<b>${phi_dich_vu1}</b>` +
                                `</div>` +
                                `</div>` +
                                `</div>` +
                                `<div class="end-time">` +
                                `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                `<div class="van-button__content">` +
                                `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                `</div>` +
                                `</button>` +
                                `</div>` +
                                `</div>`
                            );
                        }
                    }
                    if (chon1 == "t") {
                        if (status1 == "1") {
                            if (ket_qua2 == "0") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Thành công</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Đỏ` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b>+</b> ${nhan_duoc1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            } else if (ket_qua2 == "5") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Thành công</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Xanh lục` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b>+</b> ${nhan_duoc1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            }
                        } else if (status1 == "2") {
                            if (ket_qua2 == "2" || ket_qua2 == "4" || ket_qua2 == "6" || ket_qua2 == "8") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Thất bại</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Đỏ` +
                                    `</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b>-</b> ${giao_hang1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            } else if (ket_qua2 == "1" || ket_qua2 == "3" || ket_qua2 == "7" || ket_qua2 == "9") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Thất bại</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Xanh lục` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b>-</b> ${giao_hang1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            }
                        } else if (status1 == "0") {
                            $('.van-list:eq(1)').append(
                                `<div class="order-box">` +
                                `<div class="top">` +
                                `<em>₫</em>` +
                                `<span class="money">${money}</span>` +
                                `<div>kim ngạch thỏa thuận </div>` +
                                `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                `</div>` +
                                `<div class="other">` +
                                `<div class="left">` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Giai đoạn</span>` +
                                `<b>${giai_doan1}</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Trạng thái</span>` +
                                `<b>Chờ</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Thời gian mở bán</span>` +
                                `<b>Chờ</b>` +
                                `</div>` +
                                `</div>` +
                                `<div class="right">` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Chọn</span>` +
                                `<b style="color: rgb(232, 57, 241);">Tím</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Giao hàng</span>` +
                                `<b>${giao_hang1}</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Phí dịch vụ</span>` +
                                `<b>${phi_dich_vu1}</b>` +
                                `</div>` +
                                `</div>` +
                                `</div>` +
                                `<div class="end-time">` +
                                `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                `<div class="van-button__content">` +
                                `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                `</div>` +
                                `</button>` +
                                `</div>` +
                                `</div>`
                            );
                        }
                    }
                    if (chon1 != "d" && chon1 != "x" && chon1 != "t") {
                        if (status1 == "1") {
                            if (ket_qua2 == "5") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Thành công</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Xanh lục` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(0, 122, 204);">${chon1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b>+</b> ${nhan_duoc1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            }
                            if (ket_qua2 == "0") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(30, 184, 63);">Thành công</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Đỏ` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(0, 122, 204);">${chon1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(30, 184, 63);">` +
                                    `<b>+</b> ${nhan_duoc1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            }
                            if (ket_qua2 != "0" && ket_qua2 != "5") {
                                if (ket_qua2 == "2" || ket_qua2 == "4" || ket_qua2 == "6" || ket_qua2 == "8") {
                                    $('.van-list:eq(1)').append(
                                        `<div class="order-box">` +
                                        `<div class="top">` +
                                        `<em>₫</em>` +
                                        `<span class="money">${money}</span>` +
                                        `<div>kim ngạch thỏa thuận </div>` +
                                        `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                        `</div>` +
                                        `<div class="other">` +
                                        `<div class="left">` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giai đoạn</span>` +
                                        `<b>${giai_doan1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Trạng thái</span>` +
                                        `<b style="color: rgb(30, 184, 63);">Thành công</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giá mở bán</span>` +
                                        `<b>${ket_qua1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Kết quả</span>` +
                                        `<b style="color: rgb(245, 41, 38);">` +
                                        `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Đỏ` +
                                        `</b>` +
                                        `</div>` +
                                        `</div>` +
                                        `<div class="right">` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Chọn</span>` +
                                        `<b style="color: rgb(0, 122, 204);">${chon1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giao hàng</span>` +
                                        `<b>${giao_hang1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Phí dịch vụ</span>` +
                                        `<b>${phi_dich_vu1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Số lượng</span>` +
                                        `<b style="color: rgb(30, 184, 63);">` +
                                        `<b>+</b> ${nhan_duoc1}</b>` +
                                        `</div>` +
                                        `</div>` +
                                        `</div>` +
                                        `<div class="end-time">` +
                                        `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                        `<div class="van-button__content">` +
                                        `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                        `</div>` +
                                        `</button>` +
                                        `</div>` +
                                        `<div class="end-time">` +
                                        `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                        `</div>` +
                                        `</div>`
                                    );
                                }
                                if (ket_qua2 == "1" || ket_qua2 == "3" || ket_qua2 == "7" || ket_qua2 == "9") {
                                    $('.van-list:eq(1)').append(
                                        `<div class="order-box">` +
                                        `<div class="top">` +
                                        `<em>₫</em>` +
                                        `<span class="money">${money}</span>` +
                                        `<div>kim ngạch thỏa thuận </div>` +
                                        `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                        `</div>` +
                                        `<div class="other">` +
                                        `<div class="left">` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giai đoạn</span>` +
                                        `<b>${giai_doan1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Trạng thái</span>` +
                                        `<b style="color: rgb(30, 184, 63);">Thành công</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giá mở bán</span>` +
                                        `<b>${ket_qua1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Kết quả</span>` +
                                        `<b style="color: rgb(30, 184, 63);">` +
                                        `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Xanh lục` +
                                        `</b>` +
                                        `</div>` +
                                        `</div>` +
                                        `<div class="right">` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Chọn</span>` +
                                        `<b style="color: rgb(0, 122, 204);">${chon1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giao hàng</span>` +
                                        `<b>${giao_hang1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Phí dịch vụ</span>` +
                                        `<b>${phi_dich_vu1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Số lượng</span>` +
                                        `<b style="color: rgb(30, 184, 63);">` +
                                        `<b>+</b> ${nhan_duoc1}</b>` +
                                        `</div>` +
                                        `</div>` +
                                        `</div>` +
                                        `<div class="end-time">` +
                                        `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                        `<div class="van-button__content">` +
                                        `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                        `</div>` +
                                        `</button>` +
                                        `</div>` +
                                        `<div class="end-time">` +
                                        `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                        `</div>` +
                                        `</div>`
                                    );
                                }
                            }
                        } else if (status1 == "2") {
                            if (ket_qua2 == "5") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Thất bại</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b style="color: rgb(30, 184, 63);">
                                    <b style="color: rgb(0, 122, 204);">${ket_qua2}</b>
                                    Xanh lục</b>` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(0, 122, 204);">${chon1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b>-</b> ${giao_hang1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            }
                            if (ket_qua2 == "0") {
                                $('.van-list:eq(1)').append(
                                    `<div class="order-box">` +
                                    `<div class="top">` +
                                    `<em>₫</em>` +
                                    `<span class="money">${money}</span>` +
                                    `<div>kim ngạch thỏa thuận </div>` +
                                    `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                    `</div>` +
                                    `<div class="other">` +
                                    `<div class="left">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giai đoạn</span>` +
                                    `<b>${giai_doan1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Trạng thái</span>` +
                                    `<b style="color: rgb(245, 41, 38);">Thất bại</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giá mở bán</span>` +
                                    `<b>${ket_qua1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Kết quả</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Đỏ` +
                                    `<b style="color: rgb(232, 57, 241);"> Tím</b>` +
                                    `</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="right">` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Chọn</span>` +
                                    `<b style="color: rgb(0, 122, 204);">${chon1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Giao hàng</span>` +
                                    `<b>${giao_hang1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Phí dịch vụ</span>` +
                                    `<b>${phi_dich_vu1}</b>` +
                                    `</div>` +
                                    `<div class="item flex-box">` +
                                    `<span class="auto">Số lượng</span>` +
                                    `<b style="color: rgb(245, 41, 38);">` +
                                    `<b>-</b> ${giao_hang1}</b>` +
                                    `</div>` +
                                    `</div>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                    `<div class="van-button__content">` +
                                    `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                    `</div>` +
                                    `</button>` +
                                    `</div>` +
                                    `<div class="end-time">` +
                                    `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                    `</div>` +
                                    `</div>`
                                );
                            }
                            if (ket_qua2 != "0" && ket_qua2 != "5") {
                                if (ket_qua2 == "2" || ket_qua2 == "4" || ket_qua2 == "6" || ket_qua2 == "8") {
                                    $('.van-list:eq(1)').append(
                                        `<div class="order-box">` +
                                        `<div class="top">` +
                                        `<em>₫</em>` +
                                        `<span class="money">${money}</span>` +
                                        `<div>kim ngạch thỏa thuận </div>` +
                                        `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                        `</div>` +
                                        `<div class="other">` +
                                        `<div class="left">` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giai đoạn</span>` +
                                        `<b>${giai_doan1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Trạng thái</span>` +
                                        `<b style="color: rgb(245, 41, 38);">Thất bại</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giá mở bán</span>` +
                                        `<b>${ket_qua1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Kết quả</span>` +
                                        `<b style="color: rgb(245, 41, 38);">` +
                                        `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Đỏ` +
                                        `</b>` +
                                        `</div>` +
                                        `</div>` +
                                        `<div class="right">` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Chọn</span>` +
                                        `<b style="color: rgb(0, 122, 204);">${chon1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giao hàng</span>` +
                                        `<b>${giao_hang1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Phí dịch vụ</span>` +
                                        `<b>${phi_dich_vu1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Số lượng</span>` +
                                        `<b style="color: rgb(245, 41, 38);">` +
                                        `<b>-</b> ${giao_hang1}</b>` +
                                        `</div>` +
                                        `</div>` +
                                        `</div>` +
                                        `<div class="end-time">` +
                                        `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                        `<div class="van-button__content">` +
                                        `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                        `</div>` +
                                        `</button>` +
                                        `</div>` +
                                        `<div class="end-time">` +
                                        `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                        `</div>` +
                                        `</div>`
                                    );
                                }
                                if (ket_qua2 == "1" || ket_qua2 == "3" || ket_qua2 == "7" || ket_qua2 == "9") {
                                    $('.van-list:eq(1)').append(
                                        `<div class="order-box">` +
                                        `<div class="top">` +
                                        `<em>₫</em>` +
                                        `<span class="money">${money}</span>` +
                                        `<div>kim ngạch thỏa thuận </div>` +
                                        `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                        `</div>` +
                                        `<div class="other">` +
                                        `<div class="left">` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giai đoạn</span>` +
                                        `<b>${giai_doan1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Trạng thái</span>` +
                                        `<b style="color: rgb(245, 41, 38);">Thất bại</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giá mở bán</span>` +
                                        `<b>${ket_qua1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Kết quả</span>` +
                                        `<b style="color: rgb(30, 184, 63);">` +
                                        `<b style="color: rgb(0, 122, 204);">${ket_qua2}</b> Xanh lục` +
                                        `</b>` +
                                        `</div>` +
                                        `</div>` +
                                        `<div class="right">` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Chọn</span>` +
                                        `<b style="color: rgb(0, 122, 204);">${chon1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Giao hàng</span>` +
                                        `<b>${giao_hang1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Phí dịch vụ</span>` +
                                        `<b>${phi_dich_vu1}</b>` +
                                        `</div>` +
                                        `<div class="item flex-box">` +
                                        `<span class="auto">Số lượng</span>` +
                                        `<b style="color: rgb(245, 41, 38);">` +
                                        `<b>-</b> ${giao_hang1}</b>` +
                                        `</div>` +
                                        `</div>` +
                                        `</div>` +
                                        `<div class="end-time">` +
                                        `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                        `<div class="van-button__content">` +
                                        `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                        `</div>` +
                                        `</button>` +
                                        `</div>` +
                                        `<div class="end-time">` +
                                        `<span class="auto">Thời gian dừng ${time_end1}</span>` +
                                        `</div>` +
                                        `</div>`
                                    );
                                }
                            }
                        } else if (status1 == "0") {
                            $('.van-list:eq(1)').append(
                                `<div class="order-box">` +
                                `<div class="top">` +
                                `<em>₫</em>` +
                                `<span class="money">${money}</span>` +
                                `<div>kim ngạch thỏa thuận </div>` +
                                `<span class="time" style="background: none;letter-spacing: 0;">Thời gian khởi tạo&nbsp;${time_buy1}</span>` +
                                `</div>` +
                                `<div class="other">` +
                                `<div class="left">` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Giai đoạn</span>` +
                                `<b>${giai_doan1}</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Trạng thái</span>` +
                                `<b>Chờ</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Thời gian mở bán</span>` +
                                `<b>Chờ</b>` +
                                `</div>` +
                                `</div>` +
                                `<div class="right">` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Chọn</span>` +
                                `<b style="color: rgb(0, 122, 204);">${chon1}</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Giao hàng</span>` +
                                `<b>${giao_hang1}</b>` +
                                `</div>` +
                                `<div class="item flex-box">` +
                                `<span class="auto">Phí dịch vụ</span>` +
                                `<b>${phi_dich_vu1}</b>` +
                                `</div>` +
                                `</div>` +
                                `</div>` +
                                `<div class="end-time">` +
                                `<button onclick="location.href = '/complaint/help'" class="van-button van-button--default van-button--small complaints">` +
                                `<div class="van-button__content">` +
                                `<span class="van-button__text">Khiếu nại &nbsp;&nbsp;&gt;</span>` +
                                `</div>` +
                                `</button>` +
                                `</div>` +
                                `</div>`
                            );
                        }
                    }
                }
                if (giai_doan == '') {
                    $('.van-list__finished-text').text("Không còn dữ liệu");
                    action = 'active';
                } else {
                    $('.van-list__finished-text').html('<div data-v-7d40872f="" class="order-content"><div role="feed" class="van-list" aria-busy="true"><div class="van-list__loading"><div class="van-loading van-loading--circular"><span class="van-loading__spinner van-loading__spinner--circular" style="width: 16px; height: 16px;"><svg viewBox="25 25 50 50" class="van-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span><span class="van-loading__text">Đang tải...</span></div></div><div class="van-list__placeholder"></div></div></div>');
                    action = "inactive";
                }
            }
        });
    }

    if (action == 'inactive') {
        action = 'active';
        load_country_data(limit, start);
    }
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(".orders_bottomz").height() && action == 'inactive') {
            action = 'active';
            start = start + limit;
            setTimeout(function() {
                load_country_data(limit, start);
            }, 1200);
        }
    });
});