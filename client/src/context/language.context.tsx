import { createContext, useState } from 'react';

const LanguageContext = createContext({} as LanguageContextType);

type LanguageContextType = {
    language: 'pt' | 'en';
    setLanguage: (language: 'pt' | 'en') => void;
};

function LanguageProvider({ children }: React.PropsWithChildren) {
    const [language, setLanguage] = useState<'pt' | 'en'>('pt');

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageProvider, LanguageContext };