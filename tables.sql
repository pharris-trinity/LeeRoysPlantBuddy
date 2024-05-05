CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    account_type VARCHAR(20) NOT NULL
);

INSERT INTO users (username, password, account_type) VALUES 
    ('pharris', 'password', 'registered'),
    ('chouston', 'drowssap', 'admin');

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_price FLOAT NOT NULL,
    product_image VARCHAR(1000),
    display BOOLEAN NOT NULL
);

INSERT INTO products (product_name, product_price, product_image, display) VALUES
    ('Cat Food', 5.99, 'images/cat-food.bmp', TRUE),
    ('Dog Food', 5.99, 'images/dog-food.bmp', TRUE),
    ('Bird Food', 6.99, 'images/bird-food.bmp', TRUE),
    ('Lizard Food', 7.99, 'images/lizard-food.bmp', FALSE);

CREATE TABLE cartitems (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    product_price FLOAT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE adminactions (
    action_id SERIAL PRIMARY KEY,
    action_executor INT NOT NULL,
    action_receiver INT NOT NULL,
    action_type VARCHAR(25) NOT NULL,
    action_time VARCHAR(200) NOT NULL,
    FOREIGN KEY (action_receiver) REFERENCES products(product_id)
);