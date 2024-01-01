const express = require('express')
const path = require('path')
const router = express.Router();

const routeDir = require('../helpers/path')

const products = []

router.get('/add-product', (req, res) => {
  res.render("add-product", {title: "Add Product", path: "admin/add-product"})
})

router.post('/add-product', (req, res) => {
    products.push({title: req.body.product})
    res.redirect('/')
})

exports.routes = router
exports.products = products
