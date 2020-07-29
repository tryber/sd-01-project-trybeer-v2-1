exports.updateValue = actualStatus => actualStatus === 'Pendente' ? 'Preparando' : 'Entregue';

exports.orderStatus = value => (
  {
    Pendente: 1,
    Preparando: 2,
    Entregue: 3,
  }[value]
);
