const express = require('express')
const path = require('path')
const router = express.Router();

const routeDir = require('../helpers/path')

const products = []

router.get('/add-product', (req, res) => {
    res.sendFile(path.join(routeDir, "views", "add-product.html"))
})

router.post('/add-product', (req, res) => {
    products.push({title: req.body.product})
    res.redirect('/')
})

exports.routes = router
exports.products = products