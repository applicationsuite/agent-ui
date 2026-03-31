import React from 'react';
import type { ControlValue, ITemplateControl } from '../../templates.models';
export interface IFormContextValue {
    values: Record<string, ControlValue>;
    errors: Record<string, string | undefined>;
    onChange: (name: string, value: ControlValue) => void;
    /** Validate all registered fields. Returns true when the form is valid. */
    validate: () => boolean;
}
/** Consume the nearest FormContext (if any). */
export declare const useFormContext: () => IFormContextValue | undefined;
export interface IFormProviderProps {
    /** All controls in this container — InputField controls are auto-registered. */
    controls: ITemplateControl[];
    children: React.ReactNode;
}
export declare const FormProvider: React.FC<IFormProviderProps>;
