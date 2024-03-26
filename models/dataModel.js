let users = [
  {userid: 0, username: 'pharris', password: 'password', account_type: 'registered'},
  {userid: 1, username: 'chouston', password: "drowssap", account_type: 'admin'},
];

let products = [
  {id: 0, description: 'Cat Food', price: 5.99, image: 'images/cat-food.bmp', display: true},
  {id: 1, description: 'Dog Food', price: 5.99, image: 'images/dog-food.bmp', display: true},
  {id: 2, description: 'Bird Food', price: 5.99, image: 'images/bird-food.bmp', display: false},
  {id: 3, description: 'Lizard Food', price: 5.99, image: 'images/lizard-food.bmp', display: true},
]

let cart = [
  {quantity: 1, id: 1, description: 'Cat Food', price: 5.99},
  {quantity: 1, id: 2, description: 'Pet Stuff', price: 5.99},
  {quantity: 2, id: 3, description: 'Dog Food', price: 5.99},
]

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
    getLogin: () => {
      return 'Hello, LeeRoy!';
    },
    addUser: (username, password) => {
      var lastUser = users[users.length - 1];
      var newid = lastUser.userid + 1;
      console.log(newid);
      var newUser = {userid: newid, username: username, password: password, account_type: 'registered'};
      console.log(newUser);
      console.log(users.length);
      users.push(newUser);
      console.log(users.length);
      console.log(users[users.length - 1]);
      
      return newUser;
    },
    verifyUser: (username, password) => {
      var verified = 'failed';
      users.forEach(user => {
        if(username==user.username&&password==user.password) {
          if(user.account_type=='admin') {
            verified = 'admin';
          } else if(user.account_type=='registered') {
            verified = 'registered';
          } else {
            user.account_type = 'registered';
            verified = 'registered';
          }
        }
      })

      return verified;
    },
    addToCart: (id, description, price) => {
      // console.log(product);
      if(!(id in cart)) {
        cart[id] = {id, description, price, quantity: 1};
      } else {
        cart[id].quantity+=1;
      }
      console.log(cart);
      return cart;
    },
    getCart: () => {
      return cart;
    },
    addQuantity: (id, description, price) => {
      cart.splice(cart.indexOf(id), 1, cart[id]);
      console.log(cart);
      return cart;
    
    },
    removeFromCart: (id) => {
      // if(cart[id-1].quantity > 1) {
      //     cart[id-1].quantity-=1;
      // } else {
      //     cart.splice(cart.indexOf(id-1), 1);
      // }
      // console.log(cart);
      cart.splice(cart.indexOf(id-1), 1);
      return cart;

    },    
    // emptyCart: () => {
    // cart = [];
    // return cart;
    // },
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

  class Users {
    constructor() {
      this.names = [];
    }
  
    getUsers() {
      return users;
    }
  }
  
module.exports = {dataModel, Users};
