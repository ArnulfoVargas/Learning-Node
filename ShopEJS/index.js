const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const adminData = require("./routes/admin")
const shopRoutes = require("./routes/shop")

const app = express()

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended:false}))
app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use((req, res, next)=>{
  res.status(404).render("page-not-found",{title: "Error", path: ''})
})

app.listen(3000)
