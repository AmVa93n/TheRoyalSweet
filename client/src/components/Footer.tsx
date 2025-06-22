import { useStore } from '../store';
import { theme } from '../style';

function Footer() {
    const { language } = useStore();

    return (
        <footer className={`text-center py-6 px-4 mt-auto`} style={{ backgroundColor: theme.primary_bg }}>
            <p className={`text-base`} style={{ color: theme.primary_text }}>
                © {new Date().getFullYear()} The Royal Sweet. All rights reserved.
            </p>
            <p className={`text-sm mt-2`} style={{ color: theme.primary_text }}>
                <a href="/privacy" className="hover:underline">
                    {language === 'en' ? 'Privacy Policy' : 'Política de Privacidade'}
                </a>
                {' | '}
                <a href="/terms" className="hover:underline">
                    {language === 'en' ? 'Terms of Service' : 'Termos e Condições'}
                </a>
                {' | '}
                <a href="/complaints" className="hover:underline">
                    {language === 'en' ? 'Complaint Book' : 'Livro de Reclamações'}
                </a>
            </p>
        </footer>
    );
}

export default Footer;