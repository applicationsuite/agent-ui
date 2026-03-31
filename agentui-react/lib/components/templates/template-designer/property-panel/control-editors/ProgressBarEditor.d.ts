import type { ITemplateControl, IProgressBarControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const ProgressBarEditor: ({ control, onUpdate, classes, bindingPaths, }: {
    control: IProgressBarControl;
    onUpdate: (id: string, p: Partial<ITemplateControl>) => void;
    classes: EditorClasses;
    bindingPaths: string[];
}) => import("react/jsx-runtime").JSX.Element;
