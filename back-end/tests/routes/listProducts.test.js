const axiosist = require('axiosist');
const mockListProducts = require('../fixtures/listProducts');
const app = require('../../api/server');
const fixtures = require('../fixtures/login');

jest.setTimeout(20000);

describe('GET /produtcs', () => {
  const axios = axiosist(app);

  describe('when required data is missing', () => {
    let response;

    beforeAll(async () => {
      const { data } = await axios.post('/login', fixtures.baseLoginClient);
      response = await axios.get('/products', { headers: { Authorization: data.token } });
    });

    it('returns a 200 HTTP status code', () => {
      expect(response.status).toBe(200);
    });

    it('returns a list of products', () => {
      expect(response.data).toEqual(mockListProducts);
    });
  });
});
