import React, { createContext, useContext, useState, ReactNode } from 'react';
export interface AppTheme {
  // Colors principales
  background: string;
  text: string;
  secondary: string;
  card: string;
  primary: string;
  onPrimary: string;
  success: string;
  danger: string;
}

export const lightTheme: AppTheme = {
  background: '#FFFFFF',
  text: '#111827',
    secondary: '#6B7280',
    card: '#F3F4F6',
    primary: '#4F46E5',
    onPrimary: '#FFFFFF',
    success: '#059669',
    danger: '#DC2626',
};

export const darkTheme: AppTheme = {
  background: '#1F2937',
  text: '#F9FAFB',
    secondary: '#9CA3AF',
    card: '#374151',
    primary: '#6366F1',
    onPrimary: '#FFFFFF',
    success: '#10B981',
    danger: '#EF4444',
}


interface ThemeContextType {
    theme: AppTheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [currentTheme, setCurrentTheme] = useState<AppTheme>(lightTheme);

    const toggleTheme = () => {
        setCurrentTheme(prev => (prev === lightTheme ? darkTheme : lightTheme));
    };

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};