import type { ITemplateControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const ControlEditor: ({ control, onUpdate, classes, bindingPaths, bindingData, inputFieldInfo, }: {
    control: ITemplateControl;
    onUpdate: (id: string, partial: Partial<ITemplateControl>) => void;
    classes: EditorClasses;
    bindingPaths: string[];
    bindingData: Record<string, unknown>;
    inputFieldInfo?: {
        name: string;
        label: string;
    }[];
}) => import("react/jsx-runtime").JSX.Element | null;
