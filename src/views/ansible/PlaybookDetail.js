import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnsibleService from 'src/services/ansibleService';
import { Paper, Typography, Box, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import yaml from 'js-yaml';

const PlaybookDetail = () => {
  const { name } = useParams();
  const [playbook, setPlaybook] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaybook = async () => {
      try {
        const data = await AnsibleService.getPlaybookDetail(name);
        if (data[0] && data[1]) {
          setPlaybook(data[1]);
          setError(null);
        } else {
          setError('Failed to fetch playbook details');
          console.error('Failed to fetch playbook details:', data[2]);
        }
      } catch (error) {
        setError('Error fetching playbook');
        console.error('Error fetching playbook:', error);
      }
    };

    fetchPlaybook();
  }, [name]);

  const handleEditWithField = () => {
    navigate(`/edit-playbook/fields/${name}`);
  };

  const handleEditWithYaml = () => {
    navigate(`/edit-playbook/yaml/${name}`);
  };

  const handleBack = () => {
    navigate('/ansible');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!playbook) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <IconButton onClick={handleBack} sx={{ color: '#3664AD', mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Paper sx={{ p: 3, borderRadius: '15px' }}>
        <Typography variant="h4" gutterBottom>Playbook: {name}</Typography>
        <Box>
          <pre>{yaml.dump(playbook)}</pre>
        </Box>
        <Button onClick={handleEditWithField}>Edit with Field</Button>
        <Button onClick={handleEditWithYaml}>Edit with YAML</Button>
      </Paper>
    </Box>
  );
};

export default PlaybookDetail;
