import { useContext, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Box, Typography, IconButton, TextField as MuiTextField } from '@mui/material';
import { VessButton } from '../../components/VessButton';
import { VessTextField } from '../../components/VessTextField';
import { useNavigate } from 'react-router-dom';
import type { INewAvaliation, INewAvaliationSample, INewAvaliationSampleLayer } from '../../interfaces/avaliations.interfaces';
import { Add, Remove } from '@mui/icons-material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArticleIcon from '@mui/icons-material/Article';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { notifyError, notifySuccess, notifyWarning } from '../../components/Toasts';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../lib/axios';


export const NewAvaliation = () => {
    // estados
    const navigate = useNavigate();
    const { userId } = useContext(UserContext)!;
    const [hasSelectedAvaliationName, setHasSelecteAvaliationdName] = useState(false);
    const [avaliation, setAvaliation] = useState<INewAvaliation>({
        description: '',
        management_decision: 'later',
        summary: 'later',
        infos: '',
        user_id: Number(userId),
        sample_avaliation: [],
    });
    
    const [sampleAvaliation, setSampleAvaliation] = useState<INewAvaliationSample[]>([]);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // utils

    const handleAvaliationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAvaliation(prev => ({ ...prev, [name]: value }));
    };

    const handleInit = (e: FormEvent) => {
        e.preventDefault();
        if (avaliation.description.trim()) {
            setHasSelecteAvaliationdName(true);
            setSampleAvaliation([{
                name: '',
                num_layers: 0,
                score: 0,
                sample_layers: [],
                sample_location: { latitude: location?.latitude ?? 0, longitude: location?.longitude ?? 0 }
            }]);
        }
    };

    // sample handlers
    const handleAddSample = () => {
        setSampleAvaliation(prev => [
            ...prev,
            { name: '', num_layers: 0, score: 0, sample_layers: [], sample_location: { latitude: location?.latitude ?? 0, longitude: location?.longitude ?? 0 } }
        ]);
    };

    const handleRemoveSample = (index: number) => {
        setSampleAvaliation(prev => prev.filter((_, i) => i !== index));
    };

    const handleSampleChange = (
        index: number,
        field: keyof INewAvaliationSample,
        value: string | number
    ) => {
        setSampleAvaliation(prev => prev.map((s, i) => {
            if (i !== index) return s;
            return { ...s, [field]: typeof value === 'string' && !isNaN(+value) ? +value : value };
        }));
    };

    // layer handlers
    const handleAddLayer = (sampleIndex: number) => {

        if (sampleAvaliation[sampleIndex]?.sample_layers.length >= 5) {
            notifyWarning('Você só pode adicionar até 5 camadas.');
            return;
        };

        setSampleAvaliation(prev => prev.map((s, i) => {
            if (i !== sampleIndex) return s;
            const newLayer: INewAvaliationSampleLayer = { length: 0, note: 0 };
            return { ...s, sample_layers: [...s.sample_layers, newLayer], num_layers: s.sample_layers.length + 1 };
        }));
    };

    const handleRemoveLastLayer = (sampleIndex: number) => {
        setSampleAvaliation(prev =>
            prev.map((s, i) => {
                if (i !== sampleIndex) return s;
                const newLayers = s.sample_layers.slice(0, -1);
                return {
                    ...s,
                    sample_layers: newLayers,
                    num_layers: newLayers.length
                };
            })
        );
    };


    const handleLayerChange = (
        sampleIndex: number,
        layerIndex: number,
        field: keyof INewAvaliationSampleLayer,
        value: string | number
    ) => {
        setSampleAvaliation(prev => prev.map((s, i) => {
            if (i !== sampleIndex) return s;
            const layers = s.sample_layers.map((l, li) => {
                if (li !== layerIndex) return l;
                return { ...l, [field]: typeof value === 'string' && !isNaN(+value) ? +value : value };
            });
            return { ...s, sample_layers: layers };
        }));
    };

    //location

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (err) => {
                console.error(`Erro ao obter localização: ${err.message}`);
            }
        );
    }, []);

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        if (inputRef.current) inputRef.current.value = '';
    };

    // final submit handler
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            notifyError('Anexe uma imagem para a avaliação.');
            return;
        }

        sampleAvaliation.forEach((sample) => {

            if (!sample.name) {
                notifyError('Cada amostra deve ter um nome');
                throw new Error('Cada amostra deve ter um nome.');
            }

            if (sample.sample_layers.length === 0) {
                notifyError('Cada amostra deve ter pelo menos uma camada');
                throw new Error('Cada amostra deve ter pelo menos uma camada.');
            }

        });

        const payload = { ...avaliation, sample_avaliation: sampleAvaliation };

        try {

            const response = await api.post('/avaliation', payload);

            const avaliationId = response.data.avaliation;

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);

                await api.post(`/images/upload/${avaliationId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                notifySuccess('Avaliação criada com sucesso!');

                navigate(`/resume-of-avaliation/${avaliationId}`);

            }


        } catch (error) {
            console.error('Error creating avaliation:', error);
            notifyError('Erro ao criar avaliação. Tente novamente mais tarde.');
        }
        // TODO: POST to backend
    };


    return (

        <>

            <Box
                sx={{
                    position: 'fixed',
                    inset: 0,
                    background: 'linear-gradient(180deg, #f2e2b3 0%,  #ffdfa3 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Box
                    component="div"
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
                            mb: 2,
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                        <VessButton
                            onClick={() => navigate('/avaliations')}
                            style={{
                                paddingRight: '15px',
                                paddingLeft: '15px'
                            }}>
                            Voltar
                        </VessButton>
                        <Typography variant="h4"
                            sx={{
                                fontWeight: 'bold'
                            }}>
                            {hasSelectedAvaliationName ? avaliation.description : 'NOVA AVALIAÇÃO'}
                        </Typography>
                    </Box>

                    {!hasSelectedAvaliationName ? (
                        <Box component="form"
                            onSubmit={handleInit}
                            sx={{
                                display: 'flex',
                                gap: 2,
                                mb: '50%'
                            }}>

                            <VessTextField name="description"
                                label="Nome da Avaliação"
                                value={avaliation.description}
                                onChange={handleAvaliationChange} />

                            <VessButton type="submit"
                                style={{
                                    paddingRight: '15px',
                                    paddingLeft: '15px'
                                }}>
                                Continuar
                            </VessButton>
                        </Box>
                    ) : (
                        <Box component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                flexGrow: 1, overflowY: 'auto',
                                '&::-webkit-scrollbar': { width: '10px !important' },
                                '&::-webkit-scrollbar-track': { background: 'transparent !important' },
                                '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0, 0, 0, 0.08) !important', borderRadius: '4px !important' },
                                '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'black !important' },
                                scrollbarColor: 'rgba(0, 0, 0, 0.66) transparent',
                            }}>

                            {sampleAvaliation.map((sample, si) => (
                                <Box key={si}
                                    sx={{
                                        mb: 3,
                                        p: 2,
                                        bgcolor: 'rgba(255,255,255,0.08)',
                                        borderRadius: 1
                                    }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography variant="h6"
                                            sx={{
                                                fontWeight: 'bold',
                                                backgroundColor: '#2D1D0E',
                                                px: '10px',
                                                borderRadius: 1
                                            }}>
                                            <ArticleIcon fontSize={'small'}
                                                sx={{
                                                    mr: 1
                                                }} />
                                            Amostra {si + 1} {sample.name.length > 0 ? ` - ${sample.name}` : ''}
                                        </Typography>
                                        <IconButton onClick={() => handleRemoveSample(si)}>
                                            <Remove />
                                        </IconButton>
                                    </Box>
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr',
                                        gap: 2,
                                        mt: 1
                                    }}>
                                        <MuiTextField label="Nome"
                                            value={sample.name}
                                            onChange={e => handleSampleChange(si, 'name', e.target.value)}
                                            sx={{

                                                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                                    borderColor: 'black',
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: 'black',
                                                },

                                            }}
                                        />
                                    </Box>
                                    {/* camada */}
                                    <Box sx={{
                                        mt: 2
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Typography>
                                                Camadas
                                            </Typography>

                                            <IconButton
                                                onClick={() => handleRemoveLastLayer(si)}
                                                sx={{ ml: 'auto', px: 1.3 }}
                                            >
                                                <Remove fontSize="small" />
                                            </IconButton>

                                            <IconButton onClick={() => handleAddLayer(si)}>
                                                <Add />
                                            </IconButton>

                                        </Box>
                                        {sample.sample_layers.map((layer, li) => (
                                            <>
                                                <Typography sx={{
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#2D1D0E',
                                                    px: '10px',
                                                    borderRadius: 1,
                                                    mb: 1,
                                                    mt: 1
                                                }}>
                                                    Camada {li + 1}
                                                </Typography>

                                                <Box key={li}
                                                    sx={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr',
                                                        gap: 2,
                                                        mt: 1
                                                    }}>
                                                    <MuiTextField label="Comprimento"
                                                        placeholder={`Comprimento camada ${li + 1}`}
                                                        type="number"
                                                        value={layer.length}
                                                        onChange={e => handleLayerChange(si, li, 'length', e.target.value)}
                                                        sx={{

                                                            '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                                                borderColor: 'black',
                                                            },
                                                            '& .MuiInputLabel-root.Mui-focused': {
                                                                color: 'black',
                                                            },

                                                        }}
                                                    />
                                                    <MuiTextField label="Nota"
                                                        type="number"
                                                        value={layer.note}
                                                        onChange={e => handleLayerChange(si, li, 'note', e.target.value)}
                                                        sx={{

                                                            '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                                                borderColor: 'black',
                                                            },
                                                            '& .MuiInputLabel-root.Mui-focused': {
                                                                color: 'black',
                                                            },

                                                        }}
                                                    />
                                                </Box>
                                            </>
                                        ))}
                                    </Box>

                                </Box>
                            ))}

                            {/* avaliacao */}
                            <Box
                                sx={{
                                    mb: 2,
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                    gap: 2,
                                }}
                            >
                                <VessTextField
                                    name="infos"
                                    label="Informações Importantes"
                                    value={avaliation.infos}
                                    onChange={handleAvaliationChange}
                                    multiline
                                    rows={3}
                                    sx={{
                                        gridColumn: { xs: 'span 1', sm: 'span 2' },
                                    }}
                                />

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        alignItems: { xs: 'stretch', sm: 'center' },
                                        gap: 1,
                                    }}
                                >
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleSelectFile}
                                    />

                                    <VessButton
                                        variant="outlined"
                                        onClick={() => inputRef.current?.click()}
                                        startIcon={<AttachFileIcon />}
                                        sx={{
                                            mt: { xs: 0, sm: 2 },
                                            width: { xs: '100%', sm: selectedFile ? '250px' : '220px' },

                                            '&:hover': {
                                                borderColor: '#160A04',
                                            },

                                            '&.Mui-focused': {
                                                borderColor: '#160A04',
                                            },

                                            '&:active': {
                                                backgroundColor: '#160A04',
                                            },
                                        }}
                                    >
                                        Anexar imagem
                                    </VessButton>

                                    {selectedFile && (
                                        <Typography
                                            variant="body2"
                                            sx={{ mt: { xs: 1, sm: 0 }, wordBreak: 'break-all' }}
                                        >
                                            {selectedFile.name} (
                                            {(selectedFile.size / 1024).toFixed(1)} KB)
                                        </Typography>
                                    )}
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mt: 2,
                                    gap: 1,
                                }}
                            >
                                <VessButton
                                    onClick={handleAddSample}
                                    startIcon={<PostAddIcon fontSize="large" />}
                                    sx={{ width: { xs: '100%', sm: '220px' } }}
                                >
                                    Adicionar Amostra
                                </VessButton>

                                <VessButton
                                    type="submit"
                                    startIcon={<TroubleshootIcon />}
                                    sx={{
                                        width: { xs: '100%', sm: '220px' },
                                        mr: { xs: 0, sm: 0.3 },
                                        background: 'linear-gradient(180deg, #f2e2b3 0%, rgb(255, 223, 163) 100%)',
                                        color: 'black',
                                    }}
                                >
                                    Avaliar
                                </VessButton>
                            </Box>

                        </Box>
                    )}
                </Box>
            </Box>

        </>
    );
}
