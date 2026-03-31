import type { ITemplateControl, IImageControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const ImageEditor: ({ control, onUpdate, classes, bindingPaths, }: {
    control: IImageControl;
    onUpdate: (id: string, p: Partial<ITemplateControl>) => void;
    classes: EditorClasses;
    bindingPaths: string[];
}) => import("react/jsx-runtime").JSX.Element;
