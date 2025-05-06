import { Box, Typography, Link } from '@mui/material';
import { useContext } from 'react';
import { LanguageContext } from '../context/language.context';
import { theme } from '../style';

function Footer() {
    const { language } = useContext(LanguageContext)

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: theme.primary_bg,
                py: 3,
                px: 2,
                mt: 'auto',
                textAlign: 'center',
            }}
        >
            <Typography variant="body1" sx={{ color: theme.primary_text, fontFamily: 'Montserrat' }}>
                © {new Date().getFullYear()} The Royal Sweet. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ color: theme.primary_text, mt: 1, fontFamily: 'Montserrat' }}>
                <Link href="/privacy" underline="hover" sx={{ color: theme.primary_text }}>
                    {language === 'en' ? 'Privacy Policy' : 'Política de Privacidade'}
                </Link>
                {' | '}
                <Link href="/terms" underline="hover" sx={{ color: theme.primary_text }}>
                    {language === 'en' ? 'Terms of Service' : 'Termos e Condições'}
                </Link>
                {' | '}
                <Link href="/terms" underline="hover" sx={{ color: theme.primary_text }}>
                    {language === 'en' ? '' : 'Livro de Reclamações'}
                </Link>
            </Typography>
        </Box>
    );
}

export default Footer;