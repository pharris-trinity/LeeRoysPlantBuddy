const { getProducts } = require('../models/dataModel');

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