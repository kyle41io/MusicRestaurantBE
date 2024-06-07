-- pg_database WHERE datname = 'lysafashion_db'\gexec;

CREATE TABLE IF NOT EXISTS storehouse (
    id SERIAL,
    address VARCHAR(50),
    open_hour INT,
    close_hour INT,
    reference VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS shop (
    id SERIAL,
    address VARCHAR(50),
    open_hour INT,
    close_hour INT,
    reference VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product (
    id SERIAL,
    price INT,
    bar_code VARCHAR(50),
    name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS delivery (
    id SERIAL,
    shop_id INT,
    storehouse_id INT,
    product_id INT,
    date TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (shop_id) REFERENCES shop(id),
    FOREIGN KEY (storehouse_id) REFERENCES storehouse(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS sale (
    id SERIAL,
    shop_id INT,
    date TIMESTAMP,
    total_price INT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS list_product (
    id SERIAL,
    storehouse_id INT,
    shop_id INT,
    delivery_id INT,
    sale_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (id),
    FOREIGN KEY (storehouse_id) REFERENCES storehouse(id),
    FOREIGN KEY (shop_id) REFERENCES shop(id),
    FOREIGN KEY (delivery_id) REFERENCES delivery(id),
    FOREIGN KEY (sale_id) REFERENCES sale(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
-- insert into product_variation(id, product_id, variation_id, ename) values(1,)
