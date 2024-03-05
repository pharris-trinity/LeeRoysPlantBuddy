let products = [
  {id: 1, description: 'Cat Food', price: 5.99},
  {id: 2, description: 'Pet Stuff', price: 5.99},
  {id: 3, description: 'Dog Food', price: 5.99},
  {id: 4, description: 'Bird Food', price: 5.99},
  {id: 5, description: 'Lizard Food', price: 5.99},
]

let cart = [
  {id: 1, description: 'Cat Food', price: 5.99},
  {id: 2, description: 'Pet Stuff', price: 5.99},
  {id: 3, description: 'Dog Food', price: 5.99},
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
    getLogin: () => {
    return 'Hello, LeeRoy!';
    },
    addToCart: (product) => {
      cart.push(product);
      console.log(cart);
      return cart;
    },
    getCart: () => {
      return cart;
    },
    removeFromCart: (item) => {
      cart.splice(cart.indexOf(item), item);
      console.log(cart);
      return cart;
    },    
    subtotal: () => {

    },
    emptyCart: () => {
    cart = [];
    }
  };

class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(product) {
    this.items.push(product);
    cart+=product;
    // print(this.items);
  }	

  getCart() {
    return this.items;
  }
}

module.exports = {dataModel, Cart};
