import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState } from 'react';
import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Input, makeStyles, shorthands, tokens, } from '@fluentui/react-components';
import { Dismiss20Regular, Search20Regular } from '@fluentui/react-icons';
import { FLUENT_ICON_ITEMS, getFluentIconComponent, } from './fluentIcons';
const useStyles = makeStyles({
    pickerRow: {
        display: 'flex',
        alignItems: 'stretch',
        columnGap: 0,
    },
    triggerButton: {
        minWidth: '180px',
        justifyContent: 'flex-start',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    triggerButtonFull: {
        minWidth: '180px',
        justifyContent: 'flex-start',
    },
    clearButton: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0,
        minWidth: 'auto',
        color: tokens.colorNeutralForeground3,
    },
    triggerContent: {
        display: 'inline-flex',
        alignItems: 'center',
        columnGap: tokens.spacingHorizontalS,
        minWidth: '140px',
        justifyContent: 'flex-start',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    iconPreview: {
        display: 'inline-flex',
        alignItems: 'center',
        color: tokens.colorBrandForeground1,
    },
    searchInput: {
        marginBottom: tokens.spacingVerticalM,
    },
    iconGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
        gap: tokens.spacingHorizontalS,
        maxHeight: '320px',
        overflowY: 'auto',
        ...shorthands.padding(tokens.spacingVerticalXS, 0),
    },
    iconTile: {
        display: 'flex',
        alignItems: 'center',
        columnGap: tokens.spacingHorizontalS,
        justifyContent: 'flex-start',
        width: '100%',
        ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
    },
    iconName: {
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground2,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    emptyText: {
        color: tokens.colorNeutralForeground3,
        fontStyle: 'italic',
    },
});
const DEFAULT_LIMIT = 160;
export const IconPickerDialog = ({ value, onChange, title = 'Select Fluent Icon', placeholder = 'Choose icon', maxResults = DEFAULT_LIMIT, }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const selectedIcon = getFluentIconComponent(value);
    const filteredItems = useMemo(() => {
        const term = search.trim().toLowerCase();
        const items = term
            ? FLUENT_ICON_ITEMS.filter((item) => item.name.toLowerCase().includes(term))
            : FLUENT_ICON_ITEMS;
        return items.slice(0, maxResults);
    }, [search, maxResults]);
    const handleSelect = (iconName) => {
        onChange(iconName);
        setOpen(false);
    };
    return (_jsxs("div", { className: classes.pickerRow, children: [_jsxs(Dialog, { open: open, onOpenChange: (_, data) => setOpen(data.open), children: [_jsx(DialogTrigger, { disableButtonEnhancement: true, children: _jsx(Button, { appearance: "outline", size: "small", className: value ? classes.triggerButton : classes.triggerButtonFull, children: _jsxs("span", { className: classes.triggerContent, children: [selectedIcon ? (_jsx("span", { className: classes.iconPreview, children: React.createElement(selectedIcon, { 'aria-hidden': true }) })) : null, value || placeholder] }) }) }), _jsx(DialogSurface, { children: _jsxs(DialogBody, { children: [_jsx(DialogTitle, { children: title }), _jsxs(DialogContent, { children: [_jsx(Input, { className: classes.searchInput, size: "small", value: search, onChange: (_, data) => setSearch(data.value), placeholder: "Search icons", contentBefore: _jsx(Search20Regular, {}) }), _jsx("div", { className: classes.iconGrid, children: filteredItems.length > 0 ? (filteredItems.map(({ name, Icon }) => (_jsxs(Button, { appearance: value === name ? 'primary' : 'subtle', className: classes.iconTile, onClick: () => handleSelect(name), children: [_jsx("span", { className: classes.iconPreview, children: _jsx(Icon, { "aria-hidden": true }) }), _jsx("span", { className: classes.iconName, children: name })] }, name)))) : (_jsx("span", { className: classes.emptyText, children: "No icons found." })) })] }), _jsx(Button, { appearance: "secondary", onClick: () => setOpen(false), children: "Close" })] }) })] }), value && (_jsx(Button, { appearance: "outline", size: "small", icon: _jsx(Dismiss20Regular, {}), className: classes.clearButton, onClick: () => onChange(undefined), "aria-label": "Clear selected icon" }))] }));
};
