const dataModel = {
    getData: () => {
      // Logic to fetch data from a source
      return 'Hello, LeeRoy!';
    },
    getProducts: () => {
      let products = [
        {id: 1, description: 'Cat Food'},
        {id: 2, description: 'Pet Stuff'},
        {id: 3, description: 'Dog Food'},
        {id: 4, description: 'Bird Food'},
        {id: 5, description: 'Lizard Food'},
      ]
      return products;
    }
  };
  
  module.exports = dataModel;