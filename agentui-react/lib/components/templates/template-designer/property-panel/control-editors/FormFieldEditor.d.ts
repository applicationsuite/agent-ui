import type { IInputFieldControl, ITemplateControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const FormFieldEditor: ({ field, onUpdate, onRenameField, existingNames, classes, bindingPaths, }: {
    field: IInputFieldControl;
    onUpdate: (controlId: string, partial: Partial<ITemplateControl>) => void;
    onRenameField?: (controlId: string, oldName: string, newName: string) => void;
    existingNames?: string[];
    classes: EditorClasses;
    bindingPaths: string[];
}) => import("react/jsx-runtime").JSX.Element;
