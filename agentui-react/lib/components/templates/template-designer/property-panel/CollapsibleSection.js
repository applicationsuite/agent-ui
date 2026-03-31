import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Text, Label, mergeClasses } from '@fluentui/react-components';
import { ChevronDown20Regular } from '@fluentui/react-icons';
export const FieldGroup = ({ label, children, className, }) => (_jsxs("div", { className: className, children: [_jsx(Label, { weight: "semibold", size: "small", children: label }), children] }));
export const CollapsibleSection = ({ title, children, classes, defaultExpanded = true, }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
    return (_jsxs("div", { className: classes.sectionGroup, children: [_jsxs("div", { className: classes.sectionHeader, onClick: () => setExpanded((v) => !v), children: [_jsx(Text, { weight: "semibold", size: 200, className: classes.sectionTitle, children: title }), _jsx(ChevronDown20Regular, { className: mergeClasses(classes.sectionChevron, !expanded && classes.sectionChevronCollapsed) })] }), _jsx("div", { className: mergeClasses(classes.sectionBody, !expanded && classes.sectionBodyHidden), children: children })] }));
};
