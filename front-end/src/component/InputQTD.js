import React from 'react';

const InputQTD = ({ callback, qtd, dataTest }) => (
  <input type="number" className="input-qtd" min="0" value={qtd} data-testid={dataTest} onChange={(e) => callback(e.target.value)} />
);

export default InputQTD;
