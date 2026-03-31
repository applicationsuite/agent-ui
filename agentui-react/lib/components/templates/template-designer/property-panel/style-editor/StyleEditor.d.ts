import type { IControlStyle } from '../../../templates.models';
import type { EditorClasses } from '../PropertyPanel.models';
export declare const StyleEditor: ({ style, onChange, classes, }: {
    style?: IControlStyle;
    onChange: (style: IControlStyle | undefined) => void;
    classes: EditorClasses;
}) => import("react/jsx-runtime").JSX.Element;
