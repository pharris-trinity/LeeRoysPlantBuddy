const {dataModel, Users} = require('../models/dataModel');

const users = new Users();
/* const users = []; */
// const {dataModel} = require('../models/dataModel');

// const cart = new Cart();

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
  getLogin: (req, res) => {
    const login = dataModel.getLogin();
    res.render('login', { login });
  },
  verifyUser: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(`username: ${username} password: ${password}`);
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
  getProduct: (req, res) => {
    const products = dataModel.getProducts();
  
    res.render('product', { products });
  },
  getProductAdmin: (req, res) => { 
    const products = dataModel.getProducts();

    res.render('product-admin', {products});
  },
  getLogin: (req, res) => {
  const login = dataModel.getLogin();
  res.render('login', { login });
  },
  addToCart: (req, res) => {
    const id = parseInt(req.body.id);
    const name = req.body.name;
    const price = parseFloat(req.body.price);
    
    const carts = dataModel.addToCart(id, name, price);
    // console.log(carts);
  },
  removeFromCart: (req, res) => {
    // const cart = dataModel.getCart();
    const product = req.body.id;
    console.log(product);
    const carts = dataModel.removeFromCart(product);
  },
  getCheckout: (req, res) => {
    const cart_object = dataModel.getCart();
    // console.log(cart);
    const cart = Object.values(cart_object);
    // cart_array.forEach((id, item) => {
    //   console.log(id);
    // })
    
    res.render('checkout', { cart });
  },
  addQuantity: (req, res) => {
    const product = req.body.id;
    // const product = parseInt(req.body.id);
    console.log(product);
    const carts = dataModel.addQuantity(product);
  },
  // emptyCart: (req, res) => {
  //   const cart = dataModel.getCart();
  //   cart.emptyCart();
  // },
  showToProducts: (req, res) => {
    const product_id = req.body.product_id;

    dataModel.showToProducts(product_id);
  },
  hideFromProducts: (req, res) => {
    const product_id = req.body.product_id;

    dataModel.hideFromProducts(product_id);
  },
  addToProducts: (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;

    // console.log(`${name} ${price} ${image}`);
    const products = dataModel.addToProducts(name, price, image);
    products.forEach(product => {
      console.log(product);
    })
  }
};

module.exports = mainController;
