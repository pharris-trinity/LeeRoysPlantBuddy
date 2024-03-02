let products = [
  {id: 0, description: 'Cat Food', price: 5.99, image: 'images/cat-food.bmp', display: true},
  {id: 1, description: 'Dog Food', price: 5.99, image: 'images/dog-food.bmp', display: true},
  {id: 2, description: 'Bird Food', price: 5.99, image: 'images/bird-food.bmp', display: false},
  {id: 3, description: 'Lizard Food', price: 5.99, image: 'images/lizard-food.bmp', display: true},
]

let cart = []

const dataModel = {
    getData: () => {
      // Logic to fetch data from a source
      return 'Hello, LeeRoy!';
    },
    getProducts: () => {
      // console.log(products);
      return products;
    },
    getCheckout: () => {
      let cartProducts = dataModel.getProducts();
	    return cartProducts;
    },
    addToCart: (product) => {
      // console.log(product);
      cart.push(product);
      console.log(cart);
      return cart;
    },
    getCart: () => {
      return cart;
    },
    showToProducts: (product_id) => {
      products.forEach(product => {
        if(product.id == product_id) {
          product.display = true;
        }
      })
    },
    hideFromProducts: (product_id) => {
      products.forEach(product => {
        if(product.id == product_id) {
          product.display = false;
        }
      })
    },
    addToProducts: (name, price, image) => {
      products.push({id: products.length, description: name, price: price, image: image, display: true});
      
      return products;
    }
  };

// class Cart {
//   constructor() {
//     this.items = [];
//   }

//   addToCart(product) {
//     // unclear what i want to do at this point
//     this.items.push(product);
//     cart+=product;
//   }	

//   getCart() {
//     return cart;
//   }
// }

module.exports = {dataModel};
