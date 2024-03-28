import { Close, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import PasswordField from './PasswordField';
import { login, register } from '../../actions/user';

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!isRegister) return login({ email, password }, dispatch);

    const name = nameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Passwords do not match',
        },
      });
    }
    register({ name, email, password }, dispatch);
  };

  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);

  return (
    <Dialog open={openLogin} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {title}
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
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && (
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
              sx={{ mb: 2 }}
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="outlined"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
            sx={{ mb: 2 }}
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: '24px', py: '16px' }}>
          <Button
            type="submit"
            variant="contained"
            endIcon={<Send />}
            fullWidth
            size="large"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'center', py: '16px' }}>
        <Typography variant="body2">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <Button onClick={() => setIsRegister(!isRegister)} color="primary">
            {isRegister ? 'Login' : 'Register'}
          </Button>
        </Typography>
      </DialogActions>
      <DialogActions sx={{ justifyContent: 'center', pb: '16px' }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
