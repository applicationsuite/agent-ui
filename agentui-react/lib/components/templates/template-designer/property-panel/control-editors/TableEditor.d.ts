import type { ITemplateControl, ITableControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const TableEditor: ({ control, onUpdate, classes, bindingPaths, bindingData, }: {
    control: ITableControl;
    onUpdate: (id: string, p: Partial<ITemplateControl>) => void;
    classes: EditorClasses;
    bindingPaths: string[];
    bindingData: Record<string, unknown>;
}) => import("react/jsx-runtime").JSX.Element;
