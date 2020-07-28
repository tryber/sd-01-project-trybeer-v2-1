const axiosist = require('axiosist');
const app = require('../../api/server');
const fixtures = require('../fixtures/login');
const login = require('../../models/appBeer');

jest.setTimeout(20000);

describe('middleware rescue fail process', () => {
  const axios = axiosist(app);

  describe('Error in server when is made a login', () => {
    let response;
    const testLogin = jest.spyOn(login, 'loginUser');

    afterAll(() => {
      testLogin.mockRestore();
    });

    beforeAll(async () => {
      testLogin.mockRejectedValue(new Error('Invalid Fields'));
      response = await axios.post('/login', fixtures.validLogin);
    });

    it('mock error function loginUser', () => {
      expect(response.status).toBe(400);
      expect(response.data.message).toBe('Invalid Fields');
    });
  });

  describe('Error in server when is made a request to the listProducts', () => {
    let response;

    const mockGetListProduct = jest.spyOn(login, 'getListProduct');

    afterAll(() => {
      mockGetListProduct.mockRestore();
    });

    beforeAll(async () => {
      const { data } = await axios.post('/login', fixtures.baseLoginClient);
      mockGetListProduct.mockRejectedValue(new Error('Internal Server Error'));
      response = await axios.get('/products', { headers: { Authorization: data.token } });
    });

    it('mock error function loginUser', () => {
      expect(response.status).toBe(500);
      expect(response.data.message).toBe('Internal Server Error');
    });
  });

  describe('Error in jwt when token is denied', () => {
    let response;

    beforeAll(async () => {
      response = await axios.get('/products', { headers: { Authorization: 'invalidToken' } });
    });

    it('mock error function loginUser', () => {
      expect(response.status).toBe(422);
      expect(response.data.message).toBe('Unprocessable Entity');
    });
  });
});
