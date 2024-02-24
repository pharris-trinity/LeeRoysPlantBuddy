let products = [
  {id: 1, description: 'Cat Food', price: 5.99, image: 'images/cat-food.bmp', display: true},
  {id: 2, description: 'Dog Food', price: 5.99, image: 'images/dog-food.bmp', display: true},
  {id: 3, description: 'Bird Food', price: 5.99, image: 'images/bird-food.bmp', display: true},
  {id: 4, description: 'Lizard Food', price: 5.99, image: 'images/lizard-food.bmp', display: true},
]

let cart = [

]

const dataModel = {
    getData: () => {
      // Logic to fetch data from a source
      return 'Hello, LeeRoy!';
    },
    getProducts: () => {
      console.log(products);
      return products;
    },
    getCheckout: () => {
      let cartProducts = dataModel.getProducts();
	    return cartProducts;
    },
    addToCart: (product) => {
      cart+=(product);
      console.log(cart);
    },
    getCart: () => {
      return cart;
    }
  };

class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(product) {
    // unclear what i want to do at this point
    this.items.push(product);
    cart+=product;
  }	

  getCart() {
    return cart;
  }
}

module.exports = {dataModel, Cart};
