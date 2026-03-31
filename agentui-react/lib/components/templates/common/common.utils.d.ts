import type { ControlValue, IControlStyle } from '../templates.models';
export declare function formatValue(raw: ControlValue, format?: string): string;
/**
 * Convert an IControlStyle object to a React CSSProperties object.
 * Returns `undefined` when the style is empty or absent so that components
 * can skip the inline style attribute altogether.
 */
export declare function toReactStyle(style?: IControlStyle): React.CSSProperties | undefined;
export declare function toTextStyle(style?: IControlStyle): React.CSSProperties | undefined;
