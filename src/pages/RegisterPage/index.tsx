import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VessTextField } from "../../components/VessTextField";
import { VessButton } from "../../components/VessButton";
import { notifyError, notifySuccess } from "../../components/Toasts";
import { signUp } from "../../services/AuthService";

export const RegisterPage = () => {

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        country: '',
        address: '',
        language: ''
    });

    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const signUpData = {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        country: credentials.country,
        address: credentials.address,
        language: credentials.language
    };

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        const response = await signUp(signUpData);

        if(response.status === 201){

            notifySuccess('Usuário criado com sucesso! Realize o login');

            navigate('/login')

        }
        else{

            notifyError('Falha ao realizar o cadastro!');

        }

    };

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
                    overflowY: 'auto',
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
                        height: { xs: 1, md: 'auto' },
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
                        gap: { xs: 1, md: 2 },
                    }}
                >
                    <VessTextField
                        name="name"
                        label="Nome Completo"
                        value={credentials.name}
                        onChange={handleChange}
                    />

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

                    <VessTextField
                        name="country"
                        label="País"
                        value={credentials.country}
                        onChange={handleChange}
                    />

                    <VessTextField
                        name="address"
                        label="Endereço"
                        value={credentials.address}
                        onChange={handleChange}
                    />

                    <VessTextField
                        name="language"
                        label="Linguagem"
                        value={credentials.language}
                        onChange={handleChange}
                    />

                    <VessButton
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Registrar
                    </VessButton>

                </Box>
            </Box>
        </Box>
    );

}