import React from 'react';

interface CompProps {
  tag: keyof JSX.IntrinsicElements;
}

const Row: React.FC<{tag?: string, children: any}> = ({ tag, children }) => {
  const Tag = (tag || 'div') as "div" | "label";

  return (
    <Tag style={{ display: 'flex' }}>
      {children}
    </Tag>
  );
};

const Column: React.FC<{children: any}> = ({ children }) => (
  <div style={{ flex: '1' }}>{children}</div>
);

export { Row, Column };
