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
  getLogin: (req, res) => {
  const login = dataModel.getLogin();
  res.render('login', { login });
  },

  addToCart: (req, res) => {
    // console.log("triggered addToCart method");
    const product = req.body.product;
    cart.addToCart(product);
    // console.log(products);
    // const products = dataModel.getCart();
  },
  removeFromCart: (req, res) => {
    const item = req.body.item;
    cart.removeFromCart(item);
  },
  getCheckout: (req, res) => {
    const cart = dataModel.getCart();
    
    res.render('checkout', { cart });
  },
  emptyCart: (req, res) => {
    cart.emptyCart();
  }
};

module.exports = mainController;
