import React from 'react';
import type { IInputFieldControl, ControlValue } from '../../templates.models';
export interface IFormInputProps {
    field: IInputFieldControl;
    value: ControlValue;
    error?: string;
    onChange: (name: string, value: ControlValue) => void;
}
export declare const FormInput: React.FC<IFormInputProps>;
