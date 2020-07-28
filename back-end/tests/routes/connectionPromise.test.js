const axiosist = require('axiosist');
const app = require('../../api/server');
const connection = require('../../services/connectionPromise');
const fixtures = require('../fixtures/login');

jest.setTimeout(20000);

describe('connectionPromise fail', () => {
  const axios = axiosist(app);

  const conn = jest.spyOn(connection, 'connectionPromise');

  afterAll(() => {
    conn.mockRestore();
  });

  beforeAll(async () => {
    response = await axios.post('/login', fixtures.validLogin);
  });
  
  it('return `Erro ao ler o arquivo` error message', () => {
    conn.mockRejectedValue('Erro ao ler o arquivo');
    expect(conn()).rejects.toMatch('Erro ao ler o arquivo');
  });
});
