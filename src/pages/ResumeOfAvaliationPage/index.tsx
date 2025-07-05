import { Box, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { VessButton } from "../../components/VessButton";

export const ResumeOfAvaliation = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const resume = {
        title: `Avaliação de Exemplo ${id}`,
        management_decision: 'Aguardando decisão',
        summary: 'Esta é uma avaliação de exemplo para demonstrar o layout.',
        scores: [
            { id: 1, score: 85 },
            { id: 2, score: 90 },
            { id: 3, score: 78 },
            { id: 4, score: 92 },
            { id: 5, score: 88 }
        ]
    };

    //utils

    const handleNavigateToAvaliations = () => {

        navigate('/avaliations');

    };

    const handleNavigateToNewAvaliation = () => {

        navigate('/new-avaliation');

    };

    const averageScore =
        resume.scores.reduce((sum, item) => sum + item.score, 0) /
        resume.scores.length;

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(180deg, #f2e2b3 0%,  #ffdfa3 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: { xs: '90%', sm: '600px', md: '530px' },
                    width: { xs: '90%', sm: '600px', md: '800px' },
                    backdropFilter: 'blur(15px) saturate(180%)',
                    backgroundColor: 'rgba(80, 27, 0, 0.66)',
                    borderRadius: 2,
                    boxShadow: 3,
                    p: { xs: 2, sm: 4, md: 10 },
                    color: 'white',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        overflowY: 'auto',
                        flexGrow: 1,
                        minHeight: 0,
                        '&::-webkit-scrollbar': { width: '10px' },
                        '&::-webkit-scrollbar-track': { background: 'transparent' },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                            borderRadius: '4px'
                        },
                        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'black' },
                        scrollbarColor: 'rgba(0, 0, 0, 0.66) transparent',
                    }}
                >
                    {/* Título */}
                    <Typography variant="h4" component="h1">
                        {resume.title}
                    </Typography>

                    {/* Campos de texto somente leitura */}
                    <TextField
                        label="Decisão de Gestão"
                        value={resume.management_decision}
                        fullWidth
                        variant="filled"
                        sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
                    />
                    <TextField
                        label="Sumário"
                        value={resume.summary}
                        fullWidth
                        multiline
                        variant="filled"
                        sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
                    />

                    <Box>
                        {resume.scores.map(item => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    p: 1,
                                    mb: 1,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    borderRadius: 1
                                }}
                            >
                                <Typography>Amostra #{item.id}</Typography>
                                <Typography fontWeight="bold">{item.score}</Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Score médio */}
                    <Box sx={{ mt: 2, textAlign: 'right' }}>
                        <Typography variant="h6">
                            Score Médio: {averageScore.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>

                <Box display={'flex'} justifyContent="space-between" mt={2}>
                    <VessButton onClick={handleNavigateToAvaliations}>Finalizar</VessButton>
                    <VessButton onClick={handleNavigateToNewAvaliation}>Nova Avaliação</VessButton>
                </Box>

            </Box>
        </Box>
    );
};
