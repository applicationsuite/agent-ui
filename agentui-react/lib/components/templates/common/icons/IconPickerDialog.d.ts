import React from 'react';
export interface IIconPickerDialogProps {
    value?: string;
    onChange: (iconName?: string) => void;
    title?: string;
    placeholder?: string;
    maxResults?: number;
}
export declare const IconPickerDialog: React.FC<IIconPickerDialogProps>;
