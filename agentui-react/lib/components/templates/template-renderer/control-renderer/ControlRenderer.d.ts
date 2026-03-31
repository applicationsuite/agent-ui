import React from 'react';
import type { ITemplateControl, IControlProps, SectionLayout } from '../../templates.models';
export interface IControlRendererProps extends IControlProps {
    control: ITemplateControl;
    data?: Record<string, unknown>;
}
export declare const ControlRenderer: React.FC<IControlRendererProps>;
export interface IChildrenLayoutProps extends IControlProps {
    controls?: ITemplateControl[];
    layout?: SectionLayout;
    columns?: number;
    gap?: number;
    data?: Record<string, unknown>;
}
export declare const ChildrenLayout: React.FC<IChildrenLayoutProps>;
