const {dataModel} = require('../models/dataModel');

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
  getProduct: (req, res) => {
    const products = dataModel.getProducts();
  
    res.render('product', { products });
  },
  getProductAdmin: (req, res) => { 
    const products = dataModel.getProducts();

    res.render('product-admin', {products});
  }
  ,
  addToCart: (req, res) => {
    const product = req.body.product;
    // console.log(product);
    
    const carts = dataModel.addToCart(product);
    // console.log(carts);
  },
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