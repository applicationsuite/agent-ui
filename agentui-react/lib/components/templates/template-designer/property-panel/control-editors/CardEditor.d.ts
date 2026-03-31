import type { ITemplate, ICardControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const CardEditor: ({ template, onUpdateCard, onUpdateRoot, classes, bindingPaths, className, }: {
    template: ITemplate;
    onUpdateCard: (partial: Partial<ICardControl>) => void;
    onUpdateRoot: (partial: Partial<ITemplate>) => void;
    classes: EditorClasses;
    bindingPaths: string[];
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
