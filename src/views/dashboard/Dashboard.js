import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCard from 'src/components/Card'; // Assurez-vous que le chemin est correct
import proxmoxService from 'src/services/proxmoxService';
import { FaTools, FaServer, FaNetworkWired } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleProxmoxConnect = async () => {
    const response = await proxmoxService.loginProxmox();
    if (response && response[0] === true) {
      navigate('/proxmox'); // Redirection vers la page Proxmox en cas de succès
    } else {
      alert('Login failed');
    }
  };

  const handleAnsible = async () => {
    navigate('/ansible');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh'}}>
      <div className="d-flex justify-content-center flex-wrap" style={{ gap: '20px' }}>
        <CustomCard
          icon={<FaTools style={{ fontSize: '2rem', color: '#3664AD' }} />}
          title="Ansible"
          description="Automate your IT tasks"
          buttonText="Automate"
          onClick={handleAnsible}
        />
        <CustomCard
          icon={<FaNetworkWired style={{ fontSize: '2rem', color: '#3664AD' }} />}
          title="Proxmox"
          description="Connect to Proxmox dashboard"
          buttonText="Connect"
          onClick={handleProxmoxConnect} // Appel de la fonction de login et redirection
        />
        <CustomCard
          icon={<FaServer style={{ fontSize: '2rem', color: '#3664AD' }} />}
          title="Terraform"
          description="Infrastructure as Code"
          buttonText="Deploy"
          onClick={() => alert('Terraform Deploy')}
        />
      </div>
    </div>
  );
};

export default Dashboard;
