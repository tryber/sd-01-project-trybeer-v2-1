const getTotalCar = car => car.reduce((acc, product) => acc + (product.qtd * product.price), 0).toFixed(2);

const removeProduct = (car, id) => {
  return car.filter(product => product.id !== id);
}

exports.addItemInCarBuyer = (ObjCarBuyer, objProduct) => {
  const { list } = ObjCarBuyer;
  const { qtd, id } = objProduct;
  if (qtd <= 0) {
    const updatedCar = removeProduct(list, id);
    return { list: updatedCar, total: getTotalCar(updatedCar) };
  }
  const getItem = list.find(product => product.id === id);
  if (!getItem) {
    list.push(objProduct);
    return { list, total: getTotalCar(list) }
  }
  getItem.qtd = qtd;
  return { list, total: getTotalCar(list) }
}

exports.saveCar = (car) => {
  const itemJson = JSON.stringify(car);
  localStorage.setItem('car', itemJson);
}

const getCar = () => JSON.parse(localStorage.getItem('car'));

exports.clearCar = () => {
  localStorage.removeItem('car');
}

exports.verifyCarBuyer = (setCarBuyer) => {
  const car = getCar();
  if (car) return setCarBuyer(car);
  return setCarBuyer({ list: [], total: 0, })
}
