import { Modal, Paper, Typography, Box, Button, TextField, Grid, MenuItem, IconButton } from '@mui/material';
import Editor from '@monaco-editor/react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import yaml from 'js-yaml';

const EditPlaybook = ({ open, onClose, playbookContent, onSave }) => {
  const [content, setContent] = useState(playbookContent);
  const [isFormModified, setIsFormModified] = useState(false);
  const [playbook, setPlaybook] = useState({
    name: '',
    description: '',
    hosts: '',
    tasks: [{ name: '', module: '', args: '' }],
    variables: [{ name: '', value: '' }]
  });

  useEffect(() => {
    if (playbookContent) {
      const parsedContent = yaml.load(playbookContent);
      setPlaybook({
        name: parsedContent.name || '',
        description: parsedContent.description || '',
        hosts: parsedContent.hosts || '',
        tasks: parsedContent.tasks.map(task => ({
          name: task.name || '',
          module: task.module || '',
          args: task.args || ''
        })),
        variables: Object.entries(parsedContent.vars || {}).map(([name, value]) => ({ name, value }))
      });
      setContent(playbookContent);
    }
  }, [playbookContent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaybook((prev) => ({ ...prev, [name]: value }));
    setIsFormModified(true);
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...playbook.tasks];
    updatedTasks[index][field] = value;
    setPlaybook((prev) => ({ ...prev, tasks: updatedTasks }));
    setIsFormModified(true);
  };

  const handleAddTask = () => {
    setPlaybook((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { name: '', module: '', args: '' }],
    }));
    setIsFormModified(true);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...playbook.tasks];
    updatedTasks.splice(index, 1);
    setPlaybook((prev) => ({ ...prev, tasks: updatedTasks }));
    setIsFormModified(true);
  };

  const handleVariableChange = (index, field, value) => {
    const updatedVariables = [...playbook.variables];
    updatedVariables[index][field] = value;
    setPlaybook((prev) => ({ ...prev, variables: updatedVariables }));
    setIsFormModified(true);
  };

  const handleAddVariable = () => {
    setPlaybook((prev) => ({
      ...prev,
      variables: [...prev.variables, { name: '', value: '' }],
    }));
    setIsFormModified(true);
  };

  const handleRemoveVariable = (index) => {
    const updatedVariables = [...playbook.variables];
    updatedVariables.splice(index, 1);
    setPlaybook((prev) => ({ ...prev, variables: updatedVariables }));
    setIsFormModified(true);
  };

  const handleGenerateYaml = () => {
    const yamlContent = yaml.dump({
      name: playbook.name,
      description: playbook.description,
      hosts: playbook.hosts,
      tasks: playbook.tasks.map((task) => ({
        name: task.name,
        module: task.module,
        args: task.args,
      })),
      vars: playbook.variables.reduce((acc, variable) => {
        acc[variable.name] = variable.value;
        return acc;
      }, {}),
    });
    setContent(yamlContent);
    setIsFormModified(false);
  };

  const handleSave = async () => {
    try {
      await onSave(content);
      toast.success('Playbook updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Error updating playbook');
      console.error('Error updating playbook:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ p: 3, maxWidth: 800, margin: 'auto', marginTop: '5%', maxHeight: '80vh', overflowY: 'auto' }}>
        <Typography variant="h6" gutterBottom>Modifier Playbook</Typography>
        {!isFormModified ? (
          <>
            <TextField
              label="Nom du Playbook"
              fullWidth
              margin="normal"
              name="name"
              value={playbook.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              name="description"
              value={playbook.description}
              onChange={handleChange}
            />
            <TextField
              label="Hôtes"
              fullWidth
              margin="normal"
              name="hosts"
              value={playbook.hosts}
              onChange={handleChange}
              required
            />
            <Typography variant="h6" sx={{ mt: 2 }}>Tâches</Typography>
            {playbook.tasks.map((task, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <TextField
                      label="Nom de la Tâche"
                      fullWidth
                      value={task.name}
                      onChange={(e) => handleTaskChange(index, 'name', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Module Ansible"
                      select
                      fullWidth
                      value={task.module}
                      onChange={(e) => handleTaskChange(index, 'module', e.target.value)}
                      required
                    >
                      <MenuItem value="ansible.builtin.package">ansible.builtin.package</MenuItem>
                      <MenuItem value="ansible.builtin.service">ansible.builtin.service</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Arguments"
                      fullWidth
                      value={task.args}
                      onChange={(e) => handleTaskChange(index, 'args', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => handleRemoveTask(index)}>
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={handleAddTask}>
              Ajouter une Tâche
            </Button>

            <Typography variant="h6" sx={{ mt: 2 }}>Variables</Typography>
            {playbook.variables.map((variable, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      label="Nom de la Variable"
                      fullWidth
                      value={variable.name}
                      onChange={(e) => handleVariableChange(index, 'name', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="Valeur de la Variable"
                      fullWidth
                      value={variable.value}
                      onChange={(e) => handleVariableChange(index, 'value', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => handleRemoveVariable(index)}>
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={handleAddVariable}>
              Ajouter une Variable
            </Button>

            <Box sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleGenerateYaml} sx={{ mr: 2 }}>
                Générer YAML
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Éditeur de Playbook YAML</Typography>
            <Editor
              height="400px"
              defaultLanguage="yaml"
              value={content}
              onChange={(value) => setContent(value)}
            />
            <Box mt={2}>
              <Button variant="contained" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
                Annuler
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave} sx={{ ml: 2 }}>
                Sauvegarder
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default EditPlaybook;
