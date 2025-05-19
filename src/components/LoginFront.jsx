// src/components/LoginFront.jsx

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

export default function LoginFront() {
  const { isFront, loginFront, logoutFront, idioma } = useActua();
  const ui = textos[idioma].ui;

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!password) {
      setError(ui.frontErrorEmpty || 'Introduce la contraseña');
      return;
    }
    try {
      await loginFront(password);
      setPassword('');
    } catch (err) {
      setError(err.message || ui.frontErrorInvalid || 'Contraseña incorrecta');
    }
  };

  return (
    <Dialog open={!isFront} disableEscapeKeyDown fullWidth maxWidth="xs">
      <DialogTitle>{ui.frontTitle || 'Acceso a la aplicación'}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label={ui.frontLabel || 'Contraseña'}
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={logoutFront}>
          {ui.frontCancel || 'Volver'}
        </Button>
        <Button variant="contained" onClick={handleLogin}>
          {ui.frontAccess || 'Acceder'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
