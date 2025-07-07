import { Box, CircularProgress } from "@mui/material";

export const CircularLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(180deg, #f2e2b3 0%, rgb(255, 223, 163) 100%)', // opcional
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
      }}
    >
      <CircularProgress
        size={60}
        thickness={5}
        sx={{ color: 'black' }}
      />
    </Box>
  );
};