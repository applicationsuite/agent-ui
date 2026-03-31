import type { CollapsibleClasses } from './PropertyPanel.models';
export declare const FieldGroup: ({ label, children, className, }: {
    label: string;
    children: React.ReactNode;
    className: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const CollapsibleSection: ({ title, children, classes, defaultExpanded, }: {
    title: string;
    children: React.ReactNode;
    classes: CollapsibleClasses;
    defaultExpanded?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
