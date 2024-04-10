const pool = require('../db');

// Login Page Functions

// Function to get all users in the database
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


// Product Page Functions

// Function to display the list of available products to users
async function getProducts() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM products ORDER BY product_id DESC');
    return result.rows;
  } finally {
    client.release();
  }
}

// Function for users to add products on the product page to their cart
async function addToCart(cart_id, product_id) {
  const client = await pool.connect();
  try {
    const query = {
      text: `
        SELECT ci.cart_id
        FROM carts c
        JOIN cartitems ci ON c.cart_id = ci.cart_id
        WHERE c.cart_id = $1 AND ci.product_id = $2
      `,
      values: [cart_id, product_id],
    };

    const result = await pool.query(query);

    if(result.rowCount == 0) {
      const query = {
        text: "INSERT INTO cartitems (cart_id, product_id, quantity) VALUES ($1, $2, $3)",
        values: [cart_id, product_id, 1],
      }

      const result = await pool.query(query);
    } else {
      const query = {
        text: "UPDATE cartitems SET quantity = quantity + 1 WHERE cart_id = $1 AND product_id = $2",
        values: [cart_id, product_id],
      }

      const result = await pool.query(query);
    }
    
  } finally {
    client.release();
  }
}


// Checkout Page Functions

// Function for users that fetches the items in the users cart
async function getCart(id) {
  const client = await pool.connect();
  try {
    const result = client.query('SELECT * FROM cartitems WHERE cart_id = id');
    return result.rows;
  } finally {
    client.release();
  }
}


// Admin Page Functions

// Function for admins to show a product that is currently not listed
async function showProduct(user_id, product_id) {
  const client = await pool.connect();
  try {
    const query = {
      text: 'UPDATE products SET display = $1 WHERE product_id = $2',
      values: [true, product_id],
    };

    const result = await client.query(query);
    logAction(user_id, product_id, `showProduct`);
    return result;
  } finally {
    client.release();
  }
}

// Function for admins to hide a product that is currently listed
async function hideProduct(user_id, product_id) {
  console.log("hide product triggered", product_id, user_id);
  const client = await pool.connect();
  try {
    const query = {
      text: 'UPDATE products SET display = $1 WHERE product_id = $2',
      values: [false, product_id],
    };

    const result = await client.query(query);
    logAction(user_id, product_id, `hideProduct`);
    return result;
  } finally {
    client.release();
  }
}

// Function to allow admins to add products to the product database
async function addToProducts(name, price, image) {
  const client = await pool.connect();
  try {
    const query = {
      text: 'INSERT INTO products (product_name, product_price, product_image, display) VALUES ($1, $2, $3, TRUE)',
      values: [name, price, image],
    };

    const result = await client.query(query);
    // console.log(result);
    // logAction('addProduct');
    return result;
  } finally {
    client.release();
  }
}

async function logAction(executor, receiver, action) {
  const client = await pool.connect();
  const date = Date();
  console.log(executor, receiver, action, date);
  
  try {
    const query = {
      text: 'INSERT INTO adminactions (action_executor, action_receiver, action_type, action_time) VALUES ($1, $2, $3, $4)',
      values: [executor, receiver, action, date],
    }

    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
}

async function getAdminActions() {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM adminactions ORDER BY action_id DESC';
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
}

// Old in memory code that is being deprecated

let users = [
  {userid: 1, username: 'pharris', password: 'password', account_type: 'registered'},
  {userid: 2, username: 'chouston', password: "drowssap", account_type: 'admin'},
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
    getCheckout: () => {
      let cartProducts = dataModel.getProducts();
	    return cartProducts;
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
      var id = -1;
      users.forEach(user => {
        if(username==user.username&&password==user.password) {
          if(user.account_type=='admin') {
            verified = 'admin';
            id = user.userid;
          } else if(user.account_type=='registered') {
            verified = 'registered';
            id = user.userid;
          } else {
            user.account_type = 'registered';
            verified = 'registered';
          }
        }
      })

      // console.log(verified)
      // console.log(verified);
      // console.log(id);
      return {verified: verified, id: id};
    },
    getCart: () => {
      return cart;
    },
    removeFromCart: (productindex) => {
      if(cart[productindex].quantity > 1) {
          cart[productindex].quantity--;
      } else {
          cart.splice(productindex, 1);
      }
      return cart;    },
    addQuantity: (productindex) => {
      cart[productindex].quantity++;
      return cart;
    },    
    emptyCart: (cart) => {
      cart.splice(0, cart.length);
      return cart;
    },
  };
  
module.exports = {dataModel, getUsers, getProducts, showProduct, hideProduct, addToCart, getCart, addToProducts, getAdminActions};