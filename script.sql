CREATE DATABASE IF NOT EXISTS trybeer;

DELIMITER $$
CREATE PROCEDURE `createOrder`(IN idUser INT, IN address VARCHAR(255), IN addressNumber INT)
BEGIN
INSERT INTO Orders (id_user, address, address_number)
VALUES
(idUser, address, addressNumber);
SELECT id_order FROM Orders order by id_order desc limit 1;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `createProductOrder`(IN idOrder INT, IN idProducts INT, IN qtdValue INT)
BEGIN
INSERT INTO Orders_products (id_order, id_product, quantity)
VALUES
(idOrder, idProducts, qtdValue);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getAllDataOrder`()
BEGIN
SELECT O.id_order, O.data, O.address, O.address_number, U.name AS client,
O.status, priceOrderTotal(id_order) AS Total
FROM Orders AS O
INNER JOIN Users AS U
ON O.id_user = U.id_user;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getAllDataOrderUser`(IN idUser INT)
BEGIN
SELECT O.id_order, O.data, priceOrderTotal(id_order) AS total
FROM Orders AS O
WHERE O.id_user = idUser;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getProductsInOrder`(IN idOrder INT, IN idUser INT)
BEGIN
SELECT P.name_product, P.price, OP.quantity, P.price * OP.quantity AS total
FROM Products AS P
INNER JOIN Orders_products AS OP
ON P.id_product = OP.id_product
INNER JOIN Orders AS O
ON O.id_order = OP.id_order
WHERE O.id_order = idOrder AND O.id_user = idUser;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getUniqueOrderAdmin`(IN idOrder INT)
BEGIN
SELECT P.name_product, P.price, OP.quantity
FROM Products AS P
INNER JOIN Orders_products AS OP
ON P.id_product = OP.id_product
INNER JOIN Orders AS O
ON O.id_order = OP.id_order
WHERE O.id_order = idOrder;
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION `priceOrderTotal`(idOrder INT) RETURNS double
READS SQL DATA
BEGIN
DECLARE sum_total DOUBLE;
SELECT SUM(P.price * OP.quantity) AS total
FROM Products AS P
INNER JOIN Orders_products AS OP
ON P.id_product = OP.id_product
INNER JOIN Orders AS O
ON O.id_order = OP.id_order
WHERE O.id_order = idOrder INTO sum_total;
RETURN FORMAT(sum_total, 2);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `getOrderPriceTotal`(IN idOrder INT)
BEGIN
SELECT priceOrderTotal(idOrder) AS priceTotal, data, id_order, status
FROM Orders
WHERE id_order = idOrder;
END$$
DELIMITER ;
