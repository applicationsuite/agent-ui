import type { ISectionControl } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const SectionEditor: ({ section, onUpdateSection, classes, bindingPaths, className, }: {
    section: ISectionControl;
    onUpdateSection: (sectionId: string, partial: Partial<ISectionControl>) => void;
    classes: EditorClasses;
    bindingPaths: string[];
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
