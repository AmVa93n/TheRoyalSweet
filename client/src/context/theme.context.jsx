import { createContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
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