let products = [
  {id: 1, description: 'Cat Food', price: 5.99, image: 'images/cat-food.jpg'},
  {id: 2, description: 'Pet Stuff', price: 5.99},
  {id: 3, description: 'Dog Food', price: 5.99},
  {id: 4, description: 'Bird Food', price: 5.99},
  {id: 5, description: 'Lizard Food', price: 5.99},
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
    // print(this.items);
  }	

  getCart() {
    return this.items;
  }
}

module.exports = {dataModel, Cart};
