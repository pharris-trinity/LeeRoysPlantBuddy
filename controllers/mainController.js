const {dataModel} = require('../models/dataModel');
const userModel = require('../models/dataModel');

const mainController = {
  // Function to render the landing page
  getIndex: (req, res) => {
    const data = dataModel.getData();
    res.render('index', { data });
  },
  // Function to render the home page
  getHome: (req, res) => {
    res.render('home');
  },
  // Function to get items in a users cart and then display them at the checkout page
  async getCheckout(req, res) {
    const user_id = req.cookies.user_id;
    const cart = await userModel.getCart(user_id);

    res.render('checkout', { cart, user_id });
  },
  // Function that verifies that a user is in the db and if so issues a cookie and logs them in, otherwise returns an unauthorized error
  async verifyUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const result = await userModel.verifyUser(username, password);
    const verified = result.acctype;
    const id = result.id;
    if(id !== -1) {
      res.cookie('user_id', id, {
        maxAge: 900000, httpOnly: false, SameSite: 'None',
      })

      return res.status(200).json({ verified });
    }
    
    return res.status(401).json({error: 'Unauthorized'});
  },
  // Function that adds a user into the database
  async addUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const result = await userModel.addUser(username, password);
    return res.status(200);
  },
  // Function that fetches all products from the product database to display to a user
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
  // Function that lists all the admin products and logging trail for admin usage
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
  // Function that gets the login page
  getLogin: (req, res) => {
    res.render('login');
  },
  // Function to add an item to a cart if the add to cart button is clicked on the user product page
  async addToCart (req, res) {
    const product_id = parseInt(req.body.product_id);
    const cart_id = req.cookies.user_id; // should always be the same as user_id as they have associated cart

    userModel.addToCart(cart_id, product_id);
  },
  // Function to decrement the number of items in a cart at the checkout page
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
  // Function to increment the amount of a certain item at the checkout page
  async addQuantity(req, res) {
    try {
      const product = req.body.id;
      const user = req.cookies.user_id;
      const cart = await userModel.addQuantity(user, product);
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  },
  // Function to remove all items from a users cart when click buy now at the checkout page
  async emptyCart(req, res) {
    try {
      const id = req.cookies.user_id;
      const newcart = await userModel.emptyCart(id);
    } catch (error) {
      console.error('Error checking out:', error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  },
  // Function to show a product to users from the admin console
  showToProducts: (req, res) => {
    const product_id = req.body.product_id;
    const user_id = req.cookies.user_id;
    userModel.showProduct(user_id, product_id);
  },
  // Function to hide a product from users from the admin console
  hideFromProducts: (req, res) => {
    const product_id = req.body.product_id;
    const user_id = req.cookies.user_id;
    userModel.hideProduct(user_id, product_id);
  },
  // Function to add a new product to the database from the admin console
  addToProducts: (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;

    const products = userModel.addToProducts(name, price, image);
  }
};

module.exports = mainController;