const { error } = require("console");
const fs = require("fs")
const path = require("path");
const Cart = require("./cart");

const p = path.join(path.dirname(process.mainModule.filename), "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (!err){
      try {
        cb(JSON.parse(fileContent))
      } catch (err) {
        cb([])
      }
    } else {
      cb([])
    }
  })
}

module.exports = class Product {
  constructor(title, price, imageUrl, description, id = null) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.id = id;
  } 

  save() {
    getProductsFromFile(products => {
      
      if (this.id) {
        const index = products.findIndex(product => product.id == this.id) 
        products[index] = this
      }
      else {
        this.id = products.length;
        products.push(this);
      }
      
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  }

  static getAll(cb) {
   getProductsFromFile(cb) 
  }

  static getById(id, cb, err) {
    getProductsFromFile((prods) => {
      try{
        const prod = prods[id]
        if (prod == undefined) throw new error();
        cb(prod)
      } catch(error) {
        err()
      }
    })
  }

  static deleteProduct(id) {
    getProductsFromFile(prods => {
      const product = prods.find((prod) => prod.id == id)
      const updatedProds = prods.filter((prod) => prod.id != id)

      fs.writeFile(p, JSON.stringify(updatedProds), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price)
        }
      })
    })  
  }
}
