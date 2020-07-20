// const mysql = require('mysql');
// const path = require('path');

// const connection = require('../../models/connectionModel');

// const enviromentVariable = path.resolve(__dirname, '..', '..', '..', '.env');

// require('dotenv').config({ path: enviromentVariable });

// const mockOptions = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: 'process.env.DB_PASS',
//   database: process.env.DB_NAME,
// }

// const connectionErrorMysql = 'ER_ACCESS_DENIED_ERROR';

// describe('Testing how Mocking works', () => {

//   const newConnection = jest.spyOn(connection);

//   afterAll(() => {
//     newConnection.mockRestore();
//   });

//   test('Can mock newConnection', async (done) => {
//     await newConnection(mysql.createConnection(mockOptions));

//     connection().then((data) => {
//       expect(data.code).toBe(connectionErrorMysql);
//     });
//   });
// });

// const mysql = require('mysql');
// const { getData } = require('./QueryHandler');
// +
// +jest.mock('mysql');

// const mockOptions = {
//     host: 'localhost',
//     user: "admin",
//     password: "password"
// }

// const localDatabaseResultIsDifferentThanServer = 124;

// describe('Testing how Mocking works', () => {
//     test('Can mock createConnection', (done) => {
// -       mysql.createConnection = jest.fn();
//         mysql.createConnection.mockImplementation(() => mysql.createConnection(mockOptions));

//         getData().then((data) => {
//             expect(data).toBe(localDatabaseResultIsDifferentThanServer);
//         })
//     })
// })
