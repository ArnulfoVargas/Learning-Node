const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const notFoundModel = require("./controllers/notFound")

const app = express()

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended:false}))
app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use(notFoundModel.getNotFoundPage)

app.listen(3000)
