import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { getTheme } from './ThemeProvider.utils';
import { FluentProvider } from '@fluentui/react-components';
import { Theme } from './ThemeProvider.models';
import { ThemeContext } from './ThemeProvider.context';
export const ThemeProvider = (props) => {
    const { theme, children, ...rest } = props;
    const [currentTheme, setCurrentTheme] = useState(theme ?? Theme.WebLight);
    const setTheme = useCallback((theme) => {
        setCurrentTheme(theme);
    }, []);
    const selectedTheme = getTheme(currentTheme);
    return (_jsx(ThemeContext.Provider, { value: { currentTheme, setTheme }, children: _jsx(FluentProvider, { theme: selectedTheme, style: { height: '100%' }, ...rest, children: children }) }));
};
