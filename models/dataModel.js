const pool = require('../db');

async function getUsers() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users');
    console.log(`Here are the users: ${result}`);
    return result.rows;
  } finally {
    client.release();
  }
}

async function getProducts() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM products');
    return result.rows;
  } finally {
    client.release();
  }
}

async function showProduct(id) {
  const client = await pool.connect();
  try {
    const query = {
      text: 'UPDATE products SET display = $1 WHERE product_id = $2',
      values: [true, id],
    };

    const result = await client.query(query);
    return result;
  } finally {
    client.release();
  }
}

async function hideProduct(id) {
  const client = await pool.connect();
  try {
    const query = {
      text: 'UPDATE products SET display = $1 WHERE product_id = $2',
      values: [false, id],
    };

    const result = await client.query(query);
    return result;
  } finally {
    client.release();
  }
}

// async function getProducts() {
//   const client = await client.query('')
// }

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
  // {id: 1, description: 'Cat Food', price: 5.99},
  // {id: 2, description: 'Pet Stuff', price: 5.99},
  // {id: 3, description: 'Dog Food', price: 5.99},
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
    removeFromCart: (item) => {
      cart.splice(cart.indexOf(item), item);
      console.log(cart);
      return cart;
    },    
    subtotal: () => {

    },
    emptyCart: () => {
    cart = [];
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
  
module.exports = {dataModel, getUsers, getProducts, showProduct, hideProduct};