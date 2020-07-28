const axiosist = require('axiosist');
const app = require('../../api/server');
const fixtures = require('../fixtures/login');
const login = require('../../models/appBeer');

jest.setTimeout(20000);

describe('GET /admin/profile', () => {
  const axios = axiosist(app);

  describe('Error in server when is made a request to the adminProfile', () => {
    let response;

    const mockGetProfileAdmin = jest.spyOn(login, 'getProfileAdmin');

    afterAll(() => {
      mockGetProfileAdmin.mockRestore();
    });

    beforeAll(async () => {
      const { data } = await axios.post('/login', fixtures.validLogin);
      mockGetProfileAdmin.mockRejectedValue(new Error('Internal Server Error'));
      response = await axios.get('/admin/profile', { headers: { Authorization: data.token } });
    });

    it('mock error get route /admin/profile', () => {
      expect(response.status).toBe(500);
      expect(response.data.message).toBe('Internal Server Error');
    });
  });

  describe('Error in jwt when token is fail', () => {
    let response;

    beforeAll(async () => {
      response = await axios.get('/admin/profile', { headers: { Authorization: 'invalidToken' } });
    });

    it('return error in jwt', () => {
      expect(response.status).toBe(422);
      expect(response.data.message).toBe('Unprocessable Entity');
    });
  });

  describe('Unauthorized user when is made a request to the adminProfile', () => {
    let response;

    const mockGetProfileAdmin = jest.spyOn(login, 'getProfileAdmin');

    afterAll(() => {
      mockGetProfileAdmin.mockRestore();
    });

    beforeAll(async () => {
      const { data } = await axios.post('/login', fixtures.baseLoginClient);
      response = await axios.get('/admin/profile', { headers: { Authorization: data.token } });
    });

    it('user Unauthorized status and message', () => {
      expect(response.status).toBe(401);
      expect(response.data.message).toBe('User Unauthorized');
    });
  });

  describe('All is ok in request adminProfile', () => {
    let response;

    const mockGetProfileAdmin = jest.spyOn(login, 'getProfileAdmin');

    afterAll(() => {
      mockGetProfileAdmin.mockRestore();
    });

    beforeAll(async () => {
      const { data } = await axios.post('/login', fixtures.validLogin);
      response = await axios.get('/admin/profile', { headers: { Authorization: data.token } });
    });

    it('user Unauthorized status and message', () => {
      expect(response.status).toBe(200);
      expect(response.data.name).toBe('tryber');
      expect(response.data.email).toBe('tryber@gmail.com');
    });
  });
});
