const express = require('express')
const path = require('path')
const router = express.Router()

const routeDir = require('../helpers/path')

const adminData = require("./admin")

router.get('/', (req, res) => {
    res.sendFile(path.join(routeDir, 'views','shop.html'))
})

module.exports = router;