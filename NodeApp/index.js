const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const data = []

app.use(bodyParser.urlencoded({extended:true}))

app.post("/product",(req, res)=> {
    const response = req.body.product;
    console.log(response)
    data.push(response)
    res.redirect('/')
})

app.get("/add-product", (req, res) => {
    res.send(
    `<form action="/product" method="POST">
        <label for="product">Product Name: </label>
        <input type="text" name="product">
        <input type="submit">
    </form>`)
})

app.get("/get-products", (req, res) => {
    res.send(JSON.stringify(data))
})

app.get("/", (req, res) => {
    if (data.length < 1)
        res.send("hello world")
    else{
        let html = "<ul>"

        for(const element of data)
            html += `<li>${element}</li>`

        html += "</ul>"

        res.send(html)
    }
})

app.listen(3000)