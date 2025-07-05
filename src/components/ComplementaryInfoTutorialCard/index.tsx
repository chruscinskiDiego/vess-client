import { Typography, Box } from "@mui/material";
import type { IComplementaryInfoTutorial } from "../../interfaces/tutorial.interface";

export const ComplementaryInfoTutorialCard: React.FC<{ tutorial: IComplementaryInfoTutorial }> = ({ tutorial }) => {
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

                <Box sx={{
                    display: 'flex',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    flexDirection: { xs: 'column', sm: 'row' },
                    borderRadius: '20px',
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    <Typography variant="body1" sx={{
                        textAlign: 'center',
                        color: 'white',
                        mt: 0.5,

                    }}>
                        {tutorial.title ?? ''}
                    </Typography>

                    {tutorial.score && (

                        <Typography variant="h6" sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            ml: { xs: 0, sm: 2 },
                            backgroundColor: '#DD856D',
                            borderRadius: '50px',
                            px: '10px',
                            color: 'black',
                        }}>
                            {tutorial.score}
                        </Typography>
                    )}

                </Box>

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