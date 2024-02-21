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
    console.log("triggered addToCart method");
    const product = req.body.product;
    console.log(product);
    // const cart = req.body.cart;
    // console.log(cart);
    
    cart.addToCart(product);

    const products = dataModel.getCart();

    console.log("These is in the cart, ", products);
  }
};

module.exports = mainController;