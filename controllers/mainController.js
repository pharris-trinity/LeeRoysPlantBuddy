const dataModel = require('../models/dataModel');

const mainController = {
  getIndex: (req, res) => {
    const data = dataModel.getData();
    res.render('index', { data });
  },
  getProduct: (req, res) => {
    const products = dataModel.getProducts();
    res.render('product', { products });
  },
  getHome: (req, res) => {
    res.render('home');
  },
  getCheckout: (req, res) => {
    const checkout = dataModel.getCheckout();
    res.render('checkout', { checkout });
  },
  getLogin: (req, res) => {
    const login = dataModel.getLogin();
    res.render('login', { login });
  }
};

module.exports = mainController;
