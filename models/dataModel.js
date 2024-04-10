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

async function getCart(id) {
  const client = await pool.connect();
  try {
    const result = client.query('SELECT * FROM cartitems WHERE cart_id = id');
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
async function removeFromCart(cart_id, cartitem_id) {
	const client = await pool.connect();
	try {
	// 	if ( quantity > 1) {
	// 		quantity + 1
		// } else {
	// 		remove from cart
	// 	}
	} finally {
		client.release();
	}
}
async function addQuantity(cart_id, cartitem_id) { 
	const client = await pool.connect();
	try {
	// 	quantity + 1
	} finally {
		client.release();
	}
}
async function emptyCart(cart_id) {
	const client = await pool.connect();
	try {
		const result = await client.query('DELETE * FROM cartitems WHERE cart_id = id');
		return result.rows;
	} finally {
		client.release();
	}
}

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
    addToCart: (id, description, price) => {
      // console.log(product);
      if(!(id in cart)) {
        cart[id] = {id, description, price, quantity: 1};
      } else {
        cart[id].quantity+=1;
      }
      // console.log(cart);
      return cart;
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
  
module.exports = {dataModel, getUsers, getProducts, showProduct, hideProduct, addToCart, getCart};