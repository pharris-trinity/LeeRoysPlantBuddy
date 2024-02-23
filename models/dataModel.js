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
      
    }
  };
  
  module.exports = dataModel;
