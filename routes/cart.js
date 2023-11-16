const cartController = require('../controller/cartController');
const router = require('express').Router();

// Thêm vé vào giỏ hàng
router.post('/', cartController.addTicketToCart);
// Xóa vé khỏi giỏ hàng

module.exports = router;
