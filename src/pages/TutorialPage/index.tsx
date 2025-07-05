import { Box, Typography } from "@mui/material"
import { VessButton } from "../../components/VessButton"
import type { IAttributionsTutorial, IComplementaryInfoTutorial, IManagementDecisionTutorial, IWelcomeTutorial } from "../../interfaces/tutorial.interface"
import { WelcomeTutorialCard } from "../../components/WelcomeTutorialCard"
import { AttributionsTutorialCard } from "../../components/AttributionsTutorialCard"
import { ComplementaryInfoTutorialCard } from "../../components/ComplementaryInfoTutorialCard"
import { ManagementDecisionTutorialCard } from "../../components/ManagementDecisionTutorialCard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
export const TutorialPage: React.FC = () => {

    const [tutorialName, setTutorialName] = useState<string>("VESS");
    const [scrollTop, setScrollTop] = useState(0);
    const navigate = useNavigate();

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    const handleNavigateToMainMenu = () => {
        navigate('/home');
    }

    const handleNavigateToNewAvaliation = () => {
        navigate('/new-avaliation');
    }

    useEffect(() => {

        if (scrollTop < 1500) {
            setTutorialName("VESS");
        }
        else if (scrollTop > 1500 && scrollTop < 4400) {
            setTutorialName("Atribuição dos escores VESS");
        }
        else if (scrollTop > 4300 && scrollTop < 5100) {
            setTutorialName("Decisão de manejo");
        }
        else if (scrollTop > 5100) {
            setTutorialName("Informações complementares");
        }
    }, [scrollTop]);

    //console.log("Scroll Top:", scrollTop);

    const welcomeTutorialObject: IWelcomeTutorial[] = [
        {
            title: "O QUE É O VESS",
            description: (
                <>
                    A Avaliação Visual da Estrutura do Solo (VESS) é um teste de pá em que se avalia a qualidade estrutural (Qe) do solo de forma visual e tátil.
                    Os critérios avaliados para a atribuição de uma nota são presença de poros, tamanho, resistência e forma de agregados, presença ou não de raízes, entre outras.
                    A nota pode variar entre Qe1 (ótimo) a Qe5 (ruim). A partir dessa nota, pode-se realizar inferências e tomar decisões em relação ao manejo do solo (Guimarães et al., 2011; Ball et al., 2017).
                    O VESS foi desenvolvido a partir da metodologia de Peerlkamp (1959) e apresentado em sua primeira versão por Ball et al. (2007). Ajustes foram realizados por Guimarães et al. (2011), sendo esta a versão utilizada para este aplicativo.
                    O VESS é amplamente difundido no mundo, sendo testado para uma grande variedade de solos (Franco et al., 2019).<br /><br />
                    Mais informações podem ser encontradas em:{" "}
                    <a href="https://www.sruc.ac.uk/vess" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>
                        https://www.sruc.ac.uk/vess
                    </a>{" "}
                    (Inglês) ou{" "}
                    <a href="http://paginapessoal.utfpr.edu.br/rachelguimaraes/vess" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>
                        http://paginapessoal.utfpr.edu.br/rachelguimaraes/vess
                    </a>{" "}
                    (Português).
                </>
            ),
        },
        {
            title: "Equipamentos",
            description: "Pá reta de aproximadamente 25 cm de largura e 22-25 cm de comprimento, trena ou régua de 30 cm. Opcional: folha plástica de cor clara ou bandeja 50 x 80 cm.",
        },
        {
            title: "Onde amostrar:",
            description: `O VESS pode ser aplicado para qualquer solo, uso e manejo. É importante selecionar a área de interesse e sempre comparar com uma área com boa qualidade estrutural
             (mata nativa ou solo não cultivado). É importante comparar, por exemplo, áreas com baixa produtividade e áreas com alta produtividade. Dentro de uma área homogênea avalie 3 a 5 pontos.`,
        },
        {
            title: "Quando amostrar",
            description: `O VESS pode ser realizado em qualquer época do ano. Em solos argilosos deve-se esperar pelo menos 4 dias após uma chuva (> 50 mm) ou períodos chuvosos (Ball et al., 2017). 
            Se o solo estiver muito seco ou muito úmido será difícil de ser obtida uma amostra intacta que seja representativa da área. Raízes são melhores vistas em uma área com cultura já estabelecida ou logo após a colheita.`,
        },
        {
            title: "Extração da amostra",
            description: `Abra uma pequena tricheira cavando somente em lados opostos, reservando os outros dois lados para a retirada da amostra de solo (VER ANIMAÇÃO). 
            Retire uma amostra de 10 a 15 cm de espessura, 20 cm de largura e aprox. 25 cm de profundidade. Acomode a amostra no chão. Meça o comprimento (profundidade) da amostra. 
            (É possível retirar menores profundidades, mas evite amostrar profundidades maiores que 25 cm, para isso utilize o SubVESS (Ball et al., 2015).`,
        },
        {
            title: "Exposição dos Agregados",
            description: `Delicadamente manipule a amostra. Segure a amostra por baixo e abra como um livro, respeitando as linhas de fratura dos agregados. 
            Observe se há camadas que se diferenciam pelo tamanho e/ou forma dos agregados e faça a avaliação individual dessas camadas. Meça o comprimento de cada camada distinta. 
            Esses valores serão informados na seção avaliar.`,
        },
        {
            title: "Atribuição dos escores VESS",
            description: `Compare a amostra com as descrições e fotos representadas a seguir e determine o que mais se assemelha para cada camada da amostra. 
            Se necessário, utilize a redução dos agregados e sua descrição para confirmar os escores (clique aqui para saber como fazer a redução dos agregados). 
            Para diferenciar um escore 3 de um 4 faça o teste de mão (vídeo aqui), se o torrão romper o escore é 3 se não romper é 4 (Ball et al., 2017). 
            É necessário ter atenção com a umidade do solo para proceder com o teste de mão.`,
        }
    ];

    const attributionsTutorialObject: IAttributionsTutorial[] = [
        {
            title: "Qualidade estrutural (Qe) 1: Friável",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/qe1_1.png",
            //subtitle: "Aparência após exposição dos agregados",
            description: `Agregados quebram facilmente com os dedos
            Tamanho e aparência dos agregados: Maioria < 6 mm após a
            quebra. Porosidade visível e raízes: Alta porosidade e raízes por todo
            solo`,
        },
        {
            title: "Qualidade estrutural (Qe) 2: Intacto",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/qe2_1.png",
            description: `Agregados quebram facilmente com uma mão
            Tamanho e aparência dos agregados: Uma mistura de agregados
            porosos e redondos entre 2 mm – 7 cm; Sem presença de torrões
            Porosidade visível e raízes: Maioria dos agregados são porosos e
            raízes por todo solo`,
        },
        {
            title: "Qualidade estrutural (Qe) 3: Firme",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/qe3_1.png",
            description: `Maioria dos agregados quebram com uma mão.
            Tamanho e aparência dos agregados: Uma mistura de
            agregados porosos entre 2mm -10 cm; menos de 30% são <1
            cm. Alguns torrões angulares não porosos podem estar presentes.
            Macroporos e fissuras presentes
            Porosidade e raízes: ambas dentro dos agregados`,
        },
        {
            title: "Qualidade estrutural (Qe) 4: Compacto",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/qe4_1.png",
            description: `Quebrar agregados com uma mão requer esforço considerável
            Tamanho e aparência dos agregados: Maioria > 10 cm e são sub-
            angulares não porosos; possibilidade de horizontalização; menos
            que 30% são <7 cm. Porosidade visível e raízes: Poucos macroporos e fissuras; 
            Raízes agrupadas em macroporos e ao redor dos agregados`,
        },
        {
            title: "Qualidade estrutural (Qe) 5: Muito compacto",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/qe5_1.png",
            description: `Difícil quebra.
            Tamanho e aparência dos agregados: Maioria são maiores que >
            10 cm, muito poucos < 7 cm, angular e não poroso.
            Porosidade visível e raízes: Porosidade muito baixa. Macroporos
            podem estar presentes. Pode conter zonas anaeróbicas. Poucas
            raízes e restritas a fissuras.`,
        }
    ];

    const managementDecisionTutorialObject: IManagementDecisionTutorial = {
        introduction: `O método VESS fornece uma avaliação da qualidade
        estrutural atual do solo e permite decisões de manejo do
        solo que visam melhorar ou manter a qualidade do solo.
        Para aliar a VESS à decisão de manejo do solo, são
        recomendadas múltiplas amostras (3 a 5), avaliadas
        preferencialmente por um único avaliador.
        `,
        decisionCards: [
            {
                type: 'green',
                title: 'Escores VESS entre 1 a 2, 9',
                text: `Amostras (0-25 cm de profundidade) com escores Qe-
                VESS entre 1–2,9 indicam um solo com boa qualidade
                estrutural e não requerem mudanças no manejo.`
            },
            {
                type: 'orange',
                title: 'Escores VESS entre 3 a 3, 9',
                text: `Amostras (0-25 cm de profundidade) com escores Qe-
                VESS entre 3-3,9 indicam um solo com qualidade
                estrutural razoável que pode ser melhorado. Para
                maximizar a exploração do solo pelas raízes das
                culturas e para ajudar no desempenho de outras
                funções do solo, as mudanças no manejo devem ser a
                longo prazo e podem incluir a adoção de rotação de
                culturas com sistema radicular abundantes e/ou de
                penetração profunda e que maximizem a produção
                matéria seca, aumentando a concentração de matéria
                Orgânica no solo. Ademais, práticas que minimizem a
                compactação do solo, como a superlotação animal,
                em sistemas de integração lavoura-pecuária, e/ou a
                redução do tráfego de máquinas pesadas também
                contribuem para melhorar o escore da qualidade
                estrutural do solo.`
            },
            {
                type: 'red',
                title: 'Escores VESS entre 4 a 5',
                text: `Amostras (0-25 cm de profundidade) ou camadas com
                escores Qe-VESS entre 4–5 sugerem, a partir de
                correlações com propriedades do solo (densidade,
                porosidade total, macroporosidade, resistência
                mecânica do solo à penetração das raízes, carbono
                orgânico, entre outros), danos às funções do solo,
                comprometendo sua capacidade de suporte ao
                crescimento, desenvolvimento e à produção das
                culturas. Se uma camada com escore VESS 4 estiver
                próximo da superfície do solo, então provavelmente
                será uma limitação agronômica, pois limitará o
                crescimento inicial das plantas, sendo geralmente
                necessário intervenção direta.
                Idealmente, recomendamos que a decisão de manejo
                do solo seja baseada por um conjunto de dados de
                qualidade do solo; características visíveis podem ser
                utilizadas, tais como evidências de acúmulo superficial
                de água, diminuição no rendimento ou evidência de
                estresse nas culturas, profundidade de enraizamento,
                relevo superficial, além de medições indiretas como
                densidade do solo, porosidade, resistência à
                penetração, macroporosidade, taxas de infiltração e
                por dados biológicos e de rendimento do solo. Neste
                caso a mudança de manejo deve ser a curto prazo, ou
                seja, pensando em melhorias para a próxima cultura
                comercial, podendo ser utilizados consórcios e
                culturas com sistema radicular abundante entre
                safras, ou o revolvimento mecânico.`
            }
        ]
    };

    const complementaryInfoTutorialObject: IComplementaryInfoTutorial[] = [
        {
            title: `A nota da qualidade estrutural do solo pode ser
            atribuída entre categorias se a camada apresentar
            características das duas.

            Por exemplo, um escore VESS de 1,5 pode ser
            atribuído se a camada apresentar uma proporção de
            ≈50% com qualidade estrutural 1, mas também
            apresentar agregados com qualidade estrutural 2.

            As figuras abaixo são exemplos de solos com diferentes
            escores Qe-VESS para auxiliar o usuário na atribuição
            da nota da qualidade estrutural do solo.

            *Ressaltamos que a atribuição da nota não foi realizada
            somente de forma visual mas tátil também.`,
        },
        {
            title: "Amostras solo argiloso com escores Qe-VESS",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-01.JPG"
        },
        {
            title: "Amostras solo argiloso com escores Qe-VESS",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-02.JPG"
        },
        {
            title: "Amostras solo argiloso com escores Qe-VESS",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-03.JPG"
        },
        {
            title: "Amostras solo argiloso com escores Qe-VESS",
            score: "4,5",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-04.JPG"
        },
        {
            title: "Amostras solo argiloso com escores Qe-VESS",
            score: "4,5",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-05.jpg"
        },
        {
            title: "Amostras solo argiloso com escores Qe-VESS",
            score: "4,5",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-06.JPG"
        },
        {
            title: "Amostras solo arenoso com escores Qe-VESS",
            score: "4,5",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-07.JPG"
        },
        {
            title: "Amostras solo argiloso com escores Qe-VESS",
            score: "5,0",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-08.JPG"
        },
        {
            title: "Amostras solo argiloso com escores Qe-VESS",
            score: "5,0",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-09.JPG"
        },
        {
            title: "Amostras solo arenoso com escores Qe-VESS",
            score: "5,0",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-10.JPG"
        },
        {
            title: "Amostras solo arenoso com escores Qe-VESS",
            score: "5,0",
            imageUrl: "https://vess-bucket.s3.sa-east-1.amazonaws.com/Tutorial/IC-11.JPG"
        }
    ];


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
                    <Typography variant="h4" sx={{
                        fontWeight: 'bold',
                        backgroundColor: "rgba(0, 0, 0, 0.66)",
                        display: 'inline',
                        color: "#f2e2b3",
                    }}>
                        {tutorialName}
                    </Typography>

                    <Box sx={{
                        overflowY: 'scroll',
                        height: '100%',

                        '&::-webkit-scrollbar': { width: '10px !important' },
                        '&::-webkit-scrollbar-track': { background: 'transparent !important' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0, 0, 0, 0.08) !important', borderRadius: '4px !important' },
                        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'black !important' },

                        scrollbarColor: 'rgba(0, 0, 0, 0.66) transparent',
                    }}
                        onScroll={handleScroll}
                    >

                        {welcomeTutorialObject?.map((tutorial) => {
                            return (
                                <WelcomeTutorialCard
                                    tutorial={tutorial}
                                />
                            )
                        })}

                        {attributionsTutorialObject?.map((tutorial) => {
                            return (
                                <AttributionsTutorialCard
                                    tutorial={tutorial}
                                />
                            )
                        })}

                        <ManagementDecisionTutorialCard
                            tutorial={managementDecisionTutorialObject}
                        />

                        {complementaryInfoTutorialObject?.map((tutorial) => {
                            return (
                                <ComplementaryInfoTutorialCard
                                    tutorial={tutorial}
                                />
                            );

                        })}



                    </Box>

                    <Box sx={{
                        mt: 2,
                        display: 'flex',
                    }}>

                        <VessButton sx={{
                            margin: '0 auto',
                            px: 5,
                        }}
                        onClick={handleNavigateToMainMenu}>
                            Menu Principal
                        </VessButton>

                        <VessButton sx={{
                            margin: '0 auto',
                            px: 5,
                        }}
                        onClick={handleNavigateToNewAvaliation}
                        >
                            Nova Avaliação
                        </VessButton>

                    </Box>

                </Box>
            </Box>


        </>
    )
}