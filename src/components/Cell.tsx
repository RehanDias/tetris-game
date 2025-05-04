import React from 'react';
import { CELL_SIZE } from '../utils/constants';
import { Cell as CellType } from '../types';

interface CellProps {
  cell: CellType;
}

const Cell: React.FC<CellProps> = ({ cell }) => {
  return (
    <div
      className={`
        relative
        ${cell ? 'after:content-[""] after:absolute after:inset-[2px] after:bg-white/20 after:rounded-sm' : ''}
      `}
      style={{
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
        backgroundColor: cell || '#1a1a1a',
        boxShadow: cell 
          ? 'inset -2px -2px 0 rgba(0,0,0,0.4), inset 2px 2px 0 rgba(255,255,255,0.4)' 
          : 'inset 1px 1px 0 rgba(255,255,255,0.05)',
        transition: 'background-color 0.1s ease',
      }}
    />
  );
};

export default React.memo(Cell);