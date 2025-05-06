import { createContext, useState } from 'react';

const LanguageContext = createContext();

function LanguageProvider(props) {
    const [language, setLanguage] = useState('pt')

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage
        }}>
            {props.children}
        </LanguageContext.Provider>
    );
};

export { LanguageProvider, LanguageContext };