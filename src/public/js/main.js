const vancenter = document.querySelectorAll('.van-grid-item__content--center');
$('.ql').click(function() { window.location = '/Admin' });
$('.van-member-item1').click(function() { window.location = '/index' });
$('.van-member-item2').click(function() { window.location = '/parity/tran' });
$('.van-member-item3').click(function() {});
$('.nv').click(function() { window.location = '/myTask/taskCenter' });
$('.lx').click(function() { window.location = '/redenvelope/manage' });
$('.invite').click(function() { window.location = '/promotion/index' });
$('.my, .mySent').click(function() { window.location = 'MyWallet' });
$('.van-goods-icon, .settings').click(function() { window.location = 'Security' });
$('.address').click(function() { window.location = 'myaddress' });
$('.banking').click(function() { window.location = 'MyBank' });
$('.detailBank').click(function() { window.location = '/financial/index' });
$('.about').click(function() { window.location = '/about/index' });
$('.ContactUs').click(function() { window.location = 'ContactUs' });
$('.complaint').click(function() { window.location = '/complaint/index' });
for (const vancenters of vancenter) { vancenters.addEventListener('click', function() { window.location = '/trade/index' }) }
$('.cache').click(function() {
    document.querySelector('.van-overlay').style = 'z-index: 2013;display: block;';
    document.querySelector('.showCache').style = 'z-index: 2014;display: block;';
    $('.body').addClass('van-overflow-hidden');
});
$('.van-overlay').click(function() {
    document.querySelector('.van-overlay').style = 'z-index: 2013;display: none;';
    document.querySelector('.showCache').style = 'z-index: 2014;display: none;';
    body.classList.remove('van-overflow-hidden');
});
$('.van-dialog__cancel').click(function() {
    document.querySelector('.van-overlay').style = 'z-index: 2013;display: none;';
    document.querySelector('.showCache').style = 'z-index: 2014;display: none;';
    $('.body').removeClass('van-overflow-hidden');
});
$('.van-hairline--left').click(function() { window.location.reload() });

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var checkToken = getCookie('token');


$('.logout').click(function() {
    setCookie('token', '', 0);
    if (checkToken == "") {
        location.href = "/account/login";
    } else {
        setCookie('token', '', 0);
        location.href = "/account/login";
    }
})