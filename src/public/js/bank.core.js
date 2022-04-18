$(document).ready(function() {
    $('.hideBtn button').click(function(e) {
        e.preventDefault();
        $('.hideBtn').addClass('display-none');
        $('.van-hairline--top-bottom').removeClass('display-none');
        $('.btn-update-banking').addClass('display-none');
    });
    $('.backToShowBank').click(function(e) {
        e.preventDefault();
        $('.van-hairline--top-bottom').addClass('display-none');
        $('.hideBtn').removeClass('display-none')
    })
    $('.name-banking').click(function() {
        $('.van-overlay').removeClass("display-none");
        $('body').addClass("hsc");
        $('.van-overlay').animate({ opacity: '1' }, 350);
        $('.van-popup--round').removeClass('show_btn_bottom')
    });
    $('.van-overlay, .van-picker__cancel').click(function() {
        $('.van-popup--round').addClass('show_btn_bottom');
        $('.van-overlay').animate({ opacity: '0' }, 350);
        $('body').removeClass("hsc");
        setTimeout(() => { $('.van-overlay').addClass("display-none") }, 350)
    })
    $('.van-picker-column__item').click(function() {
        $('.van-picker-column__item').removeClass('van-picker-column__item--selected');
        $(this).addClass('van-picker-column__item--selected')
    });
    $('.van-picker-column__item:eq(0)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, 110px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, 110px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(1)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, 66px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, 66px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(2)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, 22px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, 22px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(3)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -22px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -22px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(4)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -66px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -66px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(5)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -110px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -110px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(6)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -154px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -154px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(7)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -198px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -198px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(8)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -242px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -242px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(9)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -286px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -286px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(10)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -330px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -330px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    });
    $('.van-picker-column__item:eq(11)').click(function() {
        document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -374px, 0px);transition-duration: 200ms;transition-property: all;";
        setTimeout(() => { document.querySelector('.van-picker-column__wrapper').style = "transform: translate3d(0px, -374px, 0px);transition-duration: 0ms;transition-property: none;" }, 100)
    })
});
$(document).ready(function() {
    $('.van-picker__confirm').click(function() {
        var select_banking = $('.van-picker-column__item--selected .van-ellipsis').text();
        $('.van-popup--round').addClass('show_btn_bottom');
        $('.van-overlay').animate({ opacity: '0' }, 350);
        setTimeout(() => { $('.van-overlay').addClass("display-none") }, 350);
        $('.name_bank').val(select_banking)
    })
    var counter = function() {
        var check_cownDown = localStorage.getItem("Cowndown");
        if (check_cownDown == null) {
            $('.show_cowndown').html('<span data-v-5f483b78="" class="van-button__text loadOTP" id="OTP">Mã OTP</span>');
            $('.van-button--primary').removeAttr('disabled');
            $('.van-button--primary').removeClass('van-button--disabled');
            $("#OTP").html("Mã OTP");
        }
        if (check_cownDown < 2) {
            localStorage.removeItem("Cowndown");
            $('.show_cowndown').html('<span data-v-5f483b78="" class="van-button__text loadOTP" id="OTP">Mã OTP</span>')
        }
        if (check_cownDown > 0) {
            var value = check_cownDown;
            value = parseInt(value) - 1;
            localStorage.setItem("Cowndown", value);
            $('.van-button--primary').attr('disabled', "disabled");
            $('.van-button--primary').addClass('van-button--disabled');
            $('.show_cowndown').html('<span data-v-5f483b78="" class="van-button__text" id="OTP"></span>');
            document.getElementById('OTP').innerHTML = value + " giây";
            $('.show_cowndown2').html(value + " giây");
        }
    };
    setInterval(counter, 1000);
    // const btn_otp = document.querySelector('.van-button--primary');
});
$(document).ready(function() {
    $('.send_otp').click(function() {
        var value = 60;
        localStorage.setItem("Cowndown", value);
        $.ajax({
            type: "POST",
            url: "/member/myBank",
            dataType: "json",
            data: { grid_banking: "otp", },
            success: function(response) {
                if (response.message == 1) {
                    $('.van-toast--loading').removeClass('display-none');
                    setTimeout(function() {
                        $('.van-toast--loading').addClass('display-none');
                        $('.van-toast--text').removeClass('display-none');
                        $('.van-toast--text .van-toast__text').html('Mã xác nhận đã gửi thành công');
                        $('body').removeClass('van-overflow-hidden');
                        setTimeout(function() { $('.van-toast--text').addClass('display-none') }, 500)
                    }, 1300)
                }
            }
        })
    })
});
$(document).ready(function() {
    $('.add_banking').click(function() {
        var name_user_bank = $('.name_user_bank').val();
        var name_bank = $('.name_bank').val();
        var stk_bank = $('.stk_bank').val().trim();
        var re_stk_bank = $('.re_stk_bank').val().trim();
        var tinh = $('.tinh').val();
        var thanhpho = $('.thanhpho').val();
        var diachi = $('.diachi').val();
        var sdt = $('.sdt').val().trim();
        var email_bank = $('.email_bank').val().trim();
        var otp_bank = $('.otp_bank').val().trim();
        if (name_user_bank != "" && name_bank != "" && stk_bank != "" && re_stk_bank != "" && tinh != "" && thanhpho != "" && diachi != "" && sdt != "" && email_bank != "" && otp_bank != "" && stk_bank == re_stk_bank) {
            $.ajax({
                type: "POST",
                url: "/member/MyBank",
                data: {
                    name_user_bank: name_user_bank,
                    name_bank: name_bank,
                    stk_bank: stk_bank,
                    tinh: tinh,
                    thanhpho: thanhpho,
                    diachi: diachi,
                    sdt: sdt,
                    email_bank: email_bank,
                    otp_bank: otp_bank,
                    type: "add"
                },
                success: function(response) {
                    const status = JSON.parse(response);
                    if (status.message == 1) {
                        $('.van-toast--loading').removeClass('display-none');
                        $('.van-toast--text .van-toast__text').text('Thêm tài khoản ngân hàng thành công!');
                        setTimeout(() => {
                            $('.van-toast--text').removeClass('display-none');
                            $('.van-toast--loading').addClass('display-none');
                            setTimeout(() => {
                                $('.van-toast--text').addClass('display-none');
                                window.location = "MyBank"
                            }, 500)
                        }, 900)
                    } else if (status.message == 3) {
                        $('.van-toast--loading').removeClass('display-none');
                        $('.van-toast--text .van-toast__text').text('Tài khoản này đã tồn tại!');
                        setTimeout(() => {
                            $('.van-toast--text').removeClass('display-none');
                            $('.van-toast--loading').addClass('display-none');
                            setTimeout(() => { $('.van-toast--text').addClass('display-none') }, 500)
                        }, 900)
                    } else if (status.message == 2) {
                        $('.van-toast--loading').removeClass('display-none');
                        $('.van-toast--text .van-toast__text').text('Mã xác minh không chính xác!');
                        setTimeout(() => {
                            $('.van-toast--text').removeClass('display-none');
                            $('.van-toast--loading').addClass('display-none');
                            setTimeout(() => { $('.van-toast--text').addClass('display-none') }, 500)
                        }, 900)
                    }
                }
            })
        } else if (name_user_bank == "") {
            $('.van-field__error-message').eq(0).text("Vui lòng nhập tên thực");
            $(".name_user_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (name_bank == "") {
            $('.van-field__error-message').eq(1).text("Vui lòng nhập tên ngân hàng");
            $(".name_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (stk_bank == "") {
            $('.van-field__error-message').eq(2).text("Vui lòng nhập số tài khoản ngân hàng");
            $(".stk_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (re_stk_bank == "") {
            $('.van-field__error-message').eq(3).text("Vui lòng nhập lại số tài khoản ngân hàng");
            $(".re_stk_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (re_stk_bank != stk_bank) {
            $('.van-field__error-message').eq(3).text("Số tài khoản không trùng nhau");
            $(".re_stk_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (tinh == "") {
            $('.van-field__error-message').eq(4).text("Vui lòng nhập tên tỉnh");
            $(".tinh").keyup(function() { $('.van-field__error-message').html("") })
        } else if (thanhpho == "") {
            $('.van-field__error-message').eq(5).text("Vui lòng nhập tên thành phố");
            $(".thanhpho").keyup(function() { $('.van-field__error-message').html("") })
        } else if (diachi == "") {
            $('.van-field__error-message').eq(6).text("Vui lòng nhập địa chỉ");
            $(".diachi").keyup(function() { $('.van-field__error-message').html("") })
        } else if (sdt == "") {
            $('.van-field__error-message').eq(7).text("Vui lòng nhập số điện thoại");
            $(".sdt").keyup(function() { $('.van-field__error-message').html("") })
        } else if (email_bank == "") {
            $('.van-field__error-message').eq(8).text("Vui lòng nhập email");
            $(".email_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (otp_bank == "") {
            $('.van-toast--text').removeClass('display-none');
            $('.van-toast--text .van-toast__text').html('Vui lòng nhập mã xác minh!');
            setTimeout(function() { $('.van-toast--text').addClass('display-none') }, 1000)
        }
    })
    $('.btn-update-banking').click(function() {
        var name_user_bank = $('.name_user_bank').val();
        var name_bank = $('.name_bank').val();
        var stk_bank = $('.stk_bank').val().trim();
        var re_stk_bank = $('.re_stk_bank').val().trim();
        var tinh = $('.tinh').val();
        var thanhpho = $('.thanhpho').val();
        var diachi = $('.diachi').val();
        var sdt = $('.sdt').val().trim();
        var email_bank = $('.email_bank').val().trim();
        var otp_bank = $('.otp_bank').val().trim();
        if (name_user_bank != "" && name_bank != "" && stk_bank != "" && re_stk_bank != "" && tinh != "" && thanhpho != "" && diachi != "" && sdt != "" && email_bank != "" && otp_bank != "" && stk_bank == re_stk_bank) {
            $.ajax({
                type: "POST",
                url: "/member/MyBank",
                data: {
                    name_user_bank: name_user_bank,
                    name_bank: name_bank,
                    stk_bank: stk_bank,
                    tinh: tinh,
                    thanhpho: thanhpho,
                    diachi: diachi,
                    sdt: sdt,
                    email_bank: email_bank,
                    otp_bank: otp_bank,
                    type: "update"
                },
                success: function(response) {
                    const status = JSON.parse(response);
                    if (status.message == 1) {
                        $('.van-toast--loading').removeClass('display-none');
                        $('.van-toast--text .van-toast__text').text('Thêm tài khoản ngân hàng thành công!');
                        setTimeout(() => {
                            $('.van-toast--text').removeClass('display-none');
                            $('.van-toast--loading').addClass('display-none');
                            setTimeout(() => {
                                $('.van-toast--text').addClass('display-none');
                                window.location = "MyBank"
                            }, 500)
                        }, 900)
                    } else if (status.message == 3) {
                        $('.van-toast--loading').removeClass('display-none');
                        $('.van-toast--text .van-toast__text').text('Tài khoản này đã tồn tại!');
                        setTimeout(() => {
                            $('.van-toast--text').removeClass('display-none');
                            $('.van-toast--loading').addClass('display-none');
                            setTimeout(() => { $('.van-toast--text').addClass('display-none') }, 500)
                        }, 900)
                    } else if (status.message == 2) {
                        $('.van-toast--loading').removeClass('display-none');
                        $('.van-toast--text .van-toast__text').text('Mã xác minh không chính xác!');
                        setTimeout(() => {
                            $('.van-toast--text').removeClass('display-none');
                            $('.van-toast--loading').addClass('display-none');
                            setTimeout(() => { $('.van-toast--text').addClass('display-none') }, 500)
                        }, 900)
                    }
                }
            })
        } else if (name_user_bank == "") {
            $('.van-field__error-message').eq(0).text("Vui lòng nhập tên thực");
            $(".name_user_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (name_bank == "") {
            $('.van-field__error-message').eq(1).text("Vui lòng nhập tên ngân hàng");
            $(".name_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (stk_bank == "") {
            $('.van-field__error-message').eq(2).text("Vui lòng nhập số tài khoản ngân hàng");
            $(".stk_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (re_stk_bank == "") {
            $('.van-field__error-message').eq(3).text("Vui lòng nhập lại số tài khoản ngân hàng");
            $(".re_stk_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (re_stk_bank != stk_bank) {
            $('.van-field__error-message').eq(3).text("Số tài khoản không trùng nhau");
            $(".re_stk_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (tinh == "") {
            $('.van-field__error-message').eq(4).text("Vui lòng nhập tên tỉnh");
            $(".tinh").keyup(function() { $('.van-field__error-message').html("") })
        } else if (thanhpho == "") {
            $('.van-field__error-message').eq(5).text("Vui lòng nhập tên thành phố");
            $(".thanhpho").keyup(function() { $('.van-field__error-message').html("") })
        } else if (diachi == "") {
            $('.van-field__error-message').eq(6).text("Vui lòng nhập địa chỉ");
            $(".diachi").keyup(function() { $('.van-field__error-message').html("") })
        } else if (sdt == "") {
            $('.van-field__error-message').eq(7).text("Vui lòng nhập số điện thoại");
            $(".sdt").keyup(function() { $('.van-field__error-message').html("") })
        } else if (email_bank == "") {
            $('.van-field__error-message').eq(8).text("Vui lòng nhập email");
            $(".email_bank").keyup(function() { $('.van-field__error-message').html("") })
        } else if (otp_bank == "") {
            $('.van-toast--text').removeClass('display-none');
            $('.van-toast--text .van-toast__text').html('Vui lòng nhập mã xác minh!');
            setTimeout(function() { $('.van-toast--text').addClass('display-none') }, 1000)
        }
    })
})