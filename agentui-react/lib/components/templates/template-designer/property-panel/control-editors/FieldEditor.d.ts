import type { ITemplateControl, IFieldControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const FieldEditor: ({ control, onUpdate, classes, bindingPaths, }: {
    control: IFieldControl;
    onUpdate: (id: string, p: Partial<ITemplateControl>) => void;
    classes: EditorClasses;
    bindingPaths: string[];
}) => import("react/jsx-runtime").JSX.Element;
