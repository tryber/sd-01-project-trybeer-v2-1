const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const { listProducts, adminProfile, register, login } = require('./routes');
// const { login, register, profileClient, listProducts, adminProfile } = require('./routes');
const { createOrder, getOrdersClient, getOneOrderClient, ordersAdmin } = require('./routes');
const { getOneOrderAdmin, putStatusOrderAdmin } = require('./routes');
const { invalidLogin, databaseErrorHandling } = require('../middlewares/rescues');
const { updateNameMiddleware, userValidMiddleware } = require('../middlewares/index');
const { validRegisterMiddleware, validLoginMiddleware } = require('../middlewares/index');
const { validOrderMiddleware, routeParamsValid } = require('../middlewares/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

const apiTrybeer = express.Router();

apiTrybeer.post('/register', validRegisterMiddleware, register);
apiTrybeer.post('/login', validLoginMiddleware, invalidLogin(login));

apiTrybeer.get('/admin/profile', databaseErrorHandling(adminProfile));
apiTrybeer.get('/admin/orders', userValidMiddleware, databaseErrorHandling(ordersAdmin));
apiTrybeer.get('/admin/orders/:id', userValidMiddleware, routeParamsValid, databaseErrorHandling(getOneOrderAdmin));
apiTrybeer.put('/admin/orders/:id', userValidMiddleware, routeParamsValid, databaseErrorHandling(putStatusOrderAdmin));

apiTrybeer.get('/products', databaseErrorHandling(listProducts));

apiTrybeer.get('/orders', userValidMiddleware, databaseErrorHandling(getOrdersClient));
apiTrybeer.get('/orders/:id', userValidMiddleware, routeParamsValid, databaseErrorHandling(getOneOrderClient));
// apiTrybeer.put('/profile', userValidMiddleware, updateNameMiddleware, databaseErrorHandling(profileClient));
apiTrybeer.post('/checkout', userValidMiddleware, validOrderMiddleware, databaseErrorHandling(createOrder));

app.use(apiTrybeer);

app.use('*', (_req, res) => res.status(404).json({ message: 'Page not found' }));

module.exports = app;
