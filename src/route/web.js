import express from 'express';
import indexController from '../controllers/indexController';
import memberController from '../controllers/memberController';
import parityController from '../controllers/parityController';
import loginController from '../controllers/loginController';
import middlewareController from '../controllers/middlewareController';
import adminController from '../controllers/adminController';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.redirect('/index');
    });

    // Index
    router.get('/index', indexController.getIndex);

    // Home
    router.get('/home/search', indexController.getHome);

    // Login
    router.get('/account/login', loginController.getPageLogin);
    router.post('/account/login', loginController.loginFunc);
    router.post('/account/otpsignup', loginController.sendOTP);
    router.post('/account/signup', loginController.register);

    // Member
    router.get('/member/index', middlewareController, memberController.getPageMember);
    router.get('/myTask/taskCenter', middlewareController, memberController.getmyTask);
    router.get('/redenvelope/manage', middlewareController, memberController.redenvelope);

    router.get('/promotion/index', middlewareController, memberController.promotion);
    router.get('/promotion/apply', middlewareController, memberController.promotionApply);
    router.get('/promotion/ApplyRecord', middlewareController, memberController.promotionApplyRecord);
    router.get('/promotion/bonusRecord', middlewareController, memberController.promotionBonusRecord);
    router.get('/promotion/promotion', middlewareController, memberController.promotionPromotion);
    router.get('/promotion/share', middlewareController, memberController.promotionShare);
    router.post('/promotion/apply', middlewareController, memberController.withdrawBonus);

    router.get('/member/MyWallet', middlewareController, memberController.myWallet);

    router.get('/member/myBank', middlewareController, memberController.myBank);
    router.post('/member/myBank', middlewareController, memberController.addBanking);

    router.get('/member/myaddress', middlewareController, memberController.myAddress);
    router.post('/member/myaddress', middlewareController, memberController.addAddress);

    router.get('/member/Security', middlewareController, memberController.security);

    router.get('/member/nikname', middlewareController, memberController.securityNikname);
    router.post('/member/nikname', middlewareController, memberController.editNikname);

    router.get('/member/ChangePassword', middlewareController, memberController.changePassword);
    router.post('/member/ChangePassword', middlewareController, memberController.editPassword);

    router.get('/member/ChangePaymentPassword', middlewareController, memberController.changePaymentPassword);
    router.post('/member/ChangePaymentPassword', middlewareController, memberController.editPaymentPassword);

    router.get('/financial/index', middlewareController, memberController.financial);
    router.post('/financial/index', middlewareController, memberController.renderFinancial);

    router.get('/about/index', middlewareController, memberController.about);
    router.get('/about/privacyPolicy', middlewareController, memberController.aboutPivacyPolicy);
    router.get('/about/rda', middlewareController, memberController.aboutRda);

    router.get('/about/appStatement', middlewareController, memberController.aboutAppStatement);
    router.get('/member/ContactUs', middlewareController, memberController.contactUs);

    router.get('/complaint/index', middlewareController, memberController.complaint);
    router.get('/complaint/help', middlewareController, memberController.complaintHelp);

    router.get('/trade/index', middlewareController, memberController.trade);

    router.get('/financial/recharge', middlewareController, memberController.recharge);
    router.get('/financial/rechargeRecord', middlewareController, memberController.rechargeRecord);

    router.get('/financial/withdraw', middlewareController, memberController.withdraw);
    router.post('/financial/withdraw', middlewareController, memberController.handlingwithdraw);
    router.get('/financial/withdrawRecord', middlewareController, memberController.withdrawRecord);

    router.get('/couleepay/:id_txn/desk', middlewareController, memberController.couleepay);
    router.get('/couleepay/:id_txn/receipt', middlewareController, memberController.receiptID);
    router.post('/couleepay/receipt', middlewareController, memberController.receipt);
    router.post('/couleepay/recharge', middlewareController, memberController.couleepayTXN);
    router.post('/couleepay/closeReceipt', middlewareController, memberController.closeReceipt);


    // Parity
    router.get('/parity/tran', middlewareController, parityController.getPageParity);
    router.post('/parity/orderWoipy', middlewareController, parityController.renderIndexOrder);

    router.get('/parity/paritycat', middlewareController, parityController.getParitycat);
    router.post('/parity/paritycat', middlewareController, parityController.renderParitycat);

    router.get('/parity/parityindex', middlewareController, parityController.getParityindex);
    router.post('/parity/tran', middlewareController, parityController.JoinParity);
    router.post('/parity/tran/reset', middlewareController, parityController.ParityReset);

    // redenvelope
    router.get('/redenvelope/detail', memberController.Pageredenvelope);
    router.post('/redenvelope/detail', memberController.methodRedenvelope);

    // Admin
    router.get('/manage/admin/index', adminController.middlewareAdminController, adminController.getPageMember1);
    router.post('/manage/admin/index', adminController.middlewareAdminController, adminController.createResult);


    router.get('/manage/admin/statistical', adminController.middlewareAdminController, adminController.Statistical);

    router.get('/manage/admin/recharge', adminController.middlewareAdminController, adminController.browseRecharge);
    router.post('/manage/admin/recharge', adminController.middlewareAdminController, adminController.methodRecharge);
    router.get('/manage/admin/rechargeRecord', adminController.middlewareAdminController, adminController.rechargeRecord);

    router.get('/manage/admin/withdraw', adminController.middlewareAdminController, adminController.withdraw);
    router.post('/manage/admin/withdraw', adminController.middlewareAdminController, adminController.methodWithdraw);
    router.get('/manage/admin/withdrawRecord', adminController.middlewareAdminController, adminController.withdrawRecord);

    router.get('/manage/admin/withdrawBonus', adminController.middlewareAdminController, adminController.withdrawBonus);
    router.post('/manage/admin/withdrawBonus', adminController.middlewareAdminController, adminController.methodBonus);
    router.get('/manage/admin/bonusRecord', adminController.middlewareAdminController, adminController.bonusRecord);

    router.get('/manage/admin/sendotp', adminController.middlewareAdminController, adminController.sendOtp);
    router.post('/manage/admin/sendotp', adminController.middlewareAdminController, adminController.methodSendOtp);

    router.get('/manage/admin/members', adminController.middlewareAdminController, adminController.listMembers);
    router.get('/manage/admin/profile/:phone', adminController.middlewareAdminController, adminController.profileMember);

    router.get('/manage/admin/createBonus', adminController.middlewareAdminController, adminController.createBonus);
    router.post('/manage/admin/createBonus', adminController.middlewareAdminController, adminController.methodCreateBonus);

    router.get('/manage/admin/settings', adminController.middlewareAdminController, adminController.settings);
    router.post('/manage/admin/settings', adminController.middlewareAdminController, adminController.methodSettings);
    router.post('/manage/admin/sale', adminController.middlewareAdminController, adminController.settingSale);
    router.post('/manage/admin/settings/bank', adminController.middlewareAdminController, adminController.methodSettingBank);

    // XML SITE MAP
    // router.get('/sitemap/blockddos', indexController.sitemap);

    return app.use('/', router);
}

export default initWebRoutes;