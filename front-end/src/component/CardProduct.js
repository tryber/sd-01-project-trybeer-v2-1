import React, { useContext } from 'react';
import InputQTD from '../component/InputQTD';
import { addItemInCarBuyer } from '../service/CarBuyer';
import { TrybeerContext } from '../context';
import '../styles/CardProduct.css'


function CardProduct({ index, attributes }) {
  const { price, name_product: name, image, id_product: id } = attributes;
  const { saveCarBuyer, carBuyer } = useContext(TrybeerContext);
  const infoProductCar = carBuyer.list.find(product => product.id === id);
  const qtd = (infoProductCar) ? infoProductCar.qtd : 0;
  return (
    <div className="CardProduct">
      <h3 className="product-price" data-testid={`${index}-product-price`}>{`R$ ${price.toFixed(2).toLocaleString('pt-BR')}`}</h3>
      <div className="img-product">
        <img data-testid={`${index}-product-img`} src={image} alt={`Product ${name}`} />
      </div>
      <h2 data-testid={`${index}-product-name`} className="product-name">{name}</h2>
      <div className="div-qtd">
        <input type="button" className="btn-qtd" value="-" disabled={qtd === 0} data-testid={`${index}-product-minus`} onClick={() => saveCarBuyer(addItemInCarBuyer(carBuyer, { id, name, price, qtd: qtd - 1 }))} />
        <InputQTD dataTest={`${index}-product-qtd`} qtd={qtd} callback={(value)=>saveCarBuyer(addItemInCarBuyer(carBuyer, { id, name, price, qtd: Number(value)}))}/>
        <input type="button" className="btn-qtd" value="+" data-testid={`${index}-product-plus`} onClick={() => saveCarBuyer(addItemInCarBuyer(carBuyer, { id, name, price, qtd: qtd + 1 }))} />
      </div>
    </div>
  );
}

export default CardProduct;
