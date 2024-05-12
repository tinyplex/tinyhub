import {CellView, useSetCellCallback} from 'tinybase/debug/ui-react';
import React from 'react';

export const Button = () => {
  const handleClick = useSetCellCallback(
    't',
    'r',
    'c',
    () =>
      (c = 0) =>
        (c as number) + 1,
  );

  return (
    <>
      <CellView tableId="t" rowId="r" cellId="c" />
      <button onClick={handleClick}>Count</button>
    </>
  );
};
