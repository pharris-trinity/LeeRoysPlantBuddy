let users = [
  {userid: 0, username: 'pharris', password: 'password', account_type: 'registered'},
  {userid: 1, username: 'chouston', password: "drowssap", account_type: 'admin'},
];

const dataModel = {
    getData: () => {
      // Logic to fetch data from a source
      return 'Hello, LeeRoy!';
    },
    getProducts: () => {
      let products = [
        {id: 1, description: 'Cat Food', price: 5.99},
        {id: 2, description: 'Pet Stuff', price: 5.99},
        {id: 3, description: 'Dog Food', price: 5.99},
        {id: 4, description: 'Bird Food', price: 5.99},
        {id: 5, description: 'Lizard Food', price: 5.99},
      ]
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
      console.log('addUser in dataModel triggered');
      var lastUser = users[users.length - 1];
      var newid = lastUser.userid + 1;
      var newUser = {userid: newid, username: username, password: password, account_type: 'registered'};
      users += newUser;
      console.log(users);
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
    }
  };

  class Users {
    constructor() {
      this.names = [];
    }
  
    // addUser(username, password) {
    //   console.log('got here');
    //   lastUser = users[users.length - 1];
    //   newid = lastUser.userid + 1
    //   newUser = {userid: newid, username: username, password: password, account_type: 'registered'};
    //   users += newUser;
    //   console.log(users);
    //   return newUser;
    // }	
  
    getUsers() {
      return users;
    }
  }
  
  module.exports = {dataModel, Users};
