const express = require('express')
const path = require('path')
const router = express.Router()

const routeDir = require('../helpers/path')

const adminData = require("./admin")

router.get('/', (req, res) => {
    // res.sendFile(path.join(routeDir, 'views','shop.html'))
    const products = adminData.products;
    res.render('shop', {products, title: "Shop", path: "/", hasProds: products.length > 0, activeShop:true, shopCss:true})
})

module.exports = router;
