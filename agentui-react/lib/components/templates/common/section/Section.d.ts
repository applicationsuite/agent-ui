import React from 'react';
import type { IControlStyle, FooterAlignment } from '../../templates.models';
export interface ISectionProps {
    label: string;
    isCollapsible?: boolean;
    defaultExpanded?: boolean;
    nested?: boolean;
    style?: IControlStyle;
    height?: string | number;
    children?: React.ReactNode;
    headerActions?: React.ReactNode;
    footer?: React.ReactNode;
    footerAlignment?: FooterAlignment;
}
export declare const Section: React.FC<ISectionProps>;
