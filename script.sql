CREATE DATABASE IF NOT EXISTS trybeer;
USE trybeer;

CREATE TABLE IF NOT EXISTS users (
  id_user INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  password VARCHAR(64) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id_product INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  name_product VARCHAR(255) NOT NULL,
  price DOUBLE NOT NULL,
  image VARCHAR(100) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS orders (
  id_order INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  id_user INT NOT NULL,
  data TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  address VARCHAR(255) NOT NULL,
  address_number INT NOT NULL,
  status TINYINT DEFAULT 0,
  FOREIGN KEY (id_user) REFERENCES trybeer.users (id_user)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS orders_products (
  id_order INT NOT NULL,
  id_product INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (id_order) REFERENCES trybeer.orders (id_order),
  FOREIGN KEY (id_product) REFERENCES trybeer.products (id_product)
) ENGINE = InnoDB;

INSERT INTO products (name_product, price, image)
VALUES
('Skol Lata 250ml', 2.20, 'http://localhost:3001/skol-lata-350ml.jpg'),
('Heineken 600ml', 7.50, 'http://localhost:3001/heineken-600ml.jpg'),
('Antarctica Pilsen 300ml', 2.49, 'http://localhost:3001/antarctica-pilsen-300ml.jpg'),
('Brahma 600ml', 7.50, 'http://localhost:3001/brahma-600ml.jpg'),
('Skol 269ml', 2.19, 'http://localhost:3001/skol-269ml.jpg'),
('Skol Beats Senses 313ml', 4.49, 'http://localhost:3001/skol-beats-senses-313ml.jpg'),
('Becks 330ml', 4.99, 'http://localhost:3001/becks-330ml.jpg'),
('Brahma Duplo Malte 350ml', 2.79, 'http://localhost:3001/brahma-duplo-malte-350ml.jpg'),
('Becks 600ml', 8.89, 'http://localhost:3001/becks-600ml.jpg'),
('Skol Beats Senses 269ml', 3.57, 'http://localhost:3001/skol-beats-senses-269ml.jpg'),
('Stella Artois 275ml', 3.49, 'http://localhost:3001/stella-artois-275ml.jpg');

INSERT INTO users (name, password, email, role)
VALUES
('tryber', 'U2FsdGVkX1+VEr77ZZsY1np0AxvGEoaeyPooPgY/sDI=', 'tryber@gmail.com', 'admin');

DELIMITER $$
CREATE PROCEDURE `createUser`(IN nameValue VARCHAR(80),IN emailValue VARCHAR(50),IN passwordValue VARCHAR(64),IN roleValue VARCHAR(20))
BEGIN
INSERT INTO users (name, email,password, role)
VALUES
(nameValue, emailValue, passwordValue, roleValue);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `createOrder`(IN idUser INT, IN address VARCHAR(255), IN addressNumber INT)
BEGIN
INSERT INTO orders (id_user, address, address_number)
VALUES
(idUser, address, addressNumber);
SELECT id_order FROM orders order by id_order desc limit 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `createProductOrder`(IN idOrder INT, IN idProducts INT, IN qtdValue INT)
BEGIN
INSERT INTO orders_products (id_order, id_product, quantity)
VALUES
(idOrder, idProducts, qtdValue);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getAllDataOrder`()
BEGIN
SELECT O.id_order, O.data, O.address, O.address_number, U.name AS client,
O.status, priceOrderTotal(id_order) AS Total
FROM orders AS O
INNER JOIN users AS U
ON O.id_user = U.id_user;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getAllDataOrderUser`(IN idUser INT)
BEGIN
SELECT O.id_order, O.data, priceOrderTotal(id_order) AS total
FROM orders AS O
WHERE O.id_user = idUser;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getListProducts`()
BEGIN
SELECT * FROM products;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getProductsInOrder`(IN idOrder INT, IN idUser INT)
BEGIN
SELECT P.name_product, P.price, OP.quantity, P.price * OP.quantity AS total
FROM products AS P
INNER JOIN orders_products AS OP
ON P.id_product = OP.id_product
INNER JOIN orders AS O
ON O.id_order = OP.id_order
WHERE O.id_order = idOrder AND O.id_user = idUser;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getUniqueOrderAdmin`(IN idOrder INT)
BEGIN
SELECT P.name_product, P.price, OP.quantity
FROM products AS P
INNER JOIN orders_products AS OP
ON P.id_product = OP.id_product
INNER JOIN orders AS O
ON O.id_order = OP.id_order
WHERE O.id_order = idOrder;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getUser`(IN emailUser VARCHAR(50))
BEGIN
SELECT * FROM users
WHERE email = emailUser;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `updateStatusOrder`(IN idOrder INT, IN valueStatus INT)
BEGIN
UPDATE orders O
	SET O.status = valueStatus
WHERE O.id_order = idOrder;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `updateUser`(IN idUser INT, IN name_Value VARCHAR(80))
BEGIN
UPDATE users s
	SET s.name = name_Value
WHERE s.id_user = idUser;
SELECT * FROM users WHERE id_user = idUser;
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION `priceOrderTotal`(idOrder INT) RETURNS double
READS SQL DATA
BEGIN
DECLARE sum_total DOUBLE;
SELECT SUM(P.price * OP.quantity) AS total
FROM products AS P
INNER JOIN orders_products AS OP
ON P.id_product = OP.id_product
INNER JOIN orders AS O
ON O.id_order = OP.id_order
WHERE O.id_order = idOrder INTO sum_total;
RETURN FORMAT(sum_total, 2);
END$$
DELIMITER ;
