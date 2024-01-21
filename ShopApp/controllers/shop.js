const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getProducts = (_, res, __) => {
  Product.getAll((products) => {
    res.render("shop/product-list", {title: "Products", prods: products, path: 'products'})
  });
};

exports.getIndex = (_, res, __) => {
  Product.getAll((products) => {
    res.render("shop/index", {title: "Shop", prods: products, path: '/'})
  });
};

exports.getCheckOut = (_, res, __) => {
  res.render("shop/checkout", {path: "checkout", title: "Checkout"}) 
};

exports.getCart = (_, res, __) => {
  Cart.getCart(cart => {
    Product.getAll(products => {
      const cartProds = []
      for (p of products) {
        const cartProductData = cart.products.find( prod => +prod.id === +p.id )
        if (cartProductData) {
          cartProds.push({productData: p, quantity: cartProductData.quantity})
        }
      }

      res.render("shop/cart", {path: "cart", title: "Cart", products: cartProds})
    })
  })
};

exports.getOrders = (_, res, __) => {
  res.render("shop/orders", {path: "orders", title: "Orders"})
}

exports.getDetails = (req, res, __) => {
  const prodId = req.params.prodId;   
  Product.getById(prodId, (prod) => {
    // Success
    res.render("shop/product-detail", {title: `${prod.title}'s detail`, path: "products", prod: prod})
  }, ()=> {
    // Not found
    res.render("page-not-found", {title:"Product not found", path:""})
  })
}

exports.postCart = (req, res, __) => {
  const prodId = req.body.productId;
  const details = req.body.details;
  Product.getById(prodId, (prod) => {
    // Success
    Cart.addProduct(prodId, prod.price);
    
    if (details){
      res.redirect(301, `/products/${prodId}`)
    } else {
      res.redirect(301, "/products")
    }
  }, () => {
    // Error
    res.redirect(301, `/products`)
    alert("Something wrong has occured")
  })
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.getById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect("/cart")
  })
}
