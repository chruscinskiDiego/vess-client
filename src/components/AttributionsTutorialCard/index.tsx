import { Typography, Box } from "@mui/material";
import type { IAttributionsTutorial } from "../../interfaces/tutorial.interface";

export const AttributionsTutorialCard: React.FC<{ tutorial: IAttributionsTutorial }> = ({ tutorial }) => {
    return (

        <>
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
                {
                    tutorial.subtitle && (
                        <Typography variant="subtitle1" sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold' }}>
                            {tutorial.subtitle}
                        </Typography>
                    )
                }
                {
                    tutorial.description && (
                        <Typography variant="body1" sx={{ mt: 1, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '4px', color: 'black' }}>
                            {tutorial.description}
                        </Typography>
                    )
                }
                {
                    tutorial.imageUrl && (
                        <Box
                            component="img"
                            src={tutorial.imageUrl}
                            alt={tutorial.title}
                            sx={{
                                width: { xs: '90%', sm: '60%', md: '40%' },
                                height: 'auto',
                                display: 'block',
                                mx: 'auto',
                                mb: 1,
                                borderRadius: '8px',
                                mt: 2,
                                boxShadow: 10,
                                border: '2px solid rgba(255, 255, 255, 0.5)',
                            }}
                        />
                    )
                }

            </Box>
        </>
    );
}