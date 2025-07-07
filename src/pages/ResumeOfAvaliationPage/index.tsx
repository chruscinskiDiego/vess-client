import { Box, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { VessButton } from "../../components/VessButton";
import { VessTextField } from "../../components/VessTextField";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

export const ResumeOfAvaliation = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    type Sample = {
        id: number;
        score: string;
        scoreColor: string;
        managementDecision: string;
        resume: string;
    };

    type ResumeOfAvaliationType = {
        title: string;
        summary: string;
        infos: string;
        generalResume: string;
        samples: Sample[];
    };

    const [resumeOfAvaliation, setResumeOfAvaliation] = useState<ResumeOfAvaliationType>({
        title: '',
        summary: '',
        infos: '',
        generalResume: '',
        samples: []
    });


    const getAvaliationResume = useCallback(async () => {
        try {

            const { data } = await api.get(`/avaliation/${id}`);
  
            const rawSamples = data.sampleAvaliations ?? [];

            const formattedSamples = rawSamples.map((s: any) => {

                const score = parseFloat(s.score);

                let managementDecision: string;
                let scoreColor: string;

                if (score <= 2.9) {
                    managementDecision = `Amostras (0-25 cm de profundidade) com escores Qe‑VESS entre 1–2,9 indicam um solo com boa qualidade estrutural e não requerem mudanças no manejo.`;
                    scoreColor = '#4CAF50';
                } else if (score >= 3 && score <= 3.9) {
                    managementDecision = `Amostras (0-25 cm de profundidade) com escores Qe‑VESS entre 3‑3,9 indicam um solo com qualidade estrutural razoável que pode ser melhorado.`;
                    scoreColor = '#FF9800';
                } else {
                    managementDecision = `Amostras (0-25 cm de profundidade) ou camadas com escores Qe‑VESS entre 4–5 sugerem danos às funções do solo, comprometendo sua capacidade de suporte ao crescimento, desenvolvimento e produção das culturas.`;
                    scoreColor = '#F44336';
                }

                const resume = s.layers.map((layer: any, index: any) => {

                    return ` Comprimento camada ${index + 1}: ${layer.length} cm; Nota ${layer.note}`

                });

                return {
                    id: s.id_sample,
                    name: s.name,
                    score: score.toFixed(2),
                    managementDecision,
                    scoreColor,
                    resume
                };
            });

            const generalResume = `${data.sampleAvaliations.length} amostras | Data e hora das avaliações: ${new Date(data.created_at).toLocaleString()}`

            setResumeOfAvaliation({
                title: data.description,
                summary: data.summary,
                infos: data.infos,
                generalResume: generalResume,
                samples: formattedSamples,
            });

        } catch (err) {
            console.error('Erro ao buscar avaliação:', err);
        }
    }, [id]);


    useEffect(() => {
        getAvaliationResume();
    }, [getAvaliationResume]);


    const handleNavigateToAvaliations = () => navigate('/avaliations');
    const handleNavigateToNewAvaliation = () => navigate('/new-avaliation');

    // media de scores
    const averageScore =
        resumeOfAvaliation.samples.reduce((sum, item) => sum + parseFloat(item.score), 0) /
        resumeOfAvaliation.samples.length;

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
                    justifyContent: 'space-between'
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
                        scrollbarColor: 'rgba(0, 0, 0, 0.66) transparent'
                    }}
                >

                    <Typography variant="h4" component="h1">
                        {resumeOfAvaliation.title}
                    </Typography>

                    <VessTextField
                        label="Informações"
                        value={resumeOfAvaliation.infos}
                        fullWidth
                        multiline
                        variant="filled"
                        sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
                        InputProps={{ readOnly: true }}
                    />


                    <VessTextField
                        label="Resumo Geral"
                        value={resumeOfAvaliation.generalResume}
                        fullWidth
                        multiline
                        variant="filled"
                        sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
                        InputProps={{ readOnly: true }}
                    />

                    <Box>
                        {resumeOfAvaliation.samples.map((item, index) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    p: 1,
                                    mb: 1,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    borderRadius: 1
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Amostra #{index + 1}</Typography>
                                    <Typography
                                        fontWeight="bold"
                                        sx={{
                                            backgroundColor: item.scoreColor,
                                            px: '5px',
                                            color: 'black',
                                            borderRadius: '20px'
                                        }}
                                    >
                                        {item.score}
                                    </Typography>
                                </Box>

                                <TextField
                                    label="Decisão de Manejo"
                                    value={item.managementDecision}
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
                                    InputProps={{ readOnly: true }}
                                />
                                <TextField
                                    label="Resumo da avaliação"
                                    value={item.resume}
                                    fullWidth
                                    multiline
                                    variant="filled"
                                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1, mt: 2}}
                                />
                            </Box>
                        ))}
                </Box>

                <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Typography variant="h6">
                        Score Médio: {averageScore.toFixed(2)}
                    </Typography>
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={2}>
                <VessButton onClick={handleNavigateToAvaliations} sx={{px: 2}} startIcon={<DoneIcon/>}>Finalizar</VessButton>
                <VessButton onClick={handleNavigateToNewAvaliation} sx={{px: 2}} startIcon={<AddIcon/>}>Nova Avaliação</VessButton>
            </Box>
        </Box>
        </Box >
    );
};
