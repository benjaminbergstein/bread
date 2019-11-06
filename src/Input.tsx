import React from 'react';
import { Row, Column } from './Table';

const Input: React.FC<{fieldName: string, value: number, onChange: any }> = ({
  fieldName,
  value,
  onChange,
}) => {
  const humanName = fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^[a-z]/g, (letter) => letter.toUpperCase());
  return (
    <Row tag="label">
      <Column>{humanName}</Column>
      <Column>
        <input id={fieldName} type="number" value={value} onChange={onChange} />
      </Column>
    </Row>
  );
};

export default Input;
