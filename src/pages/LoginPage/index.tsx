import { useContext, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { VessTextField } from '../../components/VessTextField';
import { VessButton } from '../../components/VessButton';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../../components/Toasts';
import type { ISignIn } from '../../interfaces/user.interfaces';
import { signIn, signInWithGoogle } from '../../services/AuthService';
import { UserContext } from '../../contexts/UserContext';
import { GoogleLogin } from '@react-oauth/google';



export const LoginPage = () => {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { setIsAuthenticated } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const sigInData: ISignIn = {
    email: credentials.email,
    password: credentials.password,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {

      const response = await signIn(sigInData);

      if (response.status === 200) {

        notifySuccess('Sucesso ao logar!');

        setIsAuthenticated(true);

        setTimeout(() => navigate('/tutorial', { replace: true }), 0);

      } else {

        notifyError('Erro ao logar, verifique as credenciais!');

      }



    }
    catch {

      alert('login sem sucesso')
    }

  };

  const handleRedirectToRegister = () => {

    navigate('/signup');

  }



  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(180deg, #f2e2b3 0%,rgb(255, 223, 163) 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          backdropFilter: 'blur(15px) saturate(180%)',
          backgroundColor: 'rgba(80, 27, 0, 0.66)',
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 2, sm: 4, md: 10 },
          width: { xs: '90%', sm: '600px', md: '800px' },
          height: { xs: '90%', sm: '600px', md: '400px' },
          maxHeight: '90vh',
          color: 'white',
          gap: { xs: 2, md: 4 }
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            component="img"
            src="src/assets/vess-logo.png"
            alt="Logo VESS"
            sx={{
              maxWidth: '100%',
              maxHeight: '300px',
              objectFit: 'contain',
            }}
          />

        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: '2px' },
            height: { xs: 0, md: 'auto' },
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            alignSelf: { xs: 'stretch', md: 'auto' },
            background: 'linear-gradient(180deg, #f2e2b3 0%,rgb(255, 223, 163) 100%)'
          }}
        />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: { xs: 2, md: 2 },
          }}
        >
          <VessTextField
            name="email"
            label="E-mail"
            value={credentials.email}
            onChange={handleChange}
          />

          <VessTextField
            name="password"
            type="password"
            label="Senha"
            value={credentials.password}
            onChange={handleChange}
          />

          <VessButton
            type="submit"
            variant="contained"
            fullWidth
          >
            Entrar
          </VessButton>
          <Box alignContent='center' alignItems='center' marginLeft='auto' marginRight='auto'>
            <GoogleLogin
              onSuccess={credentialResponse => {
                if (!credentialResponse.credential) {
                  notifyError('Falha ao receber credencial Google');
                  return;
                }
                signInWithGoogle({ idToken: credentialResponse.credential })
                  .then(res => {
                    if (res.status === 200) {
                      notifySuccess('Logado com Google!');
                      setIsAuthenticated(true);
                      setTimeout(() => navigate('/tutorial', { replace: true }), 0);
                    } else {
                      notifyError('Erro no login Google');
                    }
                  })
                  .catch(() => notifyError('Erro inesperado ao logar com Google'));
              }}
              onError={() => {
                notifyError('Login Google cancelado ou falhou');
              }}
            />
          </Box>

          <Typography onClick={handleRedirectToRegister} variant="body2" sx={{ textAlign: 'center', cursor: 'pointer' }}>
            Não possui uma conta? Registre-se
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};