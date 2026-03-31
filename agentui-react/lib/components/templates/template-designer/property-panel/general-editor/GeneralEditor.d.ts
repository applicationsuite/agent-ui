import type { ITemplateControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const GeneralEditor: ({ control, onUpdate, classes, }: {
    control: ITemplateControl;
    onUpdate: (id: string, partial: Partial<ITemplateControl>) => void;
    classes: EditorClasses;
}) => import("react/jsx-runtime").JSX.Element;
