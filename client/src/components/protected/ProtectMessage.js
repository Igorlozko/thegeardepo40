import React from 'react';
import { Alert, Button, Container, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';

const ProtectMessage = () => {
  const { dispatch } = useValue();

  return (
    <Container
      sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center',}}
    >
      <Alert
        severity="error"
        variant="outlined"
        sx={{  width: '100%', textAlign: 'center', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',flexDirection: 'column',alignItems: 'center',  }}  // Horizontal alignment }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          No access allowed
        </Typography>
        <Typography variant="body1" gutterBottom>
          Login or Register 
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Lock />}
          onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
          sx={{ mt: 2, }}
        >
          Login
        </Button>
      </Alert>
    </Container>
  );
};

export default ProtectMessage;
