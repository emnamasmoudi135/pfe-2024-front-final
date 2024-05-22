import React from 'react';
import VMListItem from './VMListItem';

const Sidebar = ({ vms, onSelectVM }) => {
  return (
    <div className="sidebar">
      <h2>TestBench List</h2>
      <ul className="vm-list">
        {vms.map(vm => (
          <VMListItem key={vm.vmid} vm={vm} onSelectVM={onSelectVM} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
