import React from 'react';
import { Card, Typography, Box, IconButton } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

export interface AvaliationHistoryProps {
    file_link?: string | undefined;
    created_at?: string | undefined;
    id_avaliation: number;
    imageLink?: string;
    title: string;
    summary: string;
    date?: string;
    handleClickHistoryById?: (id: number) => void;
}

export const AvaliationHistoryCard: React.FC<AvaliationHistoryProps> = ({
    id_avaliation,
    imageLink,
    title,
    summary,
    date,
    handleClickHistoryById,
}) => (
    <Card
        sx={{
            width: '98%',
            height: '60px',
            borderRadius: 3,
            boxShadow: 3,
            background: 'linear-gradient(180deg, #f2e2b3 0%,rgb(255, 223, 163) 100%)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
            },
            display: 'flex',
            alignItems: 'center',
            p: 1,
        }}
    >

        {imageLink && (
            <Box
                component="img"
                src={imageLink}
                alt={title}
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    mr: 2,
                }}
            />
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', minWidth: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="medium" noWrap>
                    {title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 2, flexShrink: 0 }}>
                    {date}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {summary}
                </Typography>
                <Box sx={{ width: 'auto' }} />
            </Box>
        </Box>

        <IconButton
            onClick={() => handleClickHistoryById!(id_avaliation)}
            sx={{
                width: 36,
                height: 36,
                bgcolor: "rgba(0, 0, 0, 0.66)",
                color: 'common.white',
                '&:hover': { bgcolor: 'black' },
                ml: 2,
                mr: 2
            }}
            aria-label="Ver detalhes"
        >
            <LaunchIcon fontSize="small" sx={{
                
            }}/>
        </IconButton>
    </Card>
);
