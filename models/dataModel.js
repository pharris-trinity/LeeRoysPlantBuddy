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

// Function to verify a user before loggin them in, checks if a user/password combination exists in the database for logging in
async function verifyUser(username, password) {
  const client = await pool.connect();
  try {
      const query = {
        text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
        values: [username, password],
      }
      const result = await client.query(query);
      var acctype = 'failed';
      var id = -1;
      if (result.rows.length == 1){
        acctype = result.rows[0].account_type;
        id = result.rows[0].user_id;
      }
      return {acctype, id};
  } finally {
    client.release();
  }
}

async function addUser(username, password) {
  const client = await pool.connect();
  try {
      const query = {
        text: "INSERT INTO users (username, password, account_type) VALUES ($1, $2, $3)",
        values: [username, password, 'registered'],
      };

      const result = await client.query(query);
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
async function addToCart(cart_id, product_id, product_name, product_price) {
  const client = await pool.connect();
  try {
    const query = {
      text: "SELECT * FROM cartitems WHERE cart_id = $1 AND product_id = $2",
      values: [cart_id, product_id],
    };

    const in_cart_result = await pool.query(query);

    if(in_cart_result.rowCount == 0) {
      const query = {
        text: "INSERT INTO cartitems (cart_id, product_id, product_name, product_price, quantity) VALUES ($1, $2, $3, $4, $5)",
        values: [cart_id, product_id, product_name, product_price, 1],
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
    const query = {
      text: 'SELECT * FROM cartitems WHERE cart_id = $1 ORDER BY product_id',
      values: [id],
    };
    const result = await client.query(query);
    // const rows = result.rows;
    // var product_list = [];
    // rows.forEach(row => {
    //   product_list.push(row.product_id);
    // })
    
    // const product_query = {
    //   text: "SELECT * FROM products WHERE product_id = ANY($1::integer[])",
    //   values: [product_list]
    // }

    // const products = await client.query(product_query);
    // // console.log(products.rows);
    
    return result.rows;
  } finally {
    client.release();
  }
}

async function emptyCart(cart_id) {
	const client = await pool.connect();
	try {
    const query = {
      text: "DELETE FROM cartitems WHERE cart_id = $1",
      values: [cart_id],
    };
		const result = await client.query(query);
		return result.rowCount;
	} catch {
    console.log("Error clearing the cart");
  } finally {
		client.release();
  }
}

async function removeFromCart(cart_id, product_id) {
	const client = await pool.connect();
	try {
    const query = {
      text: "SELECT * FROM cartitems WHERE cart_id = $1 AND product_id = $2",
      values: [cart_id, product_id],
    };
    const result = await pool.query(query);
    const value = result.rows[0].quantity;
    if(value > 1) {
      const query = {
        text: "UPDATE cartitems SET quantity = quantity - 1 WHERE cart_id = $1 AND product_id = $2",
        values: [cart_id, product_id],
      };
      const result = await client.query(query);
      return result.rows;
    } else {
      const query = {
        text: "DELETE FROM cartitems WHERE cart_id = $1 AND product_id = $2",
        values: [cart_id, product_id],
      };
      const result = await client.query(query);
      return result.rows;
      }
	} finally {
		client.release();
	}
}

async function addQuantity(cart_id, product_id) { 
	const client = await pool.connect();
	try {
    const query = {
      text: "UPDATE cartitems SET quantity = quantity + 1 WHERE cart_id = $1 AND product_id = $2 ORDER BY product_id",
      values:[cart_id, product_id],
    };
    const result = await client.query(query);
	} finally {
		client.release();
	}
}
async function emptyCart(id) {
	const client = await pool.connect();
	try {
    const query = {
      text: "DELETE FROM cartitems WHERE cart_id = $1",
      values: [id],
    };
		const result = await client.query(query);
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


// Old in memory model, deprecated and scheduled for removal in a minor version change
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
  };
module.exports = 
{ dataModel, 
  getUsers, 
  getProducts, 
  showProduct, 
  hideProduct, 
  addToCart, 
  getCart, 
  addToProducts, 
  getAdminActions, 
  emptyCart,
  verifyUser,
  addUser,
  removeFromCart,
  addQuantity,
};