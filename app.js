const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const mainController = require('./controllers/mainController');

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', mainController.getIndex);
app.get('/product', mainController.getProduct);
app.get('/home', mainController.getHome);
app.get('/checkout', mainController.getCheckout);
app.get('/login', mainController.getLogin);

app.post('/verifyUser', mainController.verifyUser);
app.post('/addUser', mainController.addUser);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
