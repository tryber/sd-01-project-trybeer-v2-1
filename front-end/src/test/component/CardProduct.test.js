import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardProduct from '../../component/CardProduct';
import { Provider } from '../../context';

describe('Verifica requisitos projeto', () => {
  test('data-test-id', () => {
    const attProduct = {
      id:1,
      price: 2.20,
      img: 'http://localhost:3001/skol-lata-350ml.jpg',
      name: 'Skol Lata 250ml',
    };

    const valueIndex = 1;

    const { getByTestId } = render(<Provider><CardProduct index={valueIndex} attributes={attProduct} /></Provider>);

    const productPrice = getByTestId(`${valueIndex}-product-price`);
    const productName = getByTestId(`${valueIndex}-product-name`);
    const productImage = getByTestId(`${valueIndex}-product-img`);
    const btnMinus = getByTestId(`${valueIndex}-product-minus`);
    const btnPlus = getByTestId(`${valueIndex}-product-plus`);
    const inputQtd = getByTestId(`${valueIndex}-product-qtd`);

    expect(productPrice).toBeInTheDocument();
    expect(productPrice.innerHTML).toBe(`R$ ${attProduct.price.toLocaleString('pt-BR')}`);
    expect(productName).toBeInTheDocument();
    expect(productName.innerHTML).toBe(attProduct.name);
    expect(productImage).toBeInTheDocument();
    expect(productImage.src).toBe(attProduct.img);
    expect(btnMinus).toBeInTheDocument();
    expect(btnPlus).toBeInTheDocument();
    expect(inputQtd).toBeInTheDocument();
  });

  test('Testando os botoes para modificar a quantidade', () => {
    const attProduct = {
      id: 1,
      price: 2.20,
      img: 'http://localhost:3001/skol-lata-350ml.jpg',
      name: 'Skol Lata 250ml',
    };

    const valueIndex = 1;

    const { getByTestId } = render(<Provider><CardProduct index={valueIndex} attributes={attProduct} /></Provider>);

    const btnMinus = getByTestId(`${valueIndex}-product-minus`);
    const btnPlus = getByTestId(`${valueIndex}-product-plus`);
    const inputQtd = getByTestId(`${valueIndex}-product-qtd`);

    expect(inputQtd).toBeInTheDocument();
    expect(inputQtd.value).toBe("0");
    fireEvent.click(btnPlus);
    expect(inputQtd.value).toBe("1");
    fireEvent.click(btnPlus);
    expect(inputQtd.value).toBe("2");
    fireEvent.click(btnMinus);
    expect(inputQtd.value).toBe("1");
    fireEvent.change(inputQtd, { target: { value: 5 } });
    expect(inputQtd.value).toBe("5");
    fireEvent.change(inputQtd, { target: { value: 0 } });
    expect(inputQtd.value).toBe("0");
    expect(btnMinus.disabled).toBe(true);
    fireEvent.change(inputQtd, { target: { value: -2 } });
    expect(inputQtd.value).toBe("0");
    expect(btnMinus.disabled).toBe(true);
  });
});
