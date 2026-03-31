import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tree, TreeItem, TreeItemLayout, Button, Text, Tooltip, Menu, MenuTrigger, MenuPopover, MenuList, MenuItem, MenuDivider, mergeClasses, } from '@fluentui/react-components';
import { DeleteRegular, DocumentRegular, GridRegular, TextFieldRegular, TableRegular, ImageRegular, ButtonRegular, BadgeRegular, SlideLayoutRegular, AddRegular, FormNewRegular, LineHorizontal1Regular, } from '@fluentui/react-icons';
import { ControlType, getOrderedItems } from '../../templates.models';
import { CONTROL_LABELS } from './TemplateTreeView.models';
import { useTemplateTreeViewStyles } from './TemplateTreeView.styles';
import { useTreeDragDrop, useTreeOpenState, useTreeSelection, } from './TemplateTreeView.hooks';
const CONTROL_ICONS = {
    [ControlType.Field]: _jsx(TextFieldRegular, {}),
    [ControlType.Button]: _jsx(ButtonRegular, {}),
    [ControlType.Table]: _jsx(TableRegular, {}),
    [ControlType.Badge]: _jsx(BadgeRegular, {}),
    [ControlType.Image]: _jsx(ImageRegular, {}),
    [ControlType.ProgressBar]: _jsx(SlideLayoutRegular, {}),
    [ControlType.InputField]: _jsx(FormNewRegular, {}),
    [ControlType.Separator]: _jsx(LineHorizontal1Regular, {}),
};
export const TemplateTreeView = (props) => {
    const { template, selectedElement, onSelectElement, onAddSection, onRemoveSection, onAddControl, onRemoveControl, onAddControlToCard, onRemoveControlFromCard, onMoveNode, } = props;
    const classes = useTemplateTreeViewStyles();
    const { draggingId, handleDragStart, handleDragEnd, handleDragOver, handleDragLeave, handleDrop, getDropClass, } = useTreeDragDrop(template.card.sections ?? [], onMoveNode, classes);
    const { openItemsArray, handleOpenChange } = useTreeOpenState(selectedElement, template.card.sections ?? [], template.card.children);
    const { isSelected, treeContainerRef } = useTreeSelection(selectedElement, onSelectElement);
    const renderAddMenu = (tooltip, onAddSectionClick, onAddControlClick) => (_jsxs(Menu, { children: [_jsx(MenuTrigger, { disableButtonEnhancement: true, children: _jsx(Tooltip, { content: tooltip, relationship: "label", children: _jsx(Button, { appearance: "subtle", size: "small", icon: _jsx(AddRegular, {}) }) }) }), _jsx(MenuPopover, { children: _jsxs(MenuList, { children: [_jsx(MenuItem, { icon: _jsx(GridRegular, {}), onClick: onAddSectionClick, children: "Section" }), _jsx(MenuDivider, {}), Object.values(ControlType)
                            .map((ct) => (_jsx(MenuItem, { icon: CONTROL_ICONS[ct], onClick: () => onAddControlClick(ct), children: CONTROL_LABELS[ct] }, ct)))] }) })] }));
    const renderControl = (control, parentId, indexInParent, onRemove) => {
        return (_jsx(TreeItem, { value: `control-${control.id}`, itemType: "leaf", "data-select-type": "control", "data-select-id": control.id, children: _jsx(TreeItemLayout, { draggable: true, onDragStart: (e) => {
                    e.stopPropagation();
                    handleDragStart(e, {
                        type: 'control',
                        id: control.id,
                        parentId,
                    });
                }, onDragEnd: handleDragEnd, className: mergeClasses(isSelected('control', control.id) ? classes.selectedItem : undefined, getDropClass(control.id), draggingId === control.id ? classes.dragging : undefined), onDragOver: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDragOver(e, control.id, 'control');
                }, onDragLeave: (e) => {
                    e.stopPropagation();
                    handleDragLeave();
                }, onDrop: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDrop(e, 'control', control.id, parentId, indexInParent);
                }, iconBefore: CONTROL_ICONS[control.type], aside: _jsx("div", { "data-aside": true, children: _jsx(Tooltip, { content: "Remove control", relationship: "label", children: _jsx(Button, { className: classes.deleteButton, appearance: "subtle", size: "small", icon: _jsx(DeleteRegular, {}), onClick: (e) => {
                                e.stopPropagation();
                                onRemove(control.id);
                            } }) }) }), children: control.type === ControlType.Separator
                    ? (control.label || CONTROL_LABELS[control.type])
                    : (control.label ??
                        `${CONTROL_LABELS[control.type]} (${control.id.slice(0, 6)})`) }) }, control.id));
    };
    const renderSection = (section, parentId, indexInParent) => {
        const label = typeof section.label === 'string'
            ? section.label
            : (section.label?.value ?? section.id);
        return (_jsxs(TreeItem, { value: `section-${section.id}`, itemType: "branch", "data-select-type": "section", "data-select-id": section.id, children: [_jsx(TreeItemLayout, { draggable: true, onDragStart: (e) => {
                        e.stopPropagation();
                        handleDragStart(e, {
                            type: 'section',
                            id: section.id,
                            parentId,
                        });
                    }, onDragEnd: handleDragEnd, className: mergeClasses(isSelected('section', section.id)
                        ? classes.selectedItem
                        : undefined, getDropClass(section.id), draggingId === section.id ? classes.dragging : undefined), onDragOver: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDragOver(e, section.id, 'section');
                    }, onDragLeave: (e) => {
                        e.stopPropagation();
                        handleDragLeave();
                    }, onDrop: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDrop(e, 'section', section.id, parentId, indexInParent);
                    }, iconBefore: _jsx(GridRegular, {}), aside: _jsxs("div", { "data-aside": true, onClick: (e) => e.stopPropagation(), onMouseDown: (e) => e.stopPropagation(), children: [renderAddMenu('Add element', () => onAddSection(section.id), (ct) => onAddControl(section.id, ct)), _jsx(Tooltip, { content: "Remove section", relationship: "label", children: _jsx(Button, { className: classes.deleteButton, appearance: "subtle", size: "small", icon: _jsx(DeleteRegular, {}), onClick: () => onRemoveSection(section.id) }) })] }), children: label }), _jsx(Tree, { children: getOrderedItems(section.children, section.subsections, section.ordering).map((entry, i) => entry.type === 'control'
                        ? renderControl(entry.item, section.id, i, (controlId) => onRemoveControl(section.id, controlId))
                        : renderSection(entry.item, section.id, i)) })] }, section.id));
    };
    const renderCardNode = () => (_jsxs(TreeItem, { value: "card", itemType: "branch", "data-select-type": "card", "data-select-id": "card", children: [_jsx(TreeItemLayout, { className: isSelected('card', 'card') ? classes.selectedItem : undefined, iconBefore: _jsx(DocumentRegular, {}), aside: _jsx("div", { "data-aside": true, onClick: (e) => e.stopPropagation(), onMouseDown: (e) => e.stopPropagation(), children: renderAddMenu('Add element to card', () => onAddSection(), onAddControlToCard) }), children: typeof template.card.title === 'string'
                    ? template.card.title
                    : (template.card.title?.value ?? 'Card') }), _jsx(Tree, { children: getOrderedItems(template.card.children, template.card.sections, template.card.ordering).map((entry, i) => entry.type === 'control'
                    ? renderControl(entry.item, 'card', i, onRemoveControlFromCard)
                    : renderSection(entry.item, 'card', i)) })] }));
    const renderHeader = () => (_jsx("div", { className: classes.header, children: _jsx(Text, { weight: "semibold", size: 200, className: classes.headerLabel, children: "Structure" }) }));
    return (_jsxs("div", { className: classes.root, children: [renderHeader(), _jsx("div", { className: classes.treeContainer, ref: treeContainerRef, children: _jsx(Tree, { "aria-label": "Template structure", openItems: openItemsArray, onOpenChange: handleOpenChange, children: renderCardNode() }) })] }));
};
