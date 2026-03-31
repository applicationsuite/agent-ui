import { ControlType } from '../templates.models';
import { TemplateDesignerActionType, } from './TemplateDesigner.models';
export var TEMPLATE_DESIGNER_DISPATCH_ACTIONS;
(function (TEMPLATE_DESIGNER_DISPATCH_ACTIONS) {
    TEMPLATE_DESIGNER_DISPATCH_ACTIONS["SET_TEMPLATE"] = "SET_TEMPLATE";
    TEMPLATE_DESIGNER_DISPATCH_ACTIONS["SET_MODE"] = "SET_MODE";
    TEMPLATE_DESIGNER_DISPATCH_ACTIONS["SET_SELECTED_ELEMENT"] = "SET_SELECTED_ELEMENT";
    TEMPLATE_DESIGNER_DISPATCH_ACTIONS["SET_IS_DIRTY"] = "SET_IS_DIRTY";
    TEMPLATE_DESIGNER_DISPATCH_ACTIONS["SET_BINDING_PATHS"] = "SET_BINDING_PATHS";
    TEMPLATE_DESIGNER_DISPATCH_ACTIONS["SET_BINDING_DATA"] = "SET_BINDING_DATA";
})(TEMPLATE_DESIGNER_DISPATCH_ACTIONS || (TEMPLATE_DESIGNER_DISPATCH_ACTIONS = {}));
export class TemplateDesignerActions {
    constructor(dispatch, getState, props) {
        Object.defineProperty(this, "dispatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "props", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "savedTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "updateProps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (props) => {
                this.props = props;
            }
        });
        Object.defineProperty(this, "initialize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (template, error) => {
                const tmpl = template ?? this.createDefaultTemplate();
                this.savedTemplate = tmpl;
                if (error) {
                    this.dispatch({
                        type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_TEMPLATE,
                        data: { data: this.createDefaultTemplate(), loading: false, error },
                    });
                }
                else {
                    this.dispatch({
                        type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_TEMPLATE,
                        data: { data: tmpl, loading: false },
                    });
                }
            }
        });
        Object.defineProperty(this, "handleAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (action, payload) => {
                switch (action) {
                    case TemplateDesignerActionType.Save:
                        this.save();
                        break;
                    case TemplateDesignerActionType.SetMode:
                        this.setMode(payload);
                        break;
                    case TemplateDesignerActionType.SelectElement:
                        this.selectElement(payload);
                        break;
                    default:
                        break;
                }
            }
        });
        Object.defineProperty(this, "save", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const { template } = this.getState();
                if (template.data) {
                    this.savedTemplate = template.data;
                    this.props.onSave?.(template.data, this.getState().bindingData);
                    this.dispatch({
                        type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_IS_DIRTY,
                        data: false,
                    });
                }
            }
        });
        Object.defineProperty(this, "revert", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this.savedTemplate) {
                    this.dispatch({
                        type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_TEMPLATE,
                        data: { data: this.savedTemplate, loading: false },
                    });
                    this.dispatch({
                        type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_IS_DIRTY,
                        data: false,
                    });
                    this.selectElement(undefined);
                }
            }
        });
        Object.defineProperty(this, "setMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (mode) => {
                this.dispatch({
                    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_MODE,
                    data: mode,
                });
            }
        });
        Object.defineProperty(this, "selectElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (element) => {
                this.dispatch({
                    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_SELECTED_ELEMENT,
                    data: element,
                });
            }
        });
        Object.defineProperty(this, "updateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (template) => {
                this.dispatch({
                    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_TEMPLATE,
                    data: { data: template, loading: false },
                });
                this.dispatch({
                    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_IS_DIRTY,
                    data: true,
                });
            }
        });
        Object.defineProperty(this, "addSection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (parentSectionId) => {
                const { template } = this.getState();
                if (!template.data)
                    return;
                const newSection = {
                    id: crypto.randomUUID().slice(0, 8),
                    label: 'New Section',
                    isCollapsible: true,
                    children: [],
                };
                let updatedSections;
                const card = template.data.card;
                let updatedOrdering = card.ordering;
                if (parentSectionId) {
                    updatedSections = this.addSubsection(card.sections ?? [], parentSectionId, newSection);
                    // Update parent section's ordering
                    updatedSections = this.appendToSectionOrdering(updatedSections, parentSectionId, newSection.id);
                }
                else {
                    updatedSections = [...(card.sections ?? []), newSection];
                    updatedOrdering = [
                        ...(card.ordering ?? this.buildOrdering(card.children ?? [], card.sections ?? [])),
                        newSection.id,
                    ];
                }
                this.updateTemplate({
                    ...template.data,
                    card: { ...card, sections: updatedSections, ordering: updatedOrdering },
                });
                this.selectElement({ type: 'section', id: newSection.id });
            }
        });
        Object.defineProperty(this, "removeSection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sectionId) => {
                const { template } = this.getState();
                if (!template.data)
                    return;
                const card = template.data.card;
                const updatedSections = this.removeSectionFromList(card.sections ?? [], sectionId);
                const updatedOrdering = card.ordering?.filter((id) => id !== sectionId);
                this.updateTemplate({
                    ...template.data,
                    card: { ...card, sections: updatedSections, ordering: updatedOrdering },
                });
                this.selectElement(undefined);
            }
        });
        Object.defineProperty(this, "addControl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sectionId, controlType) => {
                const { template } = this.getState();
                if (!template.data)
                    return;
                const newControl = this.createDefaultControl(controlType);
                const updatedSections = this.addControlToSection(template.data.card.sections ?? [], sectionId, newControl);
                // Append to section ordering
                const finalSections = this.appendToSectionOrdering(updatedSections, sectionId, newControl.id);
                this.updateTemplate({
                    ...template.data,
                    card: { ...template.data.card, sections: finalSections },
                });
                this.selectElement({ type: 'control', id: newControl.id });
            }
        });
        Object.defineProperty(this, "removeControl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sectionId, controlId) => {
                const { template } = this.getState();
                if (!template.data)
                    return;
                const updatedSections = this.removeControlFromSection(template.data.card.sections ?? [], sectionId, controlId);
                // Remove from section ordering
                const finalSections = this.removeFromSectionOrdering(updatedSections, sectionId, controlId);
                this.updateTemplate({
                    ...template.data,
                    card: { ...template.data.card, sections: finalSections },
                });
                this.selectElement(undefined);
            }
        });
        Object.defineProperty(this, "addControlToCard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (controlType) => {
                const { template } = this.getState();
                if (!template.data)
                    return;
                const card = template.data.card;
                const newControl = this.createDefaultControl(controlType);
                const updatedOrdering = [
                    ...(card.ordering ?? this.buildOrdering(card.children ?? [], card.sections ?? [])),
                    newControl.id,
                ];
                this.updateTemplate({
                    ...template.data,
                    card: {
                        ...card,
                        children: [...(card.children ?? []), newControl],
                        ordering: updatedOrdering,
                    },
                });
                this.selectElement({ type: 'control', id: newControl.id });
            }
        });
        Object.defineProperty(this, "removeControlFromCard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (controlId) => {
                const { template } = this.getState();
                if (!template.data)
                    return;
                const card = template.data.card;
                this.updateTemplate({
                    ...template.data,
                    card: {
                        ...card,
                        children: (card.children ?? []).filter((c) => c.id !== controlId),
                        ordering: card.ordering?.filter((id) => id !== controlId),
                    },
                });
                this.selectElement(undefined);
            }
        });
        Object.defineProperty(this, "setBindingPaths", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (paths) => {
                this.dispatch({
                    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_BINDING_PATHS,
                    data: paths,
                });
            }
        });
        Object.defineProperty(this, "setBindingData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (data) => {
                this.dispatch({
                    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_BINDING_DATA,
                    data,
                });
            }
        });
        Object.defineProperty(this, "moveNode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (drag, drop) => {
                const { template } = this.getState();
                if (!template.data)
                    return;
                const card = template.data.card;
                let cardChildren = [...(card.children ?? [])];
                let sections = this.deepCloneSections(card.sections ?? []);
                let cardOrdering = [...(card.ordering ?? this.buildOrdering(cardChildren, card.sections ?? []))];
                // ── Helper: get / set ordering for a section ──
                const getSectionOrdering = (sec) => sec.ordering ?? this.buildOrdering(sec.children ?? [], sec.subsections ?? []);
                const setSectionOrdering = (secs, sectionId, ordering) => secs.map((s) => {
                    if (s.id === sectionId)
                        return { ...s, ordering };
                    if (s.subsections)
                        return { ...s, subsections: setSectionOrdering(s.subsections, sectionId, ordering) };
                    return s;
                });
                // ── 1. Remove the dragged item from its source ──
                if (drag.type === 'control') {
                    let control;
                    if (drag.parentId === 'card') {
                        const idx = cardChildren.findIndex((c) => c.id === drag.id);
                        if (idx === -1)
                            return;
                        control = cardChildren[idx];
                        cardChildren.splice(idx, 1);
                        cardOrdering = cardOrdering.filter((id) => id !== drag.id);
                    }
                    else {
                        const result = this.extractControlFromSections(sections, drag.parentId, drag.id);
                        control = result.control;
                        sections = result.sections;
                        // Remove from source section's ordering
                        const srcSec = this.findSection(sections, drag.parentId);
                        if (srcSec) {
                            sections = setSectionOrdering(sections, drag.parentId, getSectionOrdering(srcSec).filter((id) => id !== drag.id));
                        }
                    }
                    if (!control)
                        return;
                    // ── 2. Insert control at target ──
                    if (drop.parentId === 'card') {
                        // Determine insertion index in children array: append at end
                        cardChildren.push(control);
                        // Insert in ordering at the unified drop index
                        const adjustedDropIndex = this.adjustOrderingIndex(cardOrdering, drop.index, drag.parentId === 'card');
                        cardOrdering.splice(adjustedDropIndex, 0, control.id);
                    }
                    else {
                        sections = this.insertControlIntoSections(sections, drop.parentId, (this.findSection(sections, drop.parentId)?.children?.length ?? 0), control);
                        // Insert in target section's ordering
                        const tgtSec = this.findSection(sections, drop.parentId);
                        if (tgtSec) {
                            const tgtOrdering = getSectionOrdering(tgtSec);
                            const adjustedDropIndex = this.adjustOrderingIndex(tgtOrdering, drop.index, drag.parentId === drop.parentId);
                            tgtOrdering.splice(adjustedDropIndex, 0, control.id);
                            sections = setSectionOrdering(sections, drop.parentId, tgtOrdering);
                        }
                    }
                }
                else {
                    // ── Moving a section ──
                    const result = this.extractSection(sections, drag.id);
                    const section = result.section;
                    sections = result.sections;
                    if (!section)
                        return;
                    // Remove from source ordering
                    if (drag.parentId === 'card') {
                        cardOrdering = cardOrdering.filter((id) => id !== drag.id);
                    }
                    else {
                        const srcSec = this.findSection(sections, drag.parentId);
                        if (srcSec) {
                            sections = setSectionOrdering(sections, drag.parentId, getSectionOrdering(srcSec).filter((id) => id !== drag.id));
                        }
                    }
                    // Insert section at target
                    if (drop.parentId === 'card') {
                        sections.push(section);
                        const adjustedDropIndex = this.adjustOrderingIndex(cardOrdering, drop.index, drag.parentId === 'card');
                        cardOrdering.splice(adjustedDropIndex, 0, section.id);
                    }
                    else {
                        sections = this.insertSectionIntoSections(sections, drop.parentId, (this.findSection(sections, drop.parentId)?.subsections?.length ?? 0), section);
                        const tgtSec = this.findSection(sections, drop.parentId);
                        if (tgtSec) {
                            const tgtOrdering = getSectionOrdering(tgtSec);
                            const adjustedDropIndex = this.adjustOrderingIndex(tgtOrdering, drop.index, drag.parentId === drop.parentId);
                            tgtOrdering.splice(adjustedDropIndex, 0, section.id);
                            sections = setSectionOrdering(sections, drop.parentId, tgtOrdering);
                        }
                    }
                }
                this.updateTemplate({
                    ...template.data,
                    card: { ...card, children: cardChildren, sections, ordering: cardOrdering },
                });
            }
        });
        Object.defineProperty(this, "findSection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, id) => {
                for (const s of sections) {
                    if (s.id === id)
                        return s;
                    if (s.subsections) {
                        const found = this.findSection(s.subsections, id);
                        if (found)
                            return found;
                    }
                }
                return undefined;
            }
        });
        /** Build a default ordering from separate children + sections arrays. */
        Object.defineProperty(this, "buildOrdering", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (children, sections) => [...children.map((c) => c.id), ...sections.map((s) => s.id)]
        });
        /**
         * Clamp the unified drop index to the ordering length.
         * The item was already removed from the ordering before calling this,
         * so no same-parent adjustment is needed.
         */
        Object.defineProperty(this, "adjustOrderingIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (ordering, index, _sameParent) => Math.min(index, ordering.length)
        });
        Object.defineProperty(this, "deepCloneSections", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections) => sections.map((s) => ({
                ...s,
                children: s.children ? [...s.children] : undefined,
                subsections: s.subsections
                    ? this.deepCloneSections(s.subsections)
                    : undefined,
                ordering: s.ordering ? [...s.ordering] : undefined,
            }))
        });
        Object.defineProperty(this, "extractControlFromSections", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, sectionId, controlId) => {
                let found;
                const updated = sections.map((s) => {
                    if (found)
                        return s;
                    if (s.id === sectionId) {
                        const idx = (s.children ?? []).findIndex((c) => c.id === controlId);
                        if (idx !== -1) {
                            const children = [...(s.children ?? [])];
                            found = children.splice(idx, 1)[0];
                            return { ...s, children };
                        }
                    }
                    if (s.subsections) {
                        const res = this.extractControlFromSections(s.subsections, sectionId, controlId);
                        if (res.control) {
                            found = res.control;
                            return { ...s, subsections: res.sections };
                        }
                    }
                    return s;
                });
                return { sections: updated, control: found };
            }
        });
        Object.defineProperty(this, "insertControlIntoSections", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, sectionId, index, control) => sections.map((s) => {
                if (s.id === sectionId) {
                    const children = [...(s.children ?? [])];
                    children.splice(index, 0, control);
                    return { ...s, children };
                }
                if (s.subsections) {
                    return {
                        ...s,
                        subsections: this.insertControlIntoSections(s.subsections, sectionId, index, control),
                    };
                }
                return s;
            })
        });
        Object.defineProperty(this, "extractSection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, sectionId) => {
                let found;
                const filtered = sections.filter((s) => {
                    if (s.id === sectionId) {
                        found = s;
                        return false;
                    }
                    return true;
                });
                if (found)
                    return { sections: filtered, section: found };
                const updated = filtered.map((s) => {
                    if (found)
                        return s;
                    if (s.subsections) {
                        const res = this.extractSection(s.subsections, sectionId);
                        if (res.section) {
                            found = res.section;
                            return { ...s, subsections: res.sections };
                        }
                    }
                    return s;
                });
                return { sections: updated, section: found };
            }
        });
        Object.defineProperty(this, "insertSectionIntoSections", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, parentId, index, section) => sections.map((s) => {
                if (s.id === parentId) {
                    const subs = [...(s.subsections ?? [])];
                    subs.splice(index, 0, section);
                    return { ...s, subsections: subs };
                }
                if (s.subsections) {
                    return {
                        ...s,
                        subsections: this.insertSectionIntoSections(s.subsections, parentId, index, section),
                    };
                }
                return s;
            })
        });
        Object.defineProperty(this, "addSubsection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, parentId, newSection) => sections.map((s) => s.id === parentId
                ? { ...s, subsections: [...(s.subsections ?? []), newSection] }
                : {
                    ...s,
                    subsections: s.subsections
                        ? this.addSubsection(s.subsections, parentId, newSection)
                        : undefined,
                })
        });
        Object.defineProperty(this, "removeSectionFromList", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, sectionId) => sections
                .filter((s) => s.id !== sectionId)
                .map((s) => ({
                ...s,
                ordering: s.ordering?.filter((id) => id !== sectionId),
                subsections: s.subsections
                    ? this.removeSectionFromList(s.subsections, sectionId)
                    : undefined,
            }))
        });
        Object.defineProperty(this, "addControlToSection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, sectionId, control) => sections.map((s) => s.id === sectionId
                ? { ...s, children: [...(s.children ?? []), control] }
                : {
                    ...s,
                    subsections: s.subsections
                        ? this.addControlToSection(s.subsections, sectionId, control)
                        : undefined,
                })
        });
        Object.defineProperty(this, "removeControlFromSection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, sectionId, controlId) => sections.map((s) => s.id === sectionId
                ? {
                    ...s,
                    children: (s.children ?? []).filter((c) => c.id !== controlId),
                    ordering: s.ordering?.filter((id) => id !== controlId),
                }
                : {
                    ...s,
                    subsections: s.subsections
                        ? this.removeControlFromSection(s.subsections, sectionId, controlId)
                        : undefined,
                })
        });
        /** Append an item id to a section's ordering (recursive). */
        Object.defineProperty(this, "appendToSectionOrdering", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, sectionId, itemId) => sections.map((s) => {
                if (s.id === sectionId) {
                    const ordering = s.ordering ?? this.buildOrdering(s.children ?? [], s.subsections ?? []);
                    return { ...s, ordering: [...ordering, itemId] };
                }
                if (s.subsections) {
                    return { ...s, subsections: this.appendToSectionOrdering(s.subsections, sectionId, itemId) };
                }
                return s;
            })
        });
        /** Remove an item id from a section's ordering (recursive). */
        Object.defineProperty(this, "removeFromSectionOrdering", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (sections, sectionId, itemId) => sections.map((s) => {
                if (s.id === sectionId) {
                    return { ...s, ordering: s.ordering?.filter((id) => id !== itemId) };
                }
                if (s.subsections) {
                    return { ...s, subsections: this.removeFromSectionOrdering(s.subsections, sectionId, itemId) };
                }
                return s;
            })
        });
        Object.defineProperty(this, "createDefaultControl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (type) => {
                const id = crypto.randomUUID().slice(0, 8);
                switch (type) {
                    case ControlType.Field:
                        return {
                            id,
                            type: ControlType.Field,
                            label: 'New Field',
                            format: 'text',
                        };
                    case ControlType.Button:
                        return {
                            id,
                            type: ControlType.Button,
                            label: 'New Button',
                            prompt: '',
                            appearance: 'secondary',
                        };
                    case ControlType.Table:
                        return {
                            id,
                            type: ControlType.Table,
                            label: 'New Table',
                            columns: [{ key: 'col1', header: 'Column 1' }],
                        };
                    case ControlType.Badge:
                        return {
                            id,
                            type: ControlType.Badge,
                            label: 'New Badge',
                            color: 'informative',
                        };
                    case ControlType.Image:
                        return {
                            id,
                            type: ControlType.Image,
                            label: 'New Image',
                            alt: 'Image',
                        };
                    case ControlType.ProgressBar:
                        return {
                            id,
                            type: ControlType.ProgressBar,
                            label: 'Progress',
                            value: 0,
                            max: 100,
                        };
                    case ControlType.InputField:
                        return {
                            id,
                            type: ControlType.InputField,
                            name: `field_${id}`,
                            label: 'New Input Field',
                            inputType: 'text',
                            placeholder: 'Enter value',
                        };
                    case ControlType.Separator:
                        return {
                            id,
                            type: ControlType.Separator,
                        };
                }
            }
        });
        Object.defineProperty(this, "createDefaultTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => ({
                id: crypto.randomUUID(),
                name: 'New Template',
                version: '1.0',
                card: {
                    title: 'New Card',
                    sections: [],
                },
            })
        });
        this.dispatch = dispatch;
        this.getState = getState;
        this.props = props;
    }
}
