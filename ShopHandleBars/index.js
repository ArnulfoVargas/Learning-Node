const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const adminData = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const expressHbs = require("express-handlebars")

const app = express()

app.engine('handlebars', expressHbs({layoutsDir: "views/layouts/", defaultLayout:"main-layout"}))
app.set('view engine', 'handlebars')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended:false}))
app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use((_, res, __)=>{
    // res.status(404).sendFile(path.join(__dirname, "views", "page-not-found.html"))
    res.status(404).render('page-not-found', {title: "Error", notFoundCSS:true})
})

app.listen(3000)
