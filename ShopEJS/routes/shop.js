const express = require('express')
const path = require('path')
const router = express.Router()

const routeDir = require('../helpers/path')

const adminData = require("./admin")

router.get('/', (req, res) => {
  const products = adminData.products; 
  res.render("shop", {title: "shop", prods: products, path: '/'})
})

module.exports = router;
