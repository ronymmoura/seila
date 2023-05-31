import React from 'react';

export const Money = ({ value }: { value: number | string | null }) => {
  const val = value ?? 0;

  return (
    <>
      R${' '}
      {(+val).toLocaleString('pt-br', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })}
    </>
  );
};
