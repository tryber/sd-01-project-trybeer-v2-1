import React from 'react';

const InvalidFields = ({ isValid }) => (
  <div>
    <h3 data-testid="invalid-fields" className="invalid-fields">
      {isValid.invalid.reduce((acc, field) => `${acc} ${field}`, 'Campos Inválidos:')}
    </h3>
  </div>
);

export default InvalidFields;
