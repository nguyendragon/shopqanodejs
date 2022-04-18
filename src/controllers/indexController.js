// trang chủ
const getIndex = (req, res) => {
    return res.render('index/index.ejs');
}

// trang home/search
const getHome = (req, res) => {
    return res.render('home/index.ejs');
}

module.exports = {
    getIndex,
    getHome,
}