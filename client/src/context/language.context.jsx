import { createContext, useState } from 'react';

const LanguageContext = createContext();

function LanguageProvider(props) {
    const [language, setLanguage] = useState('pt')

    function toggleLanguage() {
        if (language === 'en') setLanguage('pt')
        else setLanguage('en')
    }

    return (
        <LanguageContext.Provider value={{
            language,
            toggleLanguage
        }}>
            {props.children}
        </LanguageContext.Provider>
    );
};

export { LanguageProvider, LanguageContext };