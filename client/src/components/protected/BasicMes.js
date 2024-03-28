import React from 'react';
import { Alert, Button, Container, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';

const BasicMes = () => {
    const { dispatch } = useValue();

    return (
        <Container
            sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <Alert
                severity="error"
                variant="outlined"
                sx={{ width: '100%', textAlign: 'center', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', flexDirection: 'column', alignItems: 'center' }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Only verified sellers can place a listing
                </Typography>
                <Typography variant="body1" gutterBottom>
                    You must be a verified seller to place a listing.
                </Typography>
                <Typography variant="h8" gutterBottom sx={{ fontWeight: 400 }}>
                    Please contact team@thegeardepo.com
                </Typography>
            </Alert>
        </Container>
    );
}

export default BasicMes