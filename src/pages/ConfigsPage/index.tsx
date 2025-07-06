import { Box} from "@mui/material";
import { VessTextField } from "../../components/VessTextField";
import { VessButton } from "../../components/VessButton";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IUserConfig} from "../../interfaces/user.interfaces";
import { api } from "../../lib/axios";
import { UserContext } from "../../contexts/UserContext";
import { notifyError, notifySuccess } from "../../components/Toasts";
import { UserUpdateModal } from "../../components/UserUpdateModal";

export const ConfigsPage = () => {

    const [user, setUser] = useState<IUserConfig>({
        name: '',
        email: '',
        country: '',
        address: '',
        language: '',
        password: '',
    });
    const userContext = useContext(UserContext)!;
    const { userId } = userContext;
    const navigate = useNavigate();
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

    const userData: IUserConfig = {
        name: user.name,
        country: user.country,
        address: user.address,
        language: user.language,
        password: user.password
    };


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleNavigateToMainMenu = () => {

        navigate('/home');

    };

    const handleCloseUpdateModal = () => {

        setOpenUpdateModal(false);

    };

    const handleOpenUpdateModal = () => {

        setOpenUpdateModal(true);

    }

    const getUser = async () => {

        try {

            const response = await api.get(`/user-config/find-by-id/${userId}`);

            setUser(response?.data);

        }
        catch (error) {
            notifyError('Não foi possível obter as informações de usuário!');
        }
    }

    const updateUser = async () => {

        try{

            const response = await api.patch(`/user-config/update/${userId}`, userData);

            const responseMessage = response?.data?.message;

           

            notifySuccess(responseMessage);

        }
        catch(error:any){

            notifyError(error?.message);

        }
        finally{
             handleCloseUpdateModal();
        }
    }

    useEffect(() => {

            getUser()

    }, []);

    
    const handleSubmit = async (e: any) => {

        e.preventDefault();

        await updateUser();

    };

    return (

        <>

         {openUpdateModal && (

                <UserUpdateModal
                onClick={handleSubmit}
                onClose={handleCloseUpdateModal}
                open={openUpdateModal}
                />

            )

            }

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

                <Box sx={{
                    width: '70%',
                    alignContent: 'center',
                    marginRight: 'auto',
                    marginLeft: 'auto'
                }}>

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
                            name="email"
                            label="E-mail"
                            disabled={true}
                            value={user.email}
                            onChange={handleChange}
                        />
                        
                        <VessTextField
                            name="name"
                            label="Nome Completo"
                            value={user.name}
                            onChange={handleChange}
                        />

                        <VessTextField
                            name="country"
                            label="País"
                            value={user.country}
                            onChange={handleChange}
                        />

                        <VessTextField
                            name="address"
                            label="Endereço"
                            value={user.address}
                            onChange={handleChange}
                        />

                        <VessTextField
                            name="language"
                            label="Linguagem"
                            value={user.language}
                            onChange={handleChange}
                        />

                         <VessTextField
                            name="password"
                            label="Senha"
                            placeholder="Digite apenas se quiser atualizar sua senha"
                            value={user.password}
                            onChange={handleChange}
                        />

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <VessButton
                                type="button"
                                variant="contained"
                                onClick={handleNavigateToMainMenu}
                            >
                                Voltar
                            </VessButton>

                            <VessButton
                                type="button"
                                variant="contained"
                                onClick={handleOpenUpdateModal}
                            >
                                Atualizar Informações
                            </VessButton>
                        </Box>


                    </Box>
                </Box>
            </Box>
        </Box>
        </>
    );
}