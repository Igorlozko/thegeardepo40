import React, { useRef } from 'react';
import { useValue } from '../../context/ContextProvider';
import { Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import { updateProfile } from '../../actions/user';

const Profile = () => {
    const { state: { profile, currentUser }, dispatch } = useValue();
    const nameRef = useRef();

    const handleClose = () => {
        dispatch({ type: 'UPDATE_PROFILE', payload: { ...profile, open: false } });
    };

    const handleChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const photoURL = URL.createObjectURL(file);
            dispatch({
                type: 'UPDATE_PROFILE',
                payload: { ...profile, file: file, photoURL: photoURL },
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        updateProfile(currentUser, { name, file: profile.file }, dispatch);
    };

    return (
        <Dialog open={profile.open} onClose={handleClose}>
            <DialogTitle>
                <Typography variant="h6" component="div">Profile</Typography>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <DialogContentText>
                        Update your profile by updating the fields:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        variant="outlined"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        inputRef={nameRef}
                        inputProps={{ minLength: 2 }}
                        required
                        defaultValue={currentUser?.name}
                        disabled // Disable the input field for the name
                    />
                    <label htmlFor='profilePhoto'>
                        <input
                            accept='image/*'
                            id='profilePhoto'
                            type='file'
                            style={{ display: 'none' }}
                            onChange={handleChange}
                        />
                        <Avatar
                            src={profile.photoURL}
                            sx={{ width: 75, height: 75, cursor: 'pointer', margin: '16px auto' }}
                        />
                    </label>
                </DialogContent>
                <DialogActions sx={{ px: '19px', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        endIcon={<Send />}
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            letterSpacing: '1px',
                            borderRadius: '4px',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default Profile;
