import React, { useState } from 'react';
import { Modal, Paper, Typography, TextField, Grid, Box, Button, MenuItem, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Editor from '@monaco-editor/react';
import yaml from 'js-yaml';

const CreatePlaybook = ({ open, onClose, onSave }) => {
  const [newPlaybook, setNewPlaybook] = useState({
    name: '',
    description: '',
    hosts: '',
    tasks: [{ name: '', module: '', args: '' }],
    variables: [{ name: '', value: '' }]
  });

  const [playbookContent, setPlaybookContent] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlaybook((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...newPlaybook.tasks];
    updatedTasks[index][field] = value;
    setNewPlaybook((prev) => ({ ...prev, tasks: updatedTasks }));
  };

  const handleAddTask = () => {
    setNewPlaybook((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { name: '', module: '', args: '' }],
    }));
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...newPlaybook.tasks];
    updatedTasks.splice(index, 1);
    setNewPlaybook((prev) => ({ ...prev, tasks: updatedTasks }));
  };

  const handleVariableChange = (index, field, value) => {
    const updatedVariables = [...newPlaybook.variables];
    updatedVariables[index][field] = value;
    setNewPlaybook((prev) => ({ ...prev, variables: updatedVariables }));
  };

  const handleAddVariable = () => {
    setNewPlaybook((prev) => ({
      ...prev,
      variables: [...prev.variables, { name: '', value: '' }],
    }));
  };

  const handleRemoveVariable = (index) => {
    const updatedVariables = [...newPlaybook.variables];
    updatedVariables.splice(index, 1);
    setNewPlaybook((prev) => ({ ...prev, variables: updatedVariables }));
  };

  const handleGenerateYaml = () => {
    const yamlContent = yaml.dump({
      name: newPlaybook.name,
      description: newPlaybook.description,
      hosts: newPlaybook.hosts,
      tasks: newPlaybook.tasks.map((task) => ({
        name: task.name,
        module: task.module,
        args: task.args,
      })),
      vars: newPlaybook.variables.reduce((acc, variable) => {
        acc[variable.name] = variable.value;
        return acc;
      }, {}),
    });
    setPlaybookContent(yamlContent);
    setIsFormSubmitted(true);
  };

  const handleSave = () => {
    onSave(newPlaybook.name, playbookContent);
    setIsFormSubmitted(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ p: 3, maxWidth: 800, margin: 'auto', marginTop: '5%', maxHeight: '80vh', overflowY: 'auto' }}>
        <Typography variant="h6" gutterBottom>Créer Nouveau Playbook</Typography>
        {!isFormSubmitted ? (
          <>
            <TextField
              label="Nom du Playbook"
              fullWidth
              margin="normal"
              name="name"
              value={newPlaybook.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              name="description"
              value={newPlaybook.description}
              onChange={handleChange}
            />
            <TextField
              label="Hôtes"
              fullWidth
              margin="normal"
              name="hosts"
              value={newPlaybook.hosts}
              onChange={handleChange}
              required
            />
            <Typography variant="h6" sx={{ mt: 2 }}>Tâches</Typography>
            {newPlaybook.tasks.map((task, index) => (
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
            {newPlaybook.variables.map((variable, index) => (
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
              value={playbookContent}
              onChange={(value) => setPlaybookContent(value)}
            />
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Créer Playbook
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default CreatePlaybook;
