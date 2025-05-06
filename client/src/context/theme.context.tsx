import { createContext } from 'react';

const ThemeContext = createContext({} as ThemeContextType);

type ThemeContextType = {
    primary_bg: string;
    primary_text: string;
    secondary_bg1: string;
    secondary_bg2: string;
    secondary_text: string;
};

function ThemeProvider({ children }: React.PropsWithChildren) {
    const theme = {
        primary_bg: 'rgb(139, 69, 19)',
        primary_text: 'white',
        secondary_bg1: 'rgb(254, 222, 226)',
        secondary_bg2: 'rgb(255, 253, 208)',
        secondary_text: 'black',
    };
    
    return (
        <ThemeContext.Provider value={theme}>
        {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider };