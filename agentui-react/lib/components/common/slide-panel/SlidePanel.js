import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Button, mergeClasses } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { useSlidePanelStyles } from './SlidePanel.styles';
export const SlidePanel = (props) => {
    const { title, icon, children, buttons, disabled = false, isSidebar = false, error, width, onClose, } = props;
    const { submitLabel = 'Submit', cancelLabel = 'Cancel', submitDisabled = false, onSubmit, onCancel, } = buttons ?? {};
    const classes = useSlidePanelStyles();
    const buttonSize = isSidebar ? 'small' : 'medium';
    const styles = useMemo(() => {
        const merge = (key) => mergeClasses(classes[key], isSidebar && classes[`${key}Sidebar`]);
        return {
            panel: merge('panel'),
            header: merge('header'),
            titleIcon: merge('titleIcon'),
            title: merge('title'),
            body: merge('body'),
            footer: merge('footer'),
            primaryButton: merge('primaryButton'),
            secondaryButton: merge('secondaryButton'),
        };
    }, [classes, isSidebar]);
    return (_jsxs("div", { className: classes.layer, children: [_jsx("div", { className: classes.backdrop, onClick: onClose }), _jsxs("section", { className: styles.panel, style: width ? { width } : undefined, role: "dialog", "aria-labelledby": "slide-panel-title", "aria-modal": "true", children: [_jsxs("div", { className: styles.header, children: [_jsx("div", { className: classes.titleGroup, children: _jsxs("div", { className: classes.titleRow, children: [icon && _jsx("span", { className: styles.titleIcon, children: icon }), _jsx("span", { className: styles.title, id: "slide-panel-title", children: title })] }) }), onClose && (_jsx(Button, { appearance: "subtle", className: classes.closeButton, icon: _jsx(DismissRegular, {}), "aria-label": "Close panel", disabled: disabled, onClick: onClose }))] }), _jsxs("div", { className: styles.body, children: [error && _jsx("div", { className: classes.errorBanner, children: error }), children] }), buttons && (onSubmit || onCancel) && (_jsxs("div", { className: styles.footer, children: [onSubmit && (_jsx(Button, { appearance: "primary", size: buttonSize, className: styles.primaryButton, disabled: submitDisabled || disabled, onClick: onSubmit, children: submitLabel })), onCancel && (_jsx(Button, { appearance: "secondary", size: buttonSize, className: styles.secondaryButton, disabled: disabled, onClick: onCancel, children: cancelLabel }))] }))] })] }));
};
