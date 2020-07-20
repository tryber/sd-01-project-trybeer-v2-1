import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Header from '../../component/Header';

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
  test('data-test-id', () => {
    const { getByTestId } = render(<Header />);
    const title = getByTestId('top-title');
    const btnShowNav = getByTestId('top-hamburguer');
    expect(title).toBeInTheDocument();
    expect(btnShowNav).toBeInTheDocument();
  });


  describe('Testando funcionalidade do botão de menu', () => {
    test('Testando funcionalidade de clique', () => {
      const { getByTestId, queryByTestId } = renderWithRouter(<Header path="orders" />);
      const btnShowNav = getByTestId('top-hamburguer');
      let linkProduct = queryByTestId('side-menu-item-products');
      expect(linkProduct).not.toBeInTheDocument();
      fireEvent.click(btnShowNav);
      linkProduct = queryByTestId('side-menu-item-products');
      expect(linkProduct).toBeInTheDocument();
    })
  })

  describe('Testando rotas', () => {
    test('Pagina Produtos', () => {
      const { getByTestId } = render(<Header path="products" />);
      const title = getByTestId('top-title');
      expect(title).toBeInTheDocument();
      expect(title.innerHTML).toBe('Trybeer');
    });

    test('Pagina Meus Pedidos', () => {
      const { getByTestId } = render(<Header path="orders" />);
      const title = getByTestId('top-title');
      expect(title).toBeInTheDocument();
      expect(title.innerHTML).toBe('Meus Pedidos');
    });

    test('Pagina Meu perfil', () => {
      const { getByTestId } = render(<Header path="profile" />);
      const title = getByTestId('top-title');
      expect(title).toBeInTheDocument();
      expect(title.innerHTML).toBe('Meu perfil');
    });

    test('Pagina Detalhes de Pedido', () => {
      const { getByTestId } = render(<Header path="orders" id={true} />);
      const title = getByTestId('top-title');
      expect(title).toBeInTheDocument();
      expect(title.innerHTML).toBe('Detalhes de Pedido');
    });

    test('Pagina Finalizar', () => {
      const { getByTestId } = render(<Header path="checkout" />);
      const title = getByTestId('top-title');
      expect(title).toBeInTheDocument();
      expect(title.innerHTML).toBe('Finalizar');
    });
  });
});
