import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { ChevronDown20Regular } from '@fluentui/react-icons';
import { sectionStyles } from './Section.styles';
import { toReactStyle, toTextStyle } from '../common.utils';
const useStyles = makeStyles(sectionStyles);
export const Section = ({ label, isCollapsible = false, defaultExpanded = true, nested, style, children, headerActions, footer, footerAlignment, height, }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(defaultExpanded);
    const rootStyle = {
        ...toReactStyle(style),
        ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    };
    const footerClass = mergeClasses(classes.footer, footerAlignment === 'start' && classes.footerStart, footerAlignment === 'center' && classes.footerCenter, footerAlignment === 'space-between' && classes.footerSpaceBetween);
    return (_jsxs("div", { className: !nested ? classes.root : undefined, style: rootStyle, children: [_jsxs("div", { className: mergeClasses(classes.header, !isCollapsible && classes.headerStatic), onClick: isCollapsible ? () => setExpanded((p) => !p) : undefined, children: [_jsx("span", { className: classes.title, style: toTextStyle(style), children: label }), expanded && headerActions && (_jsx("div", { className: classes.headerActions, onClick: (e) => e.stopPropagation(), children: headerActions })), isCollapsible && (_jsx(ChevronDown20Regular, { className: mergeClasses(classes.chevron, !expanded && classes.chevronCollapsed) }))] }), _jsx("div", { className: expanded ? classes.body : classes.bodyHidden, children: children }), expanded && footer && _jsx("div", { className: footerClass, children: footer })] }));
};
