import React from 'react';

const Row: React.FC<{tag?: string, children: any}> = ({ tag, children }) => {
  const Tag = (tag || 'div') as "div" | "label";

  return (
    <Tag style={{
      display: 'flex',
      borderBottom: '1px solid #eee',
      paddingBottom: '0.4rem',
      marginBottom: '0.7rem',
    }}>
      {children}
    </Tag>
  );
};

const Column: React.FC<{children: any, right?: boolean | undefined}> = ({ children, right }) => (
  <div style={{
    flex: '1',
    textAlign: right ? 'right' : undefined,
  }}>{children}</div>
);

export { Row, Column };
