import type { ITemplate } from '../templates.models';
import { ControlType } from '../templates.models';
import { IEntity, ISelectedElement, ITemplateDesignerProps, ITemplateDesignerState, TemplateDesignerActionType, TemplateDesignerMode } from './TemplateDesigner.models';
export declare enum TEMPLATE_DESIGNER_DISPATCH_ACTIONS {
    SET_TEMPLATE = "SET_TEMPLATE",
    SET_MODE = "SET_MODE",
    SET_SELECTED_ELEMENT = "SET_SELECTED_ELEMENT",
    SET_IS_DIRTY = "SET_IS_DIRTY",
    SET_BINDING_PATHS = "SET_BINDING_PATHS",
    SET_BINDING_DATA = "SET_BINDING_DATA"
}
export type ITemplateDesignerDispatchActions = {
    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_TEMPLATE;
    data: IEntity<ITemplate>;
} | {
    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_MODE;
    data: TemplateDesignerMode;
} | {
    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_SELECTED_ELEMENT;
    data?: ISelectedElement;
} | {
    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_IS_DIRTY;
    data: boolean;
} | {
    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_BINDING_PATHS;
    data: string[];
} | {
    type: TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_BINDING_DATA;
    data: Record<string, unknown>;
};
export interface ITemplateDesignerActions {
    initialize: (template?: ITemplate, error?: string) => void;
    handleAction: (action: TemplateDesignerActionType, payload?: unknown) => void;
    save: () => void;
    revert: () => void;
    setMode: (mode: TemplateDesignerMode) => void;
    selectElement: (element?: ISelectedElement) => void;
    updateTemplate: (template: ITemplate) => void;
    addSection: (parentSectionId?: string) => void;
    removeSection: (sectionId: string) => void;
    addControl: (sectionId: string, controlType: ControlType) => void;
    removeControl: (sectionId: string, controlId: string) => void;
    addControlToCard: (controlType: ControlType) => void;
    removeControlFromCard: (controlId: string) => void;
    moveNode: (drag: IDragItem, drop: IDropTarget) => void;
    setBindingPaths: (paths: string[]) => void;
    setBindingData: (data: Record<string, unknown>) => void;
}
/** Describes the item being dragged. */
export interface IDragItem {
    type: 'control' | 'section';
    id: string;
    /** For controls only — the parent id ('card' or sectionId). */
    parentId?: string;
}
/** Describes where an item was dropped. */
export interface IDropTarget {
    /** The parent that should receive the item ('card' or sectionId). */
    parentId: string;
    /** Index within that parent's children/sections array. */
    index: number;
}
export declare class TemplateDesignerActions implements ITemplateDesignerActions {
    private readonly dispatch;
    private readonly getState;
    private props;
    private savedTemplate;
    constructor(dispatch: React.Dispatch<ITemplateDesignerDispatchActions>, getState: () => ITemplateDesignerState, props: ITemplateDesignerProps);
    updateProps: (props: ITemplateDesignerProps) => void;
    initialize: (template?: ITemplate, error?: string) => void;
    handleAction: (action: TemplateDesignerActionType, payload?: unknown) => void;
    save: () => void;
    revert: () => void;
    setMode: (mode: TemplateDesignerMode) => void;
    selectElement: (element?: ISelectedElement) => void;
    updateTemplate: (template: ITemplate) => void;
    addSection: (parentSectionId?: string) => void;
    removeSection: (sectionId: string) => void;
    addControl: (sectionId: string, controlType: ControlType) => void;
    removeControl: (sectionId: string, controlId: string) => void;
    addControlToCard: (controlType: ControlType) => void;
    removeControlFromCard: (controlId: string) => void;
    setBindingPaths: (paths: string[]) => void;
    setBindingData: (data: Record<string, unknown>) => void;
    moveNode: (drag: IDragItem, drop: IDropTarget) => void;
    private findSection;
    /** Build a default ordering from separate children + sections arrays. */
    private buildOrdering;
    /**
     * Clamp the unified drop index to the ordering length.
     * The item was already removed from the ordering before calling this,
     * so no same-parent adjustment is needed.
     */
    private adjustOrderingIndex;
    private deepCloneSections;
    private extractControlFromSections;
    private insertControlIntoSections;
    private extractSection;
    private insertSectionIntoSections;
    private addSubsection;
    private removeSectionFromList;
    private addControlToSection;
    private removeControlFromSection;
    /** Append an item id to a section's ordering (recursive). */
    private appendToSectionOrdering;
    /** Remove an item id from a section's ordering (recursive). */
    private removeFromSectionOrdering;
    private createDefaultControl;
    private createDefaultTemplate;
}
