import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnsibleService from '../services/ansibleService';
import { Paper, Typography, Box, TextField, Button } from '@mui/material';
import { Formik, Form, FieldArray, Field } from 'formik';
import yaml from 'js-yaml';

const PlaybookDetail = () => {
  const { name } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaybook = async () => {
      try {
        const data = await AnsibleService.getPlaybookDetail(name);
        if (data[0] && data[1]) {
          setInitialValues({ playbook: data[1] });
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

  const handleSave = async (values) => {
    try {
      const yamlContent = yaml.dump(values.playbook);
      const result = await AnsibleService.updatePlaybook(name, yamlContent);
      if (result.message) {
        alert('Playbook updated successfully!');
        setEditMode(false);
      } else {
        alert(`Failed to update playbook: ${result.error}`);
      }
    } catch (error) {
      console.error('Error updating playbook:', error);
      alert('An error occurred while updating the playbook.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  const renderFields = (task, index, handleChange) => {
    return Object.keys(task).map((key) => {
      if (key === 'name') {
        return (
          <Field
            key={`${index}-${key}`}
            name={`playbook.tasks[${index}].${key}`}
            placeholder="Task Name"
            as={TextField}
            fullWidth
            margin="normal"
            value={task[key] || ''}
            onChange={handleChange}
          />
        );
      }
      if (typeof task[key] === 'object') {
        return Object.keys(task[key]).map((subKey) => (
          <Field
            key={`${index}-${key}-${subKey}`}
            name={`playbook.tasks[${index}].${key}.${subKey}`}
            placeholder={`${key} ${subKey}`}
            as={TextField}
            fullWidth
            margin="normal"
            value={task[key][subKey] || ''}
            onChange={handleChange}
          />
        ));
      }
      return (
        <Field
          key={`${index}-${key}`}
          name={`playbook.tasks[${index}].${key}`}
          placeholder={key}
          as={TextField}
          fullWidth
          margin="normal"
          value={task[key] || ''}
          onChange={handleChange}
        />
      );
    });
  };

  return (
    <Paper sx={{ p: 3, borderRadius: '15px' }}>
      <Typography variant="h4" gutterBottom>Playbook: {name}</Typography>
      <Box>
        {editMode ? (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSave}
            enableReinitialize={true}
          >
            {({ values, handleChange }) => (
              <Form>
                {values.playbook && (
                  <>
                    <Field
                      name="playbook.name"
                      placeholder="Playbook Name"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      value={values.playbook.name || ''}
                      onChange={handleChange}
                    />
                    <Field
                      name="playbook.hosts"
                      placeholder="Hosts"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      value={values.playbook.hosts || ''}
                      onChange={handleChange}
                    />
                    <Field
                      name="playbook.become"
                      placeholder="Become"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      value={values.playbook.become || ''}
                      onChange={handleChange}
                    />
                    <FieldArray name="playbook.tasks">
                      {() => (
                        <div>
                          {values.playbook.tasks &&
                            values.playbook.tasks.length > 0 &&
                            values.playbook.tasks.map((task, index) => (
                              <div key={index}>
                                {renderFields(task, index, handleChange)}
                              </div>
                            ))}
                        </div>
                      )}
                    </FieldArray>
                  </>
                )}
                <Button type="submit" variant="contained" color="primary">
                  Save Playbook
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <pre>{yaml.dump(initialValues.playbook)}</pre>
        )}
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PlaybookDetail;
