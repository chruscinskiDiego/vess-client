import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { VessButton } from '../../components/VessButton';
import { VessTextField } from '../../components/VessTextField';
import { api } from '../../lib/axios';

interface Layer {
    id_layer: number;
    length: string;
    note: string;
}

interface Location {
    id_location: number;
    latitude: string;
    longitude: string;
}

interface SampleEvaluation {
    id_sample: number;
    name: string;
    num_layers: number;
    score: string;
    fk_id_avaliation: number;
    layers: Layer[];
    location: Location;
}

interface Avaliation {
    id_avaliation: number;
    description: string;
    management_decision: string;
    summary: string;
    infos: string;
    file_link: string;
    created_at: string;
    fk_user_id: number;
    sampleAvaliations: SampleEvaluation[];
}

export const AvaliationById: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [avaliation, setAvaliation] = useState<Avaliation | null>(null);

    const fetchAvaliation = useCallback(async () => {
        try {
            const { data } = await api.get<Avaliation>(`/avaliation/${id}`);
            setAvaliation(data);
        } catch (error) {
            console.error('Erro ao buscar avaliação:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchAvaliation();
    }, [fetchAvaliation]);

    if (!avaliation) {
        return <Typography>Carregando avaliação...</Typography>;
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
                    overflowY: 'auto',
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

                <Box
                    sx={{
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                   
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 'bold',
                            }}
                        >
                            Avaliação #{avaliation.description}
                        </Typography>
                    </Box>

                    <Box sx={{ width: '88px' }} />
                </Box>


                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Box
                        component="img"
                        src={avaliation.file_link}
                        alt="Arquivo da avaliação"
                        sx={{ maxHeight: 200, maxWidth: '100%', borderRadius: 1 }}
                    />
                </Box>

                <VessTextField
                    label="Descrição"
                    value={avaliation.description}
                    fullWidth
                    variant="filled"
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: true }}
                />

                <VessTextField
                    label="Informações"
                    value={avaliation.infos}
                    fullWidth
                    variant="filled"
                    multiline
                    sx={{ mb: 3 }}
                    InputProps={{ readOnly: true }}
                />

                <Box sx={{ flexGrow: 1 }}>
                    {avaliation.sampleAvaliations.map((s, idx) => (
                        <Box
                            key={s.id_sample}
                            sx={{ mb: 3, p: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
                        >
                            <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
                                Amostra #{idx + 1}: {s.name}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
                                <VessTextField
                                    label="Número de camadas"
                                    value={s.num_layers.toString()}
                                    variant="filled"
                                    InputProps={{ readOnly: true }}
                                    sx={{ textAlign: 'center' }}
                                />
                                <VessTextField
                                    label="Score"
                                    value={parseFloat(s.score).toFixed(2)}
                                    variant="filled"
                                    InputProps={{ readOnly: true }}
                                    sx={{ textAlign: 'center' }}
                                />
                            </Box>

                            <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'center' }}>
                                Detalhes das Camadas
                            </Typography>
                            {s.layers.map((layer, i) => (
                                <Box
                                    key={layer.id_layer}
                                    sx={{
                                        mb: 1,
                                        p: 1,
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        borderRadius: 1,
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography>Camada {i + 1}</Typography>
                                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 0.5 }}>
                                        <VessTextField
                                            label="Comprimento (cm)"
                                            value={layer.length}
                                            variant="filled"
                                            size="small"
                                            InputProps={{ readOnly: true }}
                                        />
                                        <VessTextField
                                            label="Nota"
                                            value={layer.note}
                                            variant="filled"
                                            size="small"
                                            InputProps={{ readOnly: true }}
                                        />
                                    </Box>
                                </Box>
                            ))}

                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
                                Localização
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <VessTextField
                                    label="Latitude"
                                    value={s.location.latitude}
                                    variant="filled"
                                    size="small"
                                    InputProps={{ readOnly: true }}
                                />
                                <VessTextField
                                    label="Longitude"
                                    value={s.location.longitude}
                                    variant="filled"
                                    size="small"
                                    InputProps={{ readOnly: true }}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography variant="subtitle2">
                        Criado em: {new Date(avaliation.created_at).toLocaleString()}
                    </Typography>
                     <VessButton onClick={() => navigate(-1)} sx={{ px: 2, mt: 2 }}>
                        Voltar
                    </VessButton>

                </Box>
            </Box>
        </Box>
    );
};
