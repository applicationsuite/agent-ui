import type { ITemplateControl, IBadgeControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const BadgeEditor: ({ control, onUpdate, classes, bindingPaths, }: {
    control: IBadgeControl;
    onUpdate: (id: string, p: Partial<ITemplateControl>) => void;
    classes: EditorClasses;
    bindingPaths: string[];
}) => import("react/jsx-runtime").JSX.Element;
