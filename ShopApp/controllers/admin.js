const { on } = require("nodemon");
const Product = require("../models/product");
const notFound = require("./notFound")

exports.getAddProductPage = (_, res, __) => {
  res.render("admin/edit-product", {title: "Add Product", path: "admin/edit-product", editing: false})
};

exports.postProduct = (req, res, __) => {
  const obj = req.body;
  const product = new Product(obj.product, obj.price, obj.image, obj.description);
  product.save()

  res.redirect('/')
};

exports.getAdminProductsPage = (_, res, __) => {
  Product.getAll((products) => {
    res.render("admin/products", {title: "Admin Products", prods: products, path: 'admin/products'})
  });
};

exports.getEditProduct = (req, res, __) => {
  const editMode = req.query.edit;
  const prodId = req.params.productID

  Product.getById(prodId, prod => {
  if (!editMode) {
    return res.redirect(303, "/")
  }

  res.render('admin/edit-product', { title: "Edit product", path: "admin/edit-product", editing: editMode, product: prod})
  }, _ => {
     notFound.getNotFoundPage(req, res, null)
  })
}

exports.postEditProduct = (req, res, __) => {
  const {
    product,
    price,
    image,
    description,
    productID
  } = req.body

  const updatedProduct = new Product(product, price, image, description, productID)
  updatedProduct.save()
  res.redirect(303, "/admin/products")
}

exports.deleteProd = (req, res, mid) => {
  const prodId = req.body.productID;
  
  Product.deleteProduct(prodId)
  
  res.redirect(303, "/admin/products")
}
