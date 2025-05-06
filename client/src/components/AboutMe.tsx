import { Box, Grid2, Typography } from '@mui/material';
import { LanguageContext } from '../context/language.context';
import { useContext } from 'react';

function AboutMe() {
    const { language } = useContext(LanguageContext)

    const text = [
        {
            en: 'The “Royal Sweet” project began in 2022, as a blog where I share my recipes. However, my love for baking started many years ago, and through it, I gained experience and learned a lot.',
            pt: 'O  projecto “The Royal Sweet” iniciou-se em 2022, como um blog em que partilho as minhas receitas. No entanto, a minha paixão pela pastelaria já vem de há muitos anos, ao longo dos quais ganhei experiência e aprendi muito.'
        },
        {
            en: 'My first contact with this field was still in high school. During those years, my curiosity led me to try different family recipes, and since then, nobody can get me out of the kitchen.',
            pt: 'O meu primeiro contacto com esta arte foi quando ainda frequentava o ensino secundário, em que a minha curiosidade levou-me a experimentar algumas receitas de família. Desde então, ninguém me tirou da cozinha.'
        },
        {
            en: 'My sweets delighted in dinners and hangouts, and as it was highly requested, I started selling cakes and desserts to my friends, acquaintances, and family. Later on, I completed my education in this area with a vocational course at ACPP (Professional Cooks of Portugal Association).',
            pt: 'Os meus doces passaram a fazer sucesso em jantares e convívios, e a pedido de muitos, comecei a vender bolos e sobremesas aos meus amigos, conhecidos e familiares. Mais tarde, completei a minha formação profissional na área na ACPP (Associação Cozinheiros Profissionais de Portugal).'
        },
        {
            en: 'With the creation of the blog came a bigger audience, and I decided to finally invest in my craft and formalize this business. This is how this ship came to be, the first step in sharing my cakes with the general public.',
            pt: 'Com a criação do blog e a audiência maior que este me trouxe, decidi finalmente investir no meu negócio e formalizar esta iniciativa. Assim surgiu esta loja online, o primeiro passo para partilhar os meus bolos com o público geral.'
        },
        {
            en: 'My baking style is marked by a fusion of traditional and gourmet. I aim to adapt traditional recipes, bringing to them my own unique “twist”, but without losing the homemade love that the best sweets have. I love trying new flavor combinations and desserts that are typically not found in Portuguese pastry.',
            pt: 'A minha pastelaria marca-se pela aliança do tradicional ao gourmet. Procuro adaptar receitas tradicionais, trazendo-lhes o meu “twist” único, mas sempre sem perder aquele gostinho caseiro que os melhores doces têm. Adoro explorar combinações de sabores originais e sobremesas que não se encontram típicamente na pastelaria portuguesa.'
        },
        {
            en: 'Join me to discover a world of delicious treats!',
            pt: 'Venham comigo descobrir um mundo de doces irresistíveis!'
        },
    ]

    return (
        <Box sx={{ padding: 2 }}>
            <Grid2 container spacing={4} alignItems="center" justifyContent="center">

                {/* Image section */}
                <Grid2 size={{xs: 12, md: 4}} sx={{ textAlign: {xs: 'center', md: 'left'} }}>
                    <Box
                        component="img"
                        src='./aboutme.jpg' // Replace with your image source
                        alt="About Me"
                        sx={{
                            width: '100%',
                            maxWidth: '400px',
                            height: 'auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }}
                    />
                </Grid2>

                {/* Text section */}
                <Grid2 size={{xs: 12, md: 8}}>
                    <Typography variant="h4" gutterBottom fontFamily={'Montserrat'} fontStyle={'italic'}>
                        {language === 'en' ? 'About Me' : 'Sobre mim'}
                    </Typography>

                    {text.map((line, index) => (
                        <Typography key={'line-' + index} variant="body1" fontFamily={'Montserrat'} fontStyle={'italic'} sx={{mb: 2}}>
                            {line[language]}
                        </Typography>
                    ))}
                        
                </Grid2>

                
            </Grid2>
        </Box>
    );
}

export default AboutMe;