import React from 'react';

export const Money: React.FC<{ value: number }> = ({ value }) => {
  return (
    <>
      R${' '}
      {value.toLocaleString('pt-br', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })}
    </>
  );
};
