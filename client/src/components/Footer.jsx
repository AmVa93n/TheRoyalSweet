import { Box, Typography, Link } from '@mui/material';
import { useContext } from 'react';
import { LanguageContext } from '../context/language.context';

function Footer() {
    const { language } = useContext(LanguageContext)

    return (
        <Box
        component="footer"
        sx={{
            bgcolor: 'rgb(253, 33, 155)',
            py: 3,
            px: 2,
            mt: 'auto',
            textAlign: 'center',
        }}
        >
        <Typography variant="body1" sx={{ color: '#fff' }}>
            © {new Date().getFullYear()} The Royal Sweet. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ color: '#fff', mt: 1 }}>
            <Link href="/privacy" underline="hover" sx={{ color: '#fff' }}>
                {language === 'en' ? 'Privacy Policy' : 'Política de Privacidade'}
            </Link>
            {' | '}
            <Link href="/terms" underline="hover" sx={{ color: '#fff' }}>
                {language === 'en' ? 'Terms of Service' : 'Termos e Condições'}
            </Link>
        </Typography>
        </Box>
    );
}

export default Footer;