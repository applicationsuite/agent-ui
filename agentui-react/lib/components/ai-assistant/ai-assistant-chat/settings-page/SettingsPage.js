import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Switch, mergeClasses } from '@fluentui/react-components';
import { useMemo } from 'react';
import { useSettingsPageStyles } from './SettingsPage.styles';
import { PageLayout } from '../../../common/page-layout';
import { AIAssistantFeature, hasFeature } from '../../AIAssistant.models';
export const SettingsPage = (props) => {
    const { isDeveloperMode, isSidebar = false, onClose, onToggleDeveloperMode, useRawResponse, onToggleRawResponse, features, } = props;
    const classes = useSettingsPageStyles();
    const mergedStyles = useMemo(() => {
        const merge = (key) => mergeClasses(classes[key], isSidebar && classes[`${key}Sidebar`]);
        return {
            description: merge('description'),
            body: merge('body'),
            section: merge('section'),
            settingRow: merge('settingRow'),
            settingLabel: merge('settingLabel'),
            settingDescription: merge('settingDescription'),
        };
    }, [classes, isSidebar]);
    return (_jsx(PageLayout, { title: "Settings", isSidebar: isSidebar, onClose: onClose, children: _jsxs("div", { className: mergedStyles.body, children: [_jsx("p", { className: mergedStyles.description, children: "Controls in this area affect the assistant workspace rather than a single conversation." }), _jsx("section", { className: mergedStyles.section, children: hasFeature(features, AIAssistantFeature.DeveloperTools) && (_jsxs(_Fragment, { children: [_jsxs("div", { className: mergedStyles.settingRow, children: [_jsxs("div", { className: classes.settingCopy, children: [_jsx("span", { className: mergedStyles.settingLabel, children: "Agent activity" }), _jsx("span", { className: mergedStyles.settingDescription, children: "Show agent background activities while responding to user prompts" })] }), _jsx(Switch, { checked: isDeveloperMode, label: isDeveloperMode ? 'On' : 'Off', labelPosition: "before", size: isSidebar ? 'small' : 'medium', onChange: onToggleDeveloperMode })] }), _jsx("hr", { className: classes.settingDivider }), _jsxs("div", { className: mergedStyles.settingRow, children: [_jsxs("div", { className: classes.settingCopy, children: [_jsx("span", { className: mergedStyles.settingLabel, children: "Raw response" }), _jsx("span", { className: mergedStyles.settingDescription, children: "Skip template resolution and show the raw assistant response" })] }), _jsx(Switch, { checked: useRawResponse, label: useRawResponse ? 'On' : 'Off', labelPosition: "before", size: isSidebar ? 'small' : 'medium', onChange: onToggleRawResponse })] })] })) })] }) }));
};
