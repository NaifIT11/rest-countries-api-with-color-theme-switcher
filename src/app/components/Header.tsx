"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from './ThemeContext';

export default function Header() {
    const { isDarkMode, toggleTheme } = useTheme(); // Use the theme context

    return (
        <div className="py-4">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">Where in the world?</h1>
                    <button
                        onClick={toggleTheme}
                        className="inline-flex gap-2 items-center p-2"
                    >
                        {isDarkMode ? <Sun /> : <Moon />}
                        <span className="text-base font-semibold">
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
