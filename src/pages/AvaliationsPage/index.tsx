import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { VessButton } from "../../components/VessButton";
import SchoolIcon from '@mui/icons-material/School';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';

export const AvaliationsPage = () => {

     const navigate = useNavigate();

    const handleNavigateToNewAvaliation = () => {
        navigate('/new-avaliation');
    };

    const handleNavigateToHistory = () => {
        navigate('/avaliations-history');
    }

    const handleBackToMainMenu = () => {
        navigate('/home');
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
                {/* Container horizontal p/ título + logo */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        mb: 4,          // espaço abaixo
                        flexWrap: 'wrap' // quebra em mobiles se quiser
                    }}
                >
                    <Typography variant="h4" fontWeight="bold">
                        AVALIAÇÕES
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
                    <VessButton variant="contained"  startIcon={<AddCircleOutlineIcon/>} onClick={handleNavigateToNewAvaliation} fullWidth sx={{paddingTop: '30px', paddingBottom:'30px'}}>Nova Avaliação</VessButton>
                    <VessButton variant="contained" startIcon={<HistoryIcon/>} onClick={handleNavigateToHistory} sx={{paddingTop: '30px', paddingBottom:'30px'}} fullWidth>Histórico</VessButton>
                    <VessButton variant="contained" startIcon={<SchoolIcon/>} onClick={handleNavigateToHistory} sx={{paddingTop: '30px', paddingBottom:'30px'}} fullWidth>Tutorial</VessButton>
                </Box>
                <Box alignContent='center' sx={{mt: 2}}>

                <VessButton variant="contained" startIcon={<ReplyAllIcon/>} onClick={handleBackToMainMenu} sx={{ width: '120px'}}>Voltar</VessButton>

                </Box>
            </Box>
        </Box>
    );
}