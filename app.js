const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());

const mainController = require('./controllers/mainController');

app.set('view engine', 'ejs');
app.set('views', './views');

// Get Routes

app.get('/', mainController.getIndex);
app.get('/product', mainController.getProduct);
app.get('/home', mainController.getHome);
app.get('/checkout', mainController.getCheckout);
app.get('/login', mainController.getLogin);
app.get('/product-admin', mainController.getProductAdmin);

// Post Routes

app.post('/addToCart', mainController.addToCart);
app.post('/removeFromCart', mainController.removeFromCart);
app.post('/emptyCart', mainController.emptyCart);
app.post('/showToProducts', mainController.showToProducts)
app.post('/hideFromProducts', mainController.hideFromProducts)
app.post('/addToProducts', mainController.addToProducts)
app.post('/addUser', mainController.addUser);
app.post('/verifyUser', mainController.verifyUser);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
