import { createContext, useState } from 'react';

const LanguageContext = createContext({} as LanguageContextType);

type LanguageContextType = {
    language: string;
    setLanguage: (language: string) => void;
};

function LanguageProvider({ children }: React.PropsWithChildren) {
    const [language, setLanguage] = useState('pt')

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