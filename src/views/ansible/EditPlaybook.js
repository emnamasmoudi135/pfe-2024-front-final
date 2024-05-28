import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnsibleService from 'src/services/ansibleService';
import { Paper, Typography, Box, Button, TextField } from '@mui/material';
import yaml from 'js-yaml';

const EditPlaybook = () => {
  const { name, editType } = useParams();
  const [playbook, setPlaybook] = useState(null);
  const [formFields, setFormFields] = useState({});
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaybook = async () => {
      try {
        const data = await AnsibleService.getPlaybookDetail(name);
        if (data[0] && data[1]) {
          setPlaybook(data[1]);
          setNewContent(yaml.dump(data[1]));
          setError(null);
          setFormFields(data[1]);
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

  const handleSave = async () => {
    try {
      let updatedContent;
      if (editType === 'fields') {
        updatedContent = yaml.dump(formFields);
      } else {
        updatedContent = newContent;
        // Parse YAML content to ensure it's valid and update formFields for consistency
        setFormFields(yaml.load(newContent));
      }
      await AnsibleService.updatePlaybook(name, updatedContent);
      navigate(`/playbook/${name}`);
    } catch (error) {
      setError('Error updating playbook');
      console.error('Error updating playbook:', error);
    }
  };

  const handleFieldChange = (e, key) => {
    const value = e.target.value;
    const keys = key.split('.');
    setFormFields((prevFields) => {
      const newFields = { ...prevFields };
      let current = newFields;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newFields;
    });
  };

  const renderFields = (fields, parentKey = '') => {
    return Object.keys(fields).map((key) => {
      const fieldKey = parentKey ? `${parentKey}.${key}` : key;
      const value = fields[key];
      if (value === null || value === undefined) {
        return null;
      }
      if (Array.isArray(value)) {
        return (
          <Box key={fieldKey} sx={{ mt: 2 }}>
            <Typography variant="h6">{key}</Typography>
            {value.map((item, index) => renderFields(item, `${fieldKey}[${index}]`))}
          </Box>
        );
      }
      if (typeof value === 'object') {
        return (
          <Box key={fieldKey} sx={{ mt: 2 }}>
            <Typography variant="h6">{key}</Typography>
            {renderFields(value, fieldKey)}
          </Box>
        );
      }
      return (
        <TextField
          key={fieldKey}
          label={key}
          value={value}
          onChange={(e) => handleFieldChange(e, fieldKey)}
          fullWidth
          margin="normal"
        />
      );
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!playbook) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ p: 3, borderRadius: '15px' }}>
      <Typography variant="h4" gutterBottom>Edit Playbook: {name}</Typography>
      {editType === 'fields' ? (
        <Box component="form">
          {renderFields(formFields)}
        </Box>
      ) : (
        <TextField
          label="Playbook Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          fullWidth
          multiline
          rows={20}
          margin="normal"
        />
      )}
      <Button onClick={handleSave}>Save</Button>
    </Paper>
  );
};

export default EditPlaybook;
