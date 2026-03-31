/**
 * An Input that shows a dropdown of binding paths when the user types `{`.
 * Selecting a path inserts `{path}` at the cursor position.
 *
 * Supports two sections:
 *  - `bindingPaths` — context-level paths (e.g. row fields, form fields)
 *  - `globalBindingPaths` — broader data source paths shown in a separate section
 */
export declare const ActionBindingInput: ({ value, placeholder, bindingPaths, globalBindingPaths, pathLabels, onChange, }: {
    value: string;
    placeholder?: string;
    /** Context-level binding paths (row fields, form fields, etc.) */
    bindingPaths: string[];
    /** Broader data source paths shown in a separate "Data Source" section */
    globalBindingPaths?: string[];
    /** Optional friendly labels for paths, keyed by path name */
    pathLabels?: Record<string, string>;
    onChange: (value: string) => void;
}) => import("react/jsx-runtime").JSX.Element;
