import { Box, Modal, Typography } from "@mui/material"
import type { IUserUpdate } from "../../interfaces/user.interfaces"


import { VessButton } from "../VessButton"

export const UserUpdateModal: React.FC<IUserUpdate> = ({ open, onClick, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#89592A',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: { xs: '90%', sm: 400 },
        }}
      >
        <Typography id="modal-title" variant="h6" gutterBottom>
          Tem certeza que deseja atualizar seu Usuário?
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          <VessButton variant="outlined" onClick={onClose}>
            Fechar
          </VessButton>
          <VessButton variant="contained" onClick={onClick}>
            Atualizar
          </VessButton>
        </Box>
      </Box>
    </Modal>
  );
};