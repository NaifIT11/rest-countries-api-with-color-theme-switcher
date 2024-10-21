"use client";

import { ThemeProvider } from './ThemeContext';

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
};

export default ThemeProviderWrapper;
