const {dataModel, Cart} = require('../models/dataModel');

const cart = new Cart();

const mainController = {
  getIndex: (req, res) => {
    const data = dataModel.getData();
    res.render('index', { data });
  },
  getHome: (req, res) => {
    res.render('home');
  },
  getCheckout: (req, res) => {
    const checkout = dataModel.getCheckout();
    res.render('checkout', { checkout });
  },
  getProduct: (req, res) => {
    const products = dataModel.getProducts();
  
    res.render('product', { products, cart });
  },
  addToCart: (req, res) => {
    const product = req.body.product;
    
    cart.addToCart(product);

    const products = dataModel.getCart();

    for(p in products) {
      console.log(products + " ");
    }
    
  }
};

module.exports = mainController;