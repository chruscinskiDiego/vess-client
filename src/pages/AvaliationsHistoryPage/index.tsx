import React, { useState, useMemo, useEffect, useContext } from 'react';
import { Box, Typography, TextField, Pagination } from '@mui/material';
import { AvaliationHistoryCard } from '../../components/AvaliationHistoryCard';
import { VessButton } from '../../components/VessButton';
import { useNavigate } from 'react-router-dom';
import type { IAvaliationHistory } from '../../interfaces/avaliations.interfaces';
import { api } from '../../lib/axios';
import { UserContext } from '../../contexts/UserContext';

export const AvaliationsHistory: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [avaliations, setAvaliations] = useState<IAvaliationHistory[]>([]);
  const navigate = useNavigate();
  const rowsPerPage = 5;
  const { userId } = useContext(UserContext)!;

  useEffect(() => {
    const getAvaliationHistory = async () => {
      try {
        const response = await api.get(`/avaliation/history-by-user/${userId}`);
        setAvaliations(response.data.history ?? []);
      } catch (error) {
        console.error('Error fetching avaliation history:', error);
      }
    };

    getAvaliationHistory();
  }, [userId]);

  const filtered = useMemo(() => {
    return avaliations.filter((item) =>
      item.description.toLowerCase().includes(filter.toLowerCase()) ||
      item.summary.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, avaliations]);

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page]);

  const pageCount = Math.ceil(filtered.length / rowsPerPage);

  const handleBackToAvaliationsMenu = () => {
    navigate('/avaliations');
  };

  console.log('paginated', paginated);

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
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box display="flex" justifyContent="center">
            <Typography variant="h3" fontWeight={700} sx={{ mr: 2 }}>
              HISTÓRICO
            </Typography>
            <Box
              component="img"
              src="src/assets/vess-logo.png"
              alt="Logo VESS"
              sx={{ height: 50, width: 'auto', objectFit: 'contain' }}
            />
          </Box>

          <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
            <VessButton onClick={handleBackToAvaliationsMenu} sx={{ px: 2 }}>
              Voltar
            </VessButton>
            <Box sx={{ width: { xs: '60%', sm: '400px', md: '300px' } }}>
              <TextField
                placeholder="Filtrar avaliações..."
                variant="outlined"
                size="small"
                value={filter}
                onChange={(e) => { setFilter(e.target.value); setPage(1); }}
                fullWidth
                sx={{ background: 'linear-gradient(180deg, #f2e2b3 0%,rgb(255, 223, 163) 100%)', borderRadius: 1 }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowY: 'auto',
            flexGrow: 1,
            minHeight: 0,

            '&::-webkit-scrollbar': { width: '10px !important' },
            '&::-webkit-scrollbar-track': { background: 'transparent !important' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0, 0, 0, 0.08) !important', borderRadius: '4px !important' },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'black !important' },

            scrollbarColor: 'rgba(0, 0, 0, 0.66) transparent',
          }}
        >
          {paginated.map((item) => (
            <AvaliationHistoryCard
              key={item.id_avaliation}
              id_avaliation={item.id_avaliation}
              title={item.description}
              summary={item.summary}
              imageLink={item.file_link}
              date={item.created_at}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="medium"
            sx={{
              background: 'linear-gradient(180deg, #f2e2b3 0%, rgb(255, 223, 163) 100%)',
              borderRadius: 2,
              p: 1,
              '& .MuiPaginationItem-root': {
                color: '#333',
                '&:hover': { backgroundColor: '#e0cfa0', color: '#000' },
                '&.Mui-selected': { backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'black' } },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
