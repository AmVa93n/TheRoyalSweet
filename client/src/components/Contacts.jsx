import { Box, Grid2, Typography, Link } from '@mui/material';
import { LanguageContext } from '../context/language.context';
import { useContext } from 'react';

function Contacts() {
    const { language } = useContext(LanguageContext)

    const contactDetails = {
        en: {
            email: 'Email',
            phone: 'Phone',
            address: 'Address',
            emailValue: 'theroyalsweetcakeshop@gmail.com',
            phoneValue: '+351 963783279',
            phoneTimes: 'Tuesday - Sunday; 9h - 19h',
            addressValue: 'Avenida Paris, 1000-228 Lisbon',
        },
        pt: {
            email: 'E-mail',
            phone: 'Telefone',
            address: 'Endereço',
            emailValue: 'theroyalsweetcakeshop@gmail.com',
            phoneValue: '+351 963783279',
            phoneTimes: 'Terça - Domingo; 9h - 19h',
            addressValue: 'Avenida Paris, 1000-228 Lisboa',
        }
    };

    const text = contactDetails[language];

    function handleMailTo() {
        window.open(`mailto:${text.emailValue}`, '_blank');
    };


    return (
        <Box sx={{
            padding: { xs: 2, md: 4 },
            mx: { xs: 2, md: 'auto' },  // Centers horizontally and applies wider margins on desktop
            maxWidth: '1200px',         // Set max width to prevent it from stretching too wide
            textAlign: 'center'          // Centers the text for a more uniform layout
        }}>
            <Typography variant="h4" textAlign={'center'} gutterBottom>
                {language === 'en' ? 'Contacts' : 'Contactos'}
            </Typography>

            <Grid2 container spacing={4} justifyContent="center">
                {/* Email */}
                <Grid2 size={{xs: 12, md: 4}}>
                    <Typography variant="h6" gutterBottom>{text.email}</Typography>
                    <Link variant="body1" underline="hover" color="primary" onClick={handleMailTo} sx={{cursor: 'pointer'}}>
                        {text.emailValue}
                    </Link>
                </Grid2>

                {/* Phone */}
                <Grid2 size={{xs: 12, md: 4}}>
                    <Typography variant="h6" gutterBottom>{text.phone}</Typography>
                    <Typography variant="body1">{text.phoneValue}</Typography>
                    <Typography variant="body1">{text.phoneTimes}</Typography>
                </Grid2>

                {/* Address */}
                <Grid2 size={{xs: 12, md: 4}}>
                    <Typography variant="h6" gutterBottom>{text.address}</Typography>
                    <Typography variant="body1">{text.addressValue}</Typography>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default Contacts;