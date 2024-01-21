const express = require('express')
const router = express.Router()
const shopController = require("../controllers/shop")

router.get('/', shopController.getIndex)
router.get('/products', shopController.getProducts)
router.get('/products/:prodId', shopController.getDetails)
router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart)
router.get('/checkout', shopController.getCheckOut)
router.get('/orders', shopController.getOrders)
router.post('/cart-delete-item', shopController.postCartDeleteProduct)

module.exports = router;
