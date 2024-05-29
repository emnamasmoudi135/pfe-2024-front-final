import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import terraformService from 'src/services/terraformService';
import Editor from '@monaco-editor/react';

const Terraform = () => {
  const [initOpen, setInitOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [destroyOpen, setDestroyOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [terraformConfig, setTerraformConfig] = useState('');

  useEffect(() => {
    if (editorOpen) {
      terraformService.getConfig().then(response => {
        if (response.success) {
          setTerraformConfig(response.content);
        } else {
          alert('Failed to load Terraform configuration');
        }
      });
    }
  }, [editorOpen]);

  const handleInit = async () => {
    const result = await terraformService.init();
    alert(result);
  };

  const handleApply = async () => {
    const result = await terraformService.apply();
    alert(result);
  };

  const handleDestroy = async () => {
    const result = await terraformService.destroy();
    alert(result);
  };

  const handleSaveConfig = async () => {
    const result = await terraformService.updateConfig(terraformConfig);
    if (result.success) {
      alert('Configuration saved successfully');
      setEditorOpen(false);
    } else {
      alert('Failed to save configuration');
    }
  };

  const buttonColor = '#3664AD';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Terraform
      </Typography>
      <Button variant="outlined" sx={{ mb: 4, color: buttonColor, borderColor: buttonColor, '&:hover': { backgroundColor: buttonColor, color: 'white' } }} onClick={() => setEditorOpen(true)}>
        Customize Your Infrastructure
      </Button>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Card sx={{ maxWidth: 345, borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BuildIcon sx={{ fontSize: 40, mb: 2, color: buttonColor }} />
            <Typography variant="h5" component="div">
              Terraform Init
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Initialize a new or existing Terraform configuration.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: buttonColor, color: 'white', '&:hover': { backgroundColor: buttonColor } }}
              onClick={handleInit}
            >
              Init
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PlayArrowIcon sx={{ fontSize: 40, mb: 2, color: buttonColor }} />
            <Typography variant="h5" component="div">
              Terraform Apply
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Apply the changes required to reach the desired state.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: buttonColor, color: 'white', '&:hover': { backgroundColor: buttonColor } }}
              onClick={handleApply}
            >
              Apply
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DeleteIcon sx={{ fontSize: 40, mb: 2, color: buttonColor }} />
            <Typography variant="h5" component="div">
              Terraform Destroy
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Destroy the Terraform-managed infrastructure.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: buttonColor, color: 'white', '&:hover': { backgroundColor: buttonColor } }}
              onClick={handleDestroy}
            >
              Destroy
            </Button>
          </CardActions>
        </Card>
      </Box>

      <Dialog open={editorOpen} onClose={() => setEditorOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Terraform File</DialogTitle>
        <DialogContent>
          <Editor
            height="400px"
            defaultLanguage="hcl"
            value={terraformConfig}
            onChange={(value) => setTerraformConfig(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditorOpen(false)} sx={{ color: buttonColor }}>
            Cancel
          </Button>
          <Button onClick={handleSaveConfig} sx={{ color: buttonColor }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Terraform;
