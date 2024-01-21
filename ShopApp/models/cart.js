const path = require("path")
const fs = require("fs");
const Product = require("./product");

const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
   fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], total: 0};

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProduct = cart.products.find(e => e.id === id)

      if (existingProduct){
        existingProduct.quantity = +existingProduct.quantity + 1;
      } else {
        let updatedProduct = { id: id, quantity: 1};
        cart.products = [...cart.products, updatedProduct];
      }

      cart.total = cart.total + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      })
    }) 
  }
  
  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      
      const updatedCart = {...JSON.parse(fileContent)}
      const product = updatedCart.products.find(prod => prod.id == id)
      if (!product) {
        return;
      }
      const productQuantity = product.quantity;
      updatedCart.products = updatedCart.products.filter(prod => prod.id != id)
      updatedCart.total= updatedCart.total- (+price * productQuantity)

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err)
      })
    })
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent)
      if (err) {
        cb(null)
        return
      }
      cb(cart)
    })
  }
}
