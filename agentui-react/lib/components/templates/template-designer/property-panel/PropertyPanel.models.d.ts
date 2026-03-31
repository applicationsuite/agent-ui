import type { ITemplate, ISectionControl, ITemplateControl, SectionLayout, BadgeColor, ButtonAppearance, FormInputType, FooterAlignment, ButtonPlacement } from '../../templates.models';
import type { ISelectedElement } from '../TemplateDesigner.models';
export interface IPropertyPanelProps {
    template: ITemplate;
    selectedElement?: ISelectedElement;
    onTemplateChange: (template: ITemplate) => void;
    onSelectElement?: (element: ISelectedElement) => void;
    bindingPaths?: string[];
    bindingData?: Record<string, unknown>;
}
export type CollapsibleClasses = {
    sectionGroup: string;
    sectionHeader: string;
    sectionTitle: string;
    sectionChevron: string;
    sectionChevronCollapsed: string;
    sectionBody: string;
    sectionBodyHidden: string;
};
export type EditorClasses = CollapsibleClasses & {
    field: string;
    row: string;
    halfField: string;
    columnCard: string;
    columnHeader: string;
    addColumnBtn: string;
};
export declare const LAYOUT_OPTIONS: SectionLayout[];
export declare const FOOTER_ALIGNMENT_OPTIONS: FooterAlignment[];
export declare const BUTTON_PLACEMENT_OPTIONS: ButtonPlacement[];
export declare const BADGE_COLORS: BadgeColor[];
export declare const BUTTON_APPEARANCES: ButtonAppearance[];
export declare const FIELD_FORMATS: readonly ["text", "date", "currency", "number"];
export declare const TABLE_COL_FORMATS: readonly ["text", "date", "currency", "number", "badge", "button"];
export declare const FORM_INPUT_TYPES: FormInputType[];
export declare const TEXT_ALIGN_OPTIONS: readonly ["left", "center", "right"];
export declare const OVERFLOW_OPTIONS: readonly ["visible", "hidden", "scroll", "auto"];
export declare const ALIGN_SELF_OPTIONS: readonly ["auto", "flex-start", "flex-end", "center", "stretch"];
export declare const BORDER_STYLE_OPTIONS: readonly ["solid", "dashed", "dotted", "none"];
export declare const findSection: (sections: ISectionControl[] | undefined, id: string) => ISectionControl | undefined;
export declare const findControl: (template: ITemplate, controlId: string) => {
    control: ITemplateControl;
    sectionId: string;
} | undefined;
export declare const updateSectionInList: (sections: ISectionControl[], id: string, updater: (s: ISectionControl) => ISectionControl) => ISectionControl[];
export declare const updateControlInSections: (sections: ISectionControl[], controlId: string, updater: (c: ITemplateControl) => ITemplateControl) => ISectionControl[];
