const {dataModel} = require('../models/dataModel');
const userModel = require('../models/dataModel');

const mainController = {
  getIndex: (req, res) => {
    const data = dataModel.getData();
    res.render('index', { data });
  },
  getHome: (req, res) => {
    res.render('home');
  },
  async getCheckout(req, res) {
    // try {
    //   console.log("checkout");
    //   const cart = dataModel.getCheckout();
    //   const user_id = req.cookies.user_id;
    //   // res.redirect(200, '/checkout');
    //   return res.status(200);
    // } catch {
    //   return res.status(500).json({ error: 'Internal Server Error' });
    // }
    const cart = dataModel.getCheckout();
    const user_id = req.cookies.user_id;
    res.render('checkout', { cart, user_id });
  },
  getLogin: (req, res) => {
    // const login = dataModel.getLogin();
    res.render('login');
  },
  async verifyUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const data = dataModel.verifyUser(username, password);
    const user_id = data.id;
    const verified = data.verified;
    
    if(user_id !== -1) {
      res.cookie('user_id', user_id, {
        maxAge: 900000, httpOnly: false, SameSite: 'None',
      })

      return res.status(200).json({ verified });
    }
    
    return res.status(401).json({error: 'Unauthorized'});
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
  async getProduct(req, res) {
    try {
      const products = await userModel.getProducts();
      const user_id = req.cookies.user_id;
      res.render('product', { products, user_id });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async getProductAdmin(req, res) { 
    try {
      const products = await userModel.getProducts();
      const user_id = req.cookies.user_id;
      console.log(user_id);
      res.render('product-admin', {products});
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  },
  getLogin: (req, res) => {
  // const login = dataModel.getLogin();
  res.render('login');
  },
  addToCart: (req, res) => {
    const product_id = parseInt(req.body.id);
    const name = req.body.name;
    const price = parseFloat(req.body.price);
    const cart_id = req.cookies.user_id; // should always be the same as user_id as they have associated cart

    userModel.addToCart(cart_id, product_id);
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
  emptyCart: (req, res) => {
    const cart = dataModel.getCart();
    dataModel.emptyCart(cart);
  },
  showToProducts: (req, res) => {
    const product_id = req.body.product_id;
    userModel.showProduct(product_id);
    // dataModel.showToProducts(product_id);
  },
  hideFromProducts: (req, res) => {
    const product_id = req.body.product_id;
    userModel.hideProduct(product_id);
    // dataModel.hideFromProducts(product_id);
  },
  addToProducts: (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;

    const products = userModel.addToProducts(name, price, image);
  }
};

module.exports = mainController;