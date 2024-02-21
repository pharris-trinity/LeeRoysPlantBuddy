let products = [
  {id: 1, description: 'Cat Food', price: 5.99, image: 'images/cat-food.bmp'},
  {id: 2, description: 'Dog Food', price: 5.99, image: 'images/dog-food.bmp'},
  {id: 3, description: 'Bird Food', price: 5.99, image: 'images/bird-food.bmp'},
  {id: 4, description: 'Lizard Food', price: 5.99, image: 'images/lizard-food.bmp'},
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
    this.items.push(product);
    cart+=product;
  }	

  getCart() {
    return cart;
  }
}

module.exports = {dataModel, Cart};
