import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { Text } from '@fluentui/react-components';
import { ControlType } from '../../templates.models';
import { findSection, findControl, updateSectionInList, updateControlInSections, } from './PropertyPanel.models';
import { usePropertyPanelStyles } from './PropertyPanel.styles';
import { StyleEditor } from './style-editor/StyleEditor';
import { ControlEditor } from './control-editors/ControlEditor';
import { CardEditor } from './control-editors/CardEditor';
import { SectionEditor } from './control-editors/SectionEditor';
import { GeneralEditor } from './general-editor/GeneralEditor';
import { FormFieldEditor } from './control-editors/FormFieldEditor';
export const PropertyPanel = (props) => {
    const { template, selectedElement, onTemplateChange, bindingPaths = [], bindingData = {}, } = props;
    const classes = usePropertyPanelStyles();
    // ---- Card helpers ----
    const updateCard = useCallback((partial) => {
        onTemplateChange({
            ...template,
            card: { ...template.card, ...partial },
        });
    }, [template, onTemplateChange]);
    // ---- Template root helpers ----
    const updateRoot = useCallback((partial) => {
        onTemplateChange({ ...template, ...partial });
    }, [template, onTemplateChange]);
    // ---- Section helpers ----
    const updateSection = useCallback((sectionId, partial) => {
        onTemplateChange({
            ...template,
            card: {
                ...template.card,
                sections: updateSectionInList(template.card.sections ?? [], sectionId, (s) => ({ ...s, ...partial })),
            },
        });
    }, [template, onTemplateChange]);
    // ---- Control helpers ----
    const updateControl = useCallback((controlId, partial) => {
        const updater = (c) => ({ ...c, ...partial });
        // Check if control is a direct card-level child
        const found = findControl(template, controlId);
        if (found && found.sectionId === '__card__') {
            onTemplateChange({
                ...template,
                card: {
                    ...template.card,
                    children: (template.card.children ?? []).map((c) => {
                        if (c.id === controlId)
                            return updater(c);
                        return c;
                    }),
                },
            });
        }
        else {
            onTemplateChange({
                ...template,
                card: {
                    ...template.card,
                    sections: updateControlInSections(template.card.sections ?? [], controlId, updater),
                },
            });
        }
    }, [template, onTemplateChange]);
    // ---- Collect InputField names + labels for binding ----
    const inputFieldInfo = useMemo(() => {
        const fields = [];
        const collect = (controls) => {
            controls?.forEach((c) => {
                if (c.type === ControlType.InputField) {
                    const f = c;
                    fields.push({ name: f.name, label: f.label });
                }
            });
        };
        collect(template.card.children);
        const walkSections = (sections) => {
            sections?.forEach((s) => {
                collect(s.children);
                walkSections(s.subsections);
            });
        };
        walkSections(template.card.sections);
        return fields;
    }, [template]);
    // ---- Rename field: update name in control + auto-update button prompts ----
    const renameField = useCallback((controlId, oldName, newName) => {
        if (oldName === newName)
            return;
        const pattern = new RegExp(`\\{${oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\}`, 'g');
        const replaceInPrompt = (c) => {
            if (c.type === ControlType.Button) {
                const btn = c;
                if (btn.prompt && pattern.test(btn.prompt)) {
                    return { ...btn, prompt: btn.prompt.replace(pattern, `{${newName}}`) };
                }
            }
            return c;
        };
        const updateSections = (secs) => secs.map((s) => ({
            ...s,
            children: s.children?.map(replaceInPrompt),
            subsections: s.subsections ? updateSections(s.subsections) : undefined,
        }));
        const updatedChildren = template.card.children?.map((c) => c.id === controlId
            ? { ...c, name: newName }
            : replaceInPrompt(c));
        const updatedSections = updateSections(template.card.sections ?? []).map((s) => ({
            ...s,
            children: s.children?.map((c) => c.id === controlId ? { ...c, name: newName } : c),
        }));
        onTemplateChange({
            ...template,
            card: {
                ...template.card,
                children: updatedChildren,
                sections: updatedSections,
            },
        });
    }, [template, onTemplateChange]);
    // ---- Resolve selected ----
    const selectedData = useMemo(() => {
        if (!selectedElement)
            return undefined;
        if (selectedElement.type === 'card')
            return { type: 'card', card: template.card };
        if (selectedElement.type === 'section') {
            const section = findSection(template.card.sections, selectedElement.id);
            return section ? { type: 'section', section } : undefined;
        }
        if (selectedElement.type === 'control') {
            const found = findControl(template, selectedElement.id);
            return found ? { type: 'control', ...found } : undefined;
        }
        return undefined;
    }, [selectedElement, template]);
    // ---- Main render ----
    if (!selectedData) {
        return (_jsx("div", { className: classes.empty, children: _jsx(Text, { size: 200, children: "Select an element from the tree to edit its properties" }) }));
    }
    if (selectedData.type === 'card') {
        return (_jsx(CardEditor, { template: template, onUpdateCard: updateCard, onUpdateRoot: updateRoot, classes: classes, bindingPaths: bindingPaths, className: classes.root }));
    }
    if (selectedData.type === 'section') {
        return (_jsx(SectionEditor, { section: selectedData.section, onUpdateSection: updateSection, classes: classes, bindingPaths: bindingPaths, className: classes.root }));
    }
    const { control } = selectedData;
    // InputField controls get the FormFieldEditor
    if (control.type === ControlType.InputField) {
        return (_jsxs("div", { className: classes.root, children: [_jsx(FormFieldEditor, { field: control, onUpdate: updateControl, onRenameField: renameField, existingNames: inputFieldInfo.map((f) => f.name), classes: classes, bindingPaths: bindingPaths }), _jsx(StyleEditor, { style: control.style, onChange: (s) => updateControl(control.id, { style: s }), classes: classes })] }));
    }
    return (_jsxs("div", { className: classes.root, children: [_jsx(GeneralEditor, { control: control, onUpdate: updateControl, classes: classes }), _jsx(ControlEditor, { control: control, onUpdate: updateControl, classes: classes, bindingPaths: bindingPaths, bindingData: bindingData, inputFieldInfo: inputFieldInfo }), _jsx(StyleEditor, { style: control.style, onChange: (s) => updateControl(control.id, { style: s }), classes: classes })] }));
};
