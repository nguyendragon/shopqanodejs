$(window).on('load', function() {
    setTimeout(() => {
        $('#preloader').fadeOut();
    }, 300);
})
$(document).ready(function() {
    const checkActive = localStorage.getItem('active');
    if (checkActive == null) {
        localStorage.setItem('active', '/manage/admin/index');
        location.href = `/manage/admin/index`;
    } else {
        $('.nav-pills .nav-item a').click(function(e) {
            e.preventDefault();
            const href = $(this).attr('href');
            localStorage.setItem('active', `${href}`);
            location.href = `${href}`;
        });
    }
    const getHref = localStorage.getItem('active');

    $(`a[href="${getHref}"]`).addClass('active');
    $(`a[href="${getHref}"]`).css('pointerEvents', 'none');
});

function formatMoney(money) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function cownDownTimer() {
    var countDownDate = new Date("2030-07-16T23:59:59.9999999+01:00").getTime();
    setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var minute = Math.ceil(minutes / 20 - 1);
        if (minutes == 59) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 58) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 57) {
            var minute = Math.ceil(minutes / 20 - 3);
        }
        if (minutes == 56) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 55) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 54) {
            var minute = Math.ceil(minutes / 20 - 3);
        }
        if (minutes == 53) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 52) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 51) {
            var minute = Math.ceil(minutes / 20 - 3);
        }
        if (minutes == 50) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 49) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 48) {
            var minute = Math.ceil(minutes / 20 - 3);
        }
        if (minutes == 47) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 46) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 45) {
            var minute = Math.ceil(minutes / 20 - 3);
        }
        if (minutes == 44) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 43) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 42) {
            var minute = Math.ceil(minutes / 20 - 3);
        } else if (minutes == 41) {
            var minute = Math.ceil(minutes / 20 - 1);
        }
        if (minutes == 40) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 39) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 38) {
            var minute = Math.ceil(minutes / 20);
        }
        if (minutes == 37) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 36) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 35) {
            var minute = Math.ceil(minutes / 20);
        }
        if (minutes == 34) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 33) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 32) {
            var minute = Math.ceil(minutes / 20);
        }
        if (minutes == 31) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 30) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 29) {
            var minute = Math.ceil(minutes / 20);
        }
        if (minutes == 28) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 27) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 26) {
            var minute = Math.ceil(minutes / 20);
        }
        if (minutes == 25) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 24) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 23) {
            var minute = Math.ceil(minutes / 20);
        }
        if (minutes == 22) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 21) {
            var minute = Math.ceil(minutes / 20 - 2);
        } else if (minutes == 20) {
            var minute = Math.ceil(minutes / 20 + 1);
        } else if (minutes == 19) {
            var minute = Math.ceil(minutes / 20);
        } else if (minutes == 18) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 17) {
            var minute = Math.ceil(minutes / 20 + 1);
        } else if (minutes == 16) {
            var minute = Math.ceil(minutes / 20);
        } else if (minutes == 15) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 14) {
            var minute = Math.ceil(minutes / 20 + 1);
        } else if (minutes == 13) {
            var minute = Math.ceil(minutes / 20);
        } else if (minutes == 12) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 11) {
            var minute = Math.ceil(minutes / 20 + 1);
        } else if (minutes == 10) {
            var minute = Math.ceil(minutes / 20);
        } else if (minutes == 9) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 8) {
            var minute = Math.ceil(minutes / 20 + 1);
        } else if (minutes == 7) {
            var minute = Math.ceil(minutes / 20);
        } else if (minutes == 6) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 5) {
            var minute = Math.ceil(minutes / 20 + 1);
        } else if (minutes == 4) {
            var minute = Math.ceil(minutes / 20);
        } else if (minutes == 3) {
            var minute = Math.ceil(minutes / 20 - 1);
        } else if (minutes == 2) {
            var minute = Math.ceil(minutes / 20 + 1);
        } else if (minutes == 1) {
            var minute = Math.ceil(minutes / 20);
        } else if (minutes == 0) {
            var minute = Math.ceil(minutes / 20);
        }
        var seconds1 = Math.floor((distance % (1000 * 60)) / 10000);
        var seconds2 = Math.floor((distance % (1000 * 60)) / 1000);
        $('.time-sub:eq(0)').html("0");
        $('.time-sub:eq(1)').html(minute);
        $('.time-sub:eq(2)').html(seconds1);
        $('.time-sub:eq(3)').html(seconds2 % 10);
    }, 0);
};

cownDownTimer();

$('.start-order').click(function(e) {
    e.preventDefault();
    Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
    );
});