const {dataModel} = require('../models/dataModel');
const userModel = require('../models/dataModel');
/* const users = []; */
// const {dataModel} = require('../models/dataModel');

// const cart = new Cart();

const mainController = {
  getIndex: (req, res) => {
    console.log("got home");
    const data = dataModel.getData();
    res.render('index', { data });
  },
  getHome: (req, res) => {
    console.log("got home");
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
    console.log("get login");
    const login = dataModel.getLogin();
    res.render('login', { login });
  },
  async verifyUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const data = dataModel.verifyUser(username, password);
    const user_id = data.id;
    const verified = data.verified;
    // console.log(user_id);
    // console.log(verified);
    
    if(user_id !== -1) {
      res.cookie('user_id', user_id, {
        maxAge: 900000, httpOnly: false, SameSite: 'None',
      })

      return res.status(200).json({ verified });
    }
    
    // res.json(verified, user_id);
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
      // console.log(user_id);
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
  const login = dataModel.getLogin();
  res.render('login', { login });
  },
  addToCart: (req, res) => {
    const product_id = parseInt(req.body.id);
    const name = req.body.name;
    const price = parseFloat(req.body.price);
    const cart_id = 1; // should always be the same as user_id as they have associated cart
    // console.log(product_id);

    userModel.addToCart(cart_id, product_id);
    
    const carts = dataModel.addToCart(product_id, name, price);
    // console.log(carts);
  },
  removeFromCart: (req, res) => {
    const item = req.body.item;
    cart.removeFromCart(item);
  },
  emptyCart: (req, res) => {
    cart.emptyCart();
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

    // console.log(`${name} ${price} ${image}`);
    const products = dataModel.addToProducts(name, price, image);
    products.forEach(product => {
      console.log(product);
    })
  }
};

module.exports = mainController;