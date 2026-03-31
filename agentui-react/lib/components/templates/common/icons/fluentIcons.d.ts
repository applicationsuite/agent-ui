import React from 'react';
import type { FluentIconsProps } from '@fluentui/react-icons';
export type FluentIconComponent = React.ComponentType<FluentIconsProps>;
export declare const FLUENT_ICON_ITEMS: Array<{
    name: string;
    Icon: FluentIconComponent;
}>;
export declare const FLUENT_ICON_NAMES: string[];
export declare function getFluentIconComponent(iconName?: string): FluentIconComponent | null;
