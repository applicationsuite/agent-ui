import React from 'react';
import type { IControlStyle, FooterAlignment } from '../../templates.models';
export interface ICardProps {
    title: string;
    subtitle?: string;
    isCollapsible?: boolean;
    defaultExpanded?: boolean;
    style?: IControlStyle;
    height?: string | number;
    children?: React.ReactNode;
    headerActions?: React.ReactNode;
    footer?: React.ReactNode;
    footerAlignment?: FooterAlignment;
}
export declare const Card: React.FC<ICardProps>;
