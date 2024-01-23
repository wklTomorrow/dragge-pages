import { MouseEvent } from 'react';

export const useDrag = () => {
  const handleSelect = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e);
  };
  return {
    handleSelect,
  };
};
