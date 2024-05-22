import React from 'react';

const VMListItem = ({ vm, onSelectVM }) => {
  return (
    <li className="vm-list-item" onClick={() => onSelectVM(vm)}>
      <span>{vm.name}</span>
    </li>
  );
};

export default VMListItem;
