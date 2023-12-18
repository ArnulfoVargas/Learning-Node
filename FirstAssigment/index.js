const express = require('express')

const app = express()



app.use('/users', (req, res, next) => {
    console.log("Second UWU")
    res.send("<h1>Hello user</h1>")
})

app.use('/', (req, res, next) => {
    console.log("First UWU")
    res.send("<h1>Hello everinyan</h1>")
})
app.listen(3000)