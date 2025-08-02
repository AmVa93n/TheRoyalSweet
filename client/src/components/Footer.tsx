import { useStore } from '../store';

function Footer() {
    const { language } = useStore();

    return (
        <footer className={`text-center py-6 px-4 mt-auto bg-[#643843]`}>
            <p className={`text-base text-white`}>
                © {new Date().getFullYear()} The Royal Sweet. All rights reserved.
            </p>
            <p className={`text-sm mt-2 text-white`}>
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