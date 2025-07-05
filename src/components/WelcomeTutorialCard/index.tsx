import { Typography, Box } from "@mui/material";
import type { IWelcomeTutorial } from "../../interfaces/tutorial.interface";

export const WelcomeTutorialCard: React.FC<{ tutorial: IWelcomeTutorial }> = ({ tutorial }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                m: 1,
            }}
        >

            <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {tutorial.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '4px', color: 'black' }}>
                {tutorial.description}
            </Typography>
            {tutorial.imageUrl && (
                
                <img src={tutorial.imageUrl} style={{ width: '100%', height: '80%', borderRadius: '8px' }} />
            )}
            
        </Box>
    );
}