const {dataModel} = require('../models/dataModel');
const userModel = require('../models/dataModel');
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
  async verifyUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log("username: ", username, "password: ", password);
    const result = await userModel.verifyUser(username, password);
    console.log(result);
    const verified = result.acctype;
    const id = result.id;
    console.log("this is verified stuff", verified);
    console.log("this should be id", id);
    // res.cookie('userId', userId, {

    // })
    res.json(verified);
  },
  async addUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const result = await userModel.addUser(username, password);
    return res.status(200);
    //const newSignUp = userModel.addUser(username, password);
    // if (result.account_type === 'admin') {
    //   res.render('products-admin');
    // } else if (result.account_type === 'registered') {
    //   res.render('index');
    // } else {
    //   console.log('Error: Invalid sign up!');
    // }

  },
  async getProduct(req, res) {
    try {
      const products = await userModel.getProducts();
      res.render('product', { products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async getProductAdmin(req, res) { 
    try {
      const products = await userModel.getProducts();
      res.render('product-admin', {products});
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
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
  getLogin: (req, res) => {
    const login = dataModel.getLogin();
    res.render('login', { login });
    },
  removeFromCart: (req, res) => {
    const item = req.body.item;
    cart.removeFromCart(item);
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