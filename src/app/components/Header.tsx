import { Moon, Sun } from "lucide-react"; // Import both icons
import { useTheme } from './ThemeContext'; // Import the custom hook

export default function Header() {
    const { isDarkMode, toggleTheme } = useTheme(); // Use the theme context

    return (
        <div className="py-4">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">Where in the world?</h1>
                    <button
                        onClick={toggleTheme} // Add the click handler
                        className="inline-flex gap-2 items-center p-2 rounded bg-gray-200 dark:bg-gray-700 transition-colors"
                    >
                        {isDarkMode ? <Sun /> : <Moon />} {/* Toggle icon based on theme */}
                        <span className="text-base font-semibold">
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
