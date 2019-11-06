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
      <Column right>
        <input
          id={fieldName}
          type="number"
          style={{
            border: '1px solid #eee',
            padding: '0.4rem 0.2rem',
            textAlign: 'right',
            borderRadius: '0.3rem',
          }}
          value={value}
          onChange={onChange}
        />
      </Column>
    </Row>
  );
};

export default Input;
