import { Box, Typography } from "@mui/material";
import { VessButton } from "../../components/VessButton";
import AssignmentIcon from '@mui/icons-material/Assignment';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";

export const HomePage = () => {

    const navigate = useNavigate();

    const handleNavigateToAvaliations = () => {
        navigate('/avaliations');
    };

    const handleNavigateToConfigs = () => {
        navigate('/configs');
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(180deg, #f2e2b3 0%, rgb(255, 223, 163) 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: { xs: '90%', sm: '600px', md: '400px' },
                    width: { xs: '90%', sm: '600px', md: '800px' },
                    backdropFilter: 'blur(15px) saturate(180%)',
                    backgroundColor: 'rgba(80, 27, 0, 0.66)',
                    borderRadius: 2,
                    boxShadow: 3,
                    p: { xs: 2, sm: 4, md: 10 },
                    color: 'white',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        mb: 4,
                        flexWrap: 'wrap'
                    }}
                >
                    <Typography variant="h4" fontWeight="bold">
                        MENU PRINCIPAL
                    </Typography>
                    <Box
                        component="img"
                        src="src/assets/vess-logo.png"
                        alt="Logo VESS"
                        sx={{
                            height: 50,
                            width: 'auto',
                            objectFit: 'contain',
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'center',
                        mt: 4,
                    }}
                >
                    <VessButton variant="contained" startIcon={<AssignmentIcon/>} onClick={handleNavigateToAvaliations} fullWidth sx={{paddingTop: '30px', paddingBottom:'30px'}}>Minhas Avaliações</VessButton>
                    <VessButton variant="contained" startIcon={<EngineeringIcon/>} onClick={handleNavigateToConfigs} sx={{paddingTop: '30px', paddingBottom:'30px'}} fullWidth>Configurações</VessButton>
                    

                </Box>
                <Box>

                <VessButton variant="contained" startIcon={<LogoutIcon/>} onClick={logout} sx={{ mt: '7.1rem', width: '100px'}}>Sair</VessButton>

                </Box>
            </Box>
        </Box>
    );
};
