import { useStore } from '../store';
import { Link } from 'react-router-dom';

function Footer() {
    const { language } = useStore();

    return (
        <footer className={`text-center py-6 px-4 mt-auto bg-[#593b3e]`}>
            <p className={`text-base text-white`}>
                © {new Date().getFullYear()} The Royal Sweet. {language === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}
            </p>
            <p className={`text-sm mt-2 text-white`}>
                <Link to="/privacy-policy" className="hover:underline">
                    {language === 'en' ? 'Privacy Policy' : 'Política de Privacidade'}
                </Link>
                {' | '}
                <Link to="/terms-and-conditions" className="hover:underline">
                    {language === 'en' ? 'Terms of Service' : 'Termos e Condições'}
                </Link>
                {' | '}
                <Link to="https://www.livroreclamacoes.pt/inicio/" className="hover:underline">
                    {language === 'en' ? 'Complaint Book' : 'Livro de Reclamações'}
                </Link>
            </p>
        </footer>
    );
}

export default Footer;