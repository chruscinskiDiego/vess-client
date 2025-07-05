import { Box, Typography } from "@mui/material"
import type { IManagementDecisionTutorial } from "../../interfaces/tutorial.interface"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const ManagementDecisionTutorialCard: React.FC<{ tutorial: IManagementDecisionTutorial }> = ({ tutorial }) => {

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
                    //display: 'flex',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    flexDirection: { xs: 'column', sm: 'row' },
                    borderRadius: '20px',
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    <Typography variant="body1" sx={{
                        textAlign: 'center',
                        color: 'white',
                        mt: 2,

                    }}>
                        {tutorial.introduction ?? ''}

                    </Typography>

                    {
                        tutorial.decisionCards.map((card) => {

                            return (
                                <Box
                                    key={card.title}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: card.type === 'green' ? '#4CAF50' : card.type === 'orange' ? '#FF9800' : '#F44336',
                                        borderRadius: '20px',
                                        width: { xs: '100%', sm: 'auto' },
                                        m: 1,
                                        p: 1,
                                    }}
                                >
                                    <>
                                        <Box display={'flex'} alignItems='center' justifyContent='center'>
                                            {card.type === 'green' ? <CheckCircleIcon /> :
                                                card.type === 'orange' ? <ThumbUpIcon /> :
                                                    <WarningIcon />}

                                            <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
                                                {card.title}
                                            </Typography>
                                        </Box>
                                    </>
                                    <Typography variant="body1" sx={{ textAlign: 'center', color: 'black' }}>
                                        {card.text}
                                    </Typography>
                                </Box>
                            )
                        })
                    }

                </Box>

            </Box>
        </>
    )
}