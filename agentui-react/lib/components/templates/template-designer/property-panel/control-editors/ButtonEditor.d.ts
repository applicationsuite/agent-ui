import type { ITemplateControl, IButtonControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const ButtonEditor: ({ control, onUpdate, classes, bindingPaths, inputFieldInfo, }: {
    control: IButtonControl;
    onUpdate: (id: string, p: Partial<ITemplateControl>) => void;
    classes: EditorClasses;
    bindingPaths: string[];
    inputFieldInfo?: {
        name: string;
        label: string;
    }[];
}) => import("react/jsx-runtime").JSX.Element;
