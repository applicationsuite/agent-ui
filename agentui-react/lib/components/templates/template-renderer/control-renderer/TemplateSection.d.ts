import React from 'react';
import type { ISectionControl, IControlProps, SectionLayout } from '../../templates.models';
import { type OrderedItem } from '../../templates.models';
interface IRenderOrderedOpts {
    layout?: SectionLayout;
    columns?: number;
    gap?: number;
    data?: Record<string, unknown>;
    onAction?: IControlProps['onAction'];
    nested?: boolean;
}
/**
 * Render an interleaved list of controls and sections.
 * Consecutive controls are batched into a single ChildrenLayout for correct grid behaviour.
 */
export declare const renderOrderedItems: (items: OrderedItem[], opts: IRenderOrderedOpts) => React.ReactNode[];
export interface ITemplateSectionProps extends ISectionControl, IControlProps {
    data?: Record<string, unknown>;
    nested?: boolean;
}
export declare const TemplateSection: React.FC<ITemplateSectionProps>;
export {};
