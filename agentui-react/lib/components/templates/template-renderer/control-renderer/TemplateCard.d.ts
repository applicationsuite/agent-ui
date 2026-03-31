import React from 'react';
import type { ICardControl, IControlProps } from '../../templates.models';
export interface ITemplateCardProps extends ICardControl, IControlProps {
    data?: Record<string, unknown>;
}
export declare const TemplateCard: React.FC<ITemplateCardProps>;
