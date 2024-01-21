const express = require('express')
const router = express.Router();

const adminController = require("../controllers/admin")

router.get('/add-product', adminController.getAddProductPage)
router.get('/products', adminController.getAdminProductsPage)
router.post('/add-product', adminController.postProduct)
router.get('/edit-product/:productID', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)
router.post('/delete-prod', adminController.deleteProd)

module.exports = router
