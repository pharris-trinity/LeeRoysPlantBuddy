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
    const user_id = req.cookies.user_id;
    const cart = await userModel.getCart(user_id);

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
      const actions = await userModel.getAdminActions();
      const user_id = req.cookies.user_id;
      console.log(user_id);
      res.render('product-admin', {products, actions});
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  },
  getLogin: (req, res) => {
  // const login = dataModel.getLogin();
  res.render('login');
  },
  async addToCart (req, res) {
    const product_id = parseInt(req.body.id);
    const name = req.body.name;
    const price = parseFloat(req.body.price);
    const cart_id = req.cookies.user_id; // should always be the same as user_id as they have associated cart
    // console.log(product_id);

    userModel.addToCart(cart_id, product_id);
    
    // const carts = dataModel.addToCart(product_id, name, price);
    // console.log(carts);
  },
  async removeFromCart(req, res) {
    try {
      const product = req.body.id;
      const user = req.cookies.user_id;
      const cart = await userModel.removeFromCart(user, product);
      } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ error: 'Internal Server Error'});

    }
  },
  async addQuantity(req, res) {
    try {
      const product = req.body.id;
      const user = req.cookies.user_id;
      const cart = await userModel.addQuantity(user, product);
      // res.render('checkout', { cart, user });
      } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  },
  async emptyCart(req, res) {
    try {
      const id = req.cookies.user_id;
      const newcart = await userModel.emptyCart(id);
      // console.log(newcart);
      const cart = [];
      // res.render('checkout', { cart, id });
    } catch (error) {
      console.error('Error checking out:', error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  },
  showToProducts: (req, res) => {
    const product_id = req.body.product_id;
    const user_id = req.cookies.user_id;
    userModel.showProduct(user_id, product_id);
    // dataModel.showToProducts(product_id);
  },
  hideFromProducts: (req, res) => {
    const product_id = req.body.product_id;
    const user_id = req.cookies.user_id;
    userModel.hideProduct(user_id, product_id);
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