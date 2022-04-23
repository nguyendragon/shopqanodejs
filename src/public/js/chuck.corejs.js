$(document).ready(function() {
    $('.van-tab1').click(function() {
        $('.van-tab2').removeClass('van-tab--active');
        $('.van-tab1').addClass('van-tab--active');
        $('.van-tabs__track').addClass('login');
        $('.van-tabs__track').removeClass('register')
    });
    $('.van-tab2').click(function() {
        $('.van-tab1').removeClass('van-tab--active');
        $('.van-tabs__track').removeClass('login');
        $('.van-tab2').addClass('van-tab--active');
        $('.van-tabs__track').addClass('register')
    })
    const resetPassword = document.querySelector('.reset-password');
    resetPassword.addEventListener('click', function() { window.location = 'reset-password' });
});
$(document).ready(function() {
    var counter = function() {
        var check_cownDown = localStorage.getItem("Cowndown");
        if (check_cownDown == null) {
            $('.show_cowndown').html('<span data-v-5f483b78="" class="van-button__text" id="OTP">Mã OTP</span>');
            var btn_otp = document.querySelector('.register-button__otp');
            btn_otp.removeAttribute("disabled");
            btn_otp.classList.remove('van-button--disabled');
            document.getElementById('OTP').innerHTML = "Mã OTP"
        }
        if (check_cownDown < 2) {
            localStorage.removeItem("Cowndown");
            $('.show_cowndown').html('<span data-v-5f483b78="" class="van-button__text" id="OTP">Mã OTP</span>')
        }
        if (check_cownDown > 0) {
            var value = check_cownDown;
            value = parseInt(value) - 1;
            localStorage.setItem("Cowndown", value);
            var btn_otp = document.querySelector('.register-button__otp');
            var createDisable = document.createAttribute("disabled");
            createDisable.value = "disabled";
            btn_otp.setAttributeNode(createDisable);
            btn_otp.classList.add('van-button--disabled');
            $('.show_cowndown').html('<span data-v-5f483b78="" class="van-button__text" id="OTP"></span>');
            document.getElementById('OTP').innerHTML = value + " giây";
            document.getElementById("OTP").style.minWidth = "60.7px"
        }
    };
    setInterval(counter, 1000);
});

$(window).on('load', function() { // makes sure the whole site is loaded 
    $('.preloader').delay(100).fadeOut('fast');
});
$(document).ready(function() {
    const ipClients = async() => {
        let ipClients = await fetch('https://api.ipify.org/?format=json');
        let response = await ipClients.json();
        let data = await response;
        $('#ip').text(data.ip);
    }
    const token = "Bearer " + localStorage.getItem('token');
    ipClients();

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    $('.login_check').click(function(e) {
        e.preventDefault();
        const phone_login = $('#phone_login').val().trim();
        const password_login = $('#pass_login').val().trim();
        $(this).attr('disabled', 'disabled');
        if (phone_login != "") {
            var settings = {
                "url": "/account/login",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    // "phone_login": "phone_login",
                    // "password_login": "password_login",
                    // "token": token,
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "phone_login": phone_login,
                    "password_login": password_login
                }),
            };

            $.ajax(settings).done(function(response) {
                const data = JSON.parse(response);
                if (data.message == 1) {
                    setTimeout(() => {
                        $('.login_check').removeAttr('disabled');
                    }, 1000);
                    $('.van-toast--loading').removeClass('display-none');
                    $('.van-toast--loading').add('display-flex');
                    setTimeout(function() {
                        $('.van-toast--loading').addClass('display-none');
                        $('.van-toast--loading').removeClass('display-flex');
                        setCookie('token', data.token, 7);
                        setTimeout(() => {
                            window.location = "/member/index"
                        }, 300)
                    }, 700)
                } else if (data.message == 2) {
                    setTimeout(() => {
                        $('.login_check').removeAttr('disabled');
                    }, 1000);
                    $('.van-toast--loading').removeClass('display-none');
                    $('.van-toast--loading').add('display-flex');
                    setTimeout(function() {
                        $('.van-toast--loading').addClass('display-none');
                        $('.van-toast--loading').removeClass('display-flex');
                        $('.van-toast--fail').addClass('display-flex');
                        $('.van-toast--fail .van-toast__text').html('Tài khoản không tồn tại')
                        setTimeout(function() {
                            $('.van-toast--fail').removeClass('display-flex')
                        }, 700)
                    }, 700);
                } else if (data.message == 3) {
                    setTimeout(() => {
                        $('.login_check').removeAttr('disabled');
                    }, 1000);
                    $('.van-toast--loading').removeClass('display-none');
                    $('.van-toast--loading').add('display-flex');
                    setTimeout(function() {
                        $('.van-toast--loading').addClass('display-none');
                        $('.van-toast--loading').removeClass('display-flex');
                        $('.van-toast--fail').addClass('display-flex');
                        $('.van-toast--fail .van-toast__text').html('Lỗi mật khẩu !')
                        setTimeout(function() {
                            $('.van-toast--fail').removeClass('display-flex')
                        }, 700)
                    }, 700);
                }
            });
        } else {
            setTimeout(() => {
                $('.login_check').removeAttr('disabled');
            }, 1000);
            $('#error').html("Vui lòng nhập số điện thoại");
            $("#phone_login").keyup(function() {
                $('#error').html("")
            });
        }

    });
    /**************************************************************/
    $('.register-button__otp').click(function(e) {
        e.preventDefault();
        $(this).attr('disabled', 'disabled');
        const phone_signup = $('.Nationalarea-input').val().trim();
        const ip = $('#ip').text();
        let length_input = phone_signup.length;
        if (phone_signup != '' && length_input > 8 && length_input < 10) {
            var settings = {
                "url": "/account/otpsignup",
                "method": "POST",
                "timeout": 0,
                // "headers": {
                //     "phone_signup": "phone_signup",
                //     "ip": "ip",
                // },
                "data": {
                    "phone_signup": phone_signup,
                    "ip": ip,
                },
            };

            $.ajax(settings).done(function(response) {
                // const data = JSON.parse(response);
                // console.log(data);
            });
            $('body').addClass('van-overflow-hidden');
            $('.register-button__otp').addClass('van-button--disabled');
            $('.van-toast--loading').removeClass('display-none');
            setTimeout(function() {
                $('.van-toast--loading').addClass('display-none');
                $('.van-toast--text').removeClass('display-none');
                $('.van-toast--text .van-toast__text').html('Mã xác nhận đã gửi thành công');
                setTimeout(function() {
                    $('.van-toast--text').addClass('display-none')
                }, 500)
            }, 1300);
            var value = 60;
            localStorage.setItem("Cowndown", value);
            setTimeout(function() {
                $('body').removeClass('van-overflow-hidden')
            }, 1700)
        } else {
            if (phone_signup == '') {
                $('.errrorPhone').html("Vui lòng nhập số điện thoại");
                $(".Nationalarea-input").keyup(function() {
                    $('.errrorPhone').html("")
                });
            } else if (length_input < 9 || length_input > 9) {
                $('.errrorPhone').html("Số điện thoại có 9 số");
                $(".Nationalarea-input").keyup(function() {
                    $('.errrorPhone').html("")
                });
            }
        }

    });
    /**************************************************************/
    document.querySelector(".checkbox").checked = !0;
    $('.signup_check').click(function() {
            var phone_signup = $(".Nationalarea-input").val().trim();
            var pass_signup = $(".pass_signup").val().trim();
            var re_pass_signup = $(".re_pass_signup").val().trim();
            var otp_signup = $(".otp_signup").val().trim();
            var infiniti_signup = $(".infiniti_signup").val().trim();
            $(this).attr("disabled", "disabled");
            var length_input = phone_signup.length;
            var checkNumber = $.isNumeric(phone_signup);
            if (checkNumber == true && phone_signup != "" && pass_signup != "" && re_pass_signup != "" && length_input > 8 && length_input < 10 && otp_signup != "" && infiniti_signup != "" && pass_signup == re_pass_signup) {
                var settings = {
                    "url": "/account/signup",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "phone_signup": "phone_signup",
                        "password_v1": "pass_signup",
                        "codeOTP": "otp_signup",
                        "MaGioiThieu": "infiniti_signup",
                    },
                    "data": {
                        "phone_signup": phone_signup,
                        "password_v1": pass_signup,
                        "codeOTP": otp_signup,
                        "MaGioiThieu": infiniti_signup,
                    },
                };

                $.ajax(settings).done(function(response) {
                    const dataSignUP = JSON.parse(response);
                    if (dataSignUP.message == 1) {
                        $('.van-toast--text').removeClass('display-none');
                        $('.van-toast--text .van-toast__text').html('Đăng ký thành công.');
                        setTimeout(function() {
                            $('.van-toast--text').addClass('display-none')
                        }, 1000);
                        $('.van-tab2').removeClass('van-tab--active');
                        $('.van-tab1').addClass('van-tab--active');
                        $('.van-tabs__track').addClass('login');
                        $('.van-tabs__track').removeClass('register')
                        $('.signup_check').removeAttr("disabled");
                    } else if (dataSignUP.message == 0) {
                        $('.van-toast--fail').removeClass('display-none');
                        $('.van-toast--fail .van-toast__text').html('Số điện thoại di động đã được đăng ký.');
                        setTimeout(function() {
                            $('.van-toast--fail').addClass('display-none')
                        }, 1000)
                        $('.signup_check').removeAttr("disabled");
                    } else if (dataSignUP.message == 2) {
                        $('.van-toast--fail').removeClass('display-none');
                        $('.van-toast--fail .van-toast__text').html('Sai mã xác minh!');
                        setTimeout(function() {
                            $('.van-toast--fail').addClass('display-none')
                        }, 1000);
                        $('.signup_check').removeAttr("disabled");
                    } else if (dataSignUP.message == 3) {
                        $('.van-toast--fail').removeClass('display-none');
                        $('.van-toast--fail .van-toast__text').html('Mã đề xuất không tồn tại!');
                        setTimeout(function() {
                            $('.van-toast--fail').addClass('display-none')
                        }, 1000);
                        $('.signup_check').removeAttr("disabled");
                    }
                });
            }
            var checkbox = document.querySelector('.checkbox').checked;
            if (checkbox == !1) {
                $('.van-toast--text').removeClass("display-none");
                $('.van-toast--text .van-toast__text').html('Vui lòng đồng ý với chính sách bảo mật trước tiên.');
                setTimeout(function() {
                    setTimeout(function() {
                        $('.van-toast--text').addClass("display-none");
                        $('.signup_check').removeAttr("disabled");
                    }, 1000)
                }, 200);
            } else if (phone_signup == "" || checkNumber == false) {
                $('.errrorPhone').html("Vui lòng nhập số điện thoại");
                $(".Nationalarea-input").keyup(function() {
                    $('.errrorPhone').html("")
                });
                $('.signup_check').removeAttr("disabled");
            } else if (length_input < 9 || length_input > 9) {
                $('.errrorPhone').html("Số điện thoại có 9 số");
                $(".Nationalarea-input").keyup(function() {
                    $('.errrorPhone').html("")
                });
                $('.signup_check').removeAttr("disabled");
            } else if (pass_signup == "") {
                $('.pa').html("Vui lòng nhập mật khẩu");
                $(".pass_signup").keyup(function() {
                    $('.pa').html("")
                });
                $('.signup_check').removeAttr("disabled");
            } else if (re_pass_signup == "") {
                $('.re').html("Vui lòng nhập mật khẩu xác nhận");
                $(".re_pass_signup").keyup(function() {
                    $('.re').html("")
                });
                $('.signup_check').removeAttr("disabled");
            } else if (pass_signup != re_pass_signup) {
                $('.kk').html("Mật khẩu không trùng khớp");
                $(".re_pass_signup").keyup(function() {
                    $('.kk').html("")
                });
                $('.signup_check').removeAttr("disabled");
            } else if (infiniti_signup == "") {
                $('.van-toast--fail').removeClass("display-none");
                $('.van-toast--fail .van-toast__text').html('Vui lòng nhập mã đề xuất.');
                setTimeout(function() {
                    setTimeout(function() {
                        $('.van-toast--fail').addClass("display-none")
                    }, 1000)
                }, 200)
                $('.signup_check').removeAttr("disabled");
            } else if (otp_signup == "") {
                $('.van-toast--fail').removeClass("display-none");
                $('.van-toast--fail .van-toast__text').html('Vui lòng nhập mã OTP.');
                setTimeout(function() {
                    setTimeout(function() {
                        $('.van-toast--fail').addClass("display-none")
                    }, 1000)
                }, 200)
                $('.signup_check').removeAttr("disabled");
            }
        })
        /**************************************************************/
});