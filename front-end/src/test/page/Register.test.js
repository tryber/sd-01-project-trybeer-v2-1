import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Register from '../../pages/Register';
import serviceApi from '../../service/serviceFetch';
import fixture from './fixtureUser';

serviceApi.fetchApi = jest.fn();

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Verifica requisitos projeto', () => {
  test('data-test-id da pagina register', () => {
    const { getByTestId } = renderWithRouter(<Register />);

    const inputName = getByTestId('signup-name');
    const inputEmail = getByTestId('signup-email');
    const inputPassword = getByTestId('signup-password');
    const checkboxSeller = getByTestId('signup-seller');
    const inputSubmit = getByTestId('signup-btn');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(checkboxSeller).toBeInTheDocument();
    expect(inputSubmit).toBeInTheDocument();
  });

  test('Testando Vendedor valido', () => {
    const { getByTestId } = renderWithRouter(<Register />);
    const { name, password, email, seller, mockMessageResponse } = fixture.validClient;

    serviceApi.fetchApi.mockImplementation(() => ({ message: mockMessageResponse }));

    const inputName = getByTestId('signup-name');
    const inputEmail = getByTestId('signup-email');
    const inputPassword = getByTestId('signup-password');
    const checkboxSeller = getByTestId('signup-seller');
    const inputSubmit = getByTestId('signup-btn');

  

    inputName.value= name;
    fireEvent.change(inputEmail, { target: { value: 'henrique@j.com' } });
    fireEvent.change(inputPassword, { target: { value: password } });
    fireEvent.click(checkboxSeller);


    fireEvent.click(inputSubmit);
    
  });
});

