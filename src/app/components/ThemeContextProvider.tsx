"use client";

import { ThemeProvider } from './ThemeContext';
import Header from './Header';

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider>
            <Header />
            {children}
        </ThemeProvider>
    );
};

export default ThemeProviderWrapper;
