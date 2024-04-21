CREATE TABLE carts (
    cart_id SERIAL PRIMARY KEY
);

INSERT INTO carts (cart_id) VALUES
    (1), 
    (2);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    account_type VARCHAR(20) NOT NULL,
    cart_id INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts (cart_id)
);

INSERT INTO users (username, password, account_type, cart_id) VALUES 
    ('pharris', 'password', 'registered', 1),
    ('chouston', 'drowssap', 'admin', 2);


CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    product_price FLOAT NOT NULL,
    product_image VARCHAR(100),
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
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);