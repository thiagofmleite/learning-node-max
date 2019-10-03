const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      hasProducts: products.length > 0
    })
  })
}

exports.getAddProdct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    product: new Product(),
    editing: false
  })
}

exports.getEditProdct = (req, res, next) => {
  const editMode = req.query.edit
  const prodId = req.params.productId
  if (!editMode) {
    return res.redirect('/')
  }
  Product.findById(prodId, product => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product
    })
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  const product = new Product(null, title, imageUrl, description, price)
  product.save()
  res.redirect('/admin/products')
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedDescription = req.body.description
  const updatedImageUrl = req.body.imageUrl
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  )
  updatedProduct.save()
  res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}
