import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { ChevronDown20Regular } from '@fluentui/react-icons';
import { cardStyles } from './Card.styles';
import { toReactStyle, toTextStyle } from '../common.utils';
const useStyles = makeStyles(cardStyles);
export const Card = ({ title, subtitle, isCollapsible = false, defaultExpanded = true, style, children, headerActions, footer, footerAlignment, height, }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(defaultExpanded);
    const rootStyle = {
        ...toReactStyle(style),
        ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    };
    const footerClass = mergeClasses(classes.footer, footerAlignment === 'start' && classes.footerStart, footerAlignment === 'center' && classes.footerCenter, footerAlignment === 'space-between' && classes.footerSpaceBetween);
    return (_jsxs("div", { className: classes.root, style: rootStyle, children: [_jsxs("div", { className: mergeClasses(classes.header, !isCollapsible && classes.headerStatic), onClick: isCollapsible ? () => setExpanded((p) => !p) : undefined, children: [_jsxs("div", { className: classes.headerLeft, children: [_jsx("span", { className: classes.title, style: toTextStyle(style), children: title }), subtitle && (_jsxs("span", { className: classes.subtitle, style: toTextStyle(style), children: ["| ", subtitle] }))] }), expanded && headerActions && (_jsx("div", { className: classes.headerActions, onClick: (e) => e.stopPropagation(), children: headerActions })), isCollapsible && (_jsx(ChevronDown20Regular, { className: mergeClasses(classes.chevron, !expanded && classes.chevronCollapsed) }))] }), expanded && (_jsxs(_Fragment, { children: [_jsx("div", { className: classes.body, children: children }), footer && _jsx("div", { className: footerClass, children: footer })] }))] }));
};
