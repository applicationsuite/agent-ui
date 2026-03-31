import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { usePageLayoutStyles } from './PageLayout.styles';
export const PageLayout = (props) => {
    const { title, isSidebar = false, headerActions, toolbar, children, onClose, } = props;
    const classes = usePageLayoutStyles();
    const styles = useMemo(() => {
        const merge = (key) => mergeClasses(classes[key], isSidebar && classes[`${key}Sidebar`]);
        return {
            root: merge('root'),
            pageContainer: merge('pageContainer'),
            header: merge('header'),
            title: merge('title'),
            toolbar: merge('toolbar'),
        };
    }, [classes, isSidebar]);
    return (_jsx("div", { className: styles.root, children: _jsxs("div", { className: styles.pageContainer, children: [_jsxs("div", { className: styles.header, children: [_jsx("div", { className: classes.headerTitleGroup, children: _jsx("div", { className: styles.title, children: title }) }), _jsxs("div", { className: classes.headerActions, children: [headerActions, isSidebar && onClose && (_jsx("button", { className: classes.headerCloseButton, type: "button", title: `Close ${title.toLowerCase()}`, "aria-label": `Close ${title.toLowerCase()}`, onClick: onClose, children: _jsx(DismissRegular, { fontSize: 18 }) }))] })] }), toolbar && _jsx("div", { className: styles.toolbar, children: toolbar }), _jsx("div", { className: classes.content, children: children })] }) }));
};
