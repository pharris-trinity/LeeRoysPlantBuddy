const dataModel = require('../models/dataModel');

const mainController = {
  getIndex: (req, res) => {
    const data = dataModel.getData();
    res.render('index', { data });
  },
  getProduct: (req, res) => {
    const data = dataModel.getData();
    res.render('product', { data });
  }
};

module.exports = mainController;