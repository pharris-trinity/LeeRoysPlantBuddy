const { getProducts, dataModel } = require('../models/dataModel');

test('Checks what products are being returned from getProducts', async () => {
    const result = await getProducts();
    expect(result).toEqual([
        {
          product_id: 3,
          product_name: 'Bird Food',
          product_price: 6.99,
          product_image: 'images/bird-food.bmp',
          display: true
        },
        {
          product_id: 2,
          product_name: 'Dog Food',
          product_price: 5.99,
          product_image: 'images/dog-food.bmp',
          display: true
        },
        {
          product_id: 1,
          product_name: 'Cat Food',
          product_price: 5.99,
          product_image: 'images/cat-food.bmp',
          display: true
        },
        {
          product_id: 4,
          product_name: 'Lizard Food',
          product_price: 7.99,
          product_image: 'images/lizard-food.bmp',
          display: true
        }
      ]);
});

test('Testing verifyUser for a registered user', () => {
    expect(dataModel.verifyUser('pharris', 'password')).toEqual({"id": 1, 'verified': 'registered'});
})

test('Testing verifyUser for an admin user', () => {
    expect(dataModel.verifyUser('chouston', 'drowssap')).toEqual({"id": 2, 'verified': 'admin'});
})

test('Testing verifyUser for an invalid user and correct password combo', () => {
    expect(dataModel.verifyUser('profhorn', 'password')).toEqual({"id": -1, 'verified': 'failed'});
})

test('Testing verifyUser for a correct user and and invalid password combo', () => {
    expect(dataModel.verifyUser('chouston', 'password')).toEqual({"id": -1, 'verified': 'failed'});
})

test('Testing verifyUser for a correct user and and invalid password combo', () => {
    expect(dataModel.verifyUser('profhorn', 'silliness')).toEqual({"id": -1, 'verified': 'failed'});
})