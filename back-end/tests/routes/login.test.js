const axiosist = require('axiosist');
const app = require('../../api/server');
const fixtures = require('../fixtures/login');

jest.setTimeout(20000);

describe('POST /login', () => {
  const axios = axiosist(app);

  describe('when required data is missing', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/login', {});
    });

    it('returns a 400 HTTP status code', () => {
      expect(response.status).toBe(400);
    });

    it('returns a `missing fields` error message', () => {
      expect(response.data.message).toBe('Invalid Fields');
    });
  });

  describe('when email is invalid', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/login', fixtures.invalidEmail);
    });

    it('returns 400 a HTTP status code', () => {
      expect(response.status).toBe(400);
    });

    it('returns a `Invalid Fields`', () => {
      expect(response.data.message).toBe('Invalid Fields');
    });
  });

  describe('when password is invalid', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/login', fixtures.invalidPassword);
    });

    it('returns 400 a HTTP status code', () => {
      expect(response.status).toBe(400);
    });

    it('returns a `Invalid Fields`', () => {
      expect(response.data.message).toBe('Invalid Fields');
    });
  });

  describe('when password is invalid but is valid in forms', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/login', fixtures.passwordFormsValid);
    });

    it('returns 400 a HTTP status code', () => {
      expect(response.status).toBe(400);
    });

    it('returns a `Invalid Fields`', () => {
      expect(response.data.message).toBe('Invalid Fields');
    });
  });

  describe('when email is invalid but is valid in forms', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/login', fixtures.emailFormsValid);
    });

    it('returns 400 a HTTP status code', () => {
      expect(response.status).toBe(400);
    });

    it('returns a `Invalid Fields`', () => {
      expect(response.data.message).toBe('Invalid Fields');
    });
  });

  describe('when everything is ok', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/login', fixtures.validLogin);
    });

    it('returns a 200 HTTP status code', () => {
      expect(response.status).toBe(200);
    });

    it('returns an object', () => {
      expect(typeof response.data).toBe('object');
    });

    it('returns a valid token', () => {
      expect(response.data).toHaveProperty('token');
      expect(response.data).toHaveProperty('name');
      expect(response.data).toHaveProperty('email');
      expect(response.data).toHaveProperty('role');
    });

    // describe('the valid token', () => {
    //   it('has 16 characters', () => {
    //     expect(response.data.token).toHaveLength(16);
    //   });

    //   it('is made of numbers and letters', () => {
    //     expect(/^[0-9a-z]+$/ig.test(response.data.token)).toBe(true);
    //   });
    // });
  });
});
