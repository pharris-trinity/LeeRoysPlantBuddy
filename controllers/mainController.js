const {dataModel, Users} = require('../models/dataModel');

const users = new Users();
/* const users = []; */

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
  },
  verifyUser: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // console.log(`username: ${username} password: ${password}`);
    const loggedIn = dataModel.verifyUser(username, password);
    // console.log(loggedIn);
    if(loggedIn==='admin') {
      res.render('home-admin');
    } else if(loggedIn==='registered') {
      // console.log('go to registered home');
      // figure out how to load a page from the controller, maybe response based?
      res.render('index');
    } else {
      console.log('You trying to break in???');
    }
  },
  addUser: (req, res) => {
    console.log('addUser in mainController triggered')
    const username = req.body.username;
    const password = req.body.password;
    const newSignUp = dataModel.addUser(username, password);
    if (newSignUp.account_type === 'admin') {
      res.render('products-admin');
    } else if (newSignUp.account_type === 'registered') {
      res.render('index');
    } else {
      console.log('Error: Invalid sign up!');
    }
  },
};



module.exports = mainController;
