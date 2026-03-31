import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ControlType } from '../../templates.models';
const FormContext = createContext(undefined);
/** Consume the nearest FormContext (if any). */
export const useFormContext = () => useContext(FormContext);
export const FormProvider = ({ controls, children, }) => {
    // Extract InputField controls from the flat list
    const inputFields = useMemo(() => controls.filter((c) => c.type === ControlType.InputField), [controls]);
    // Initialise values from defaultValue
    const [values, setValues] = useState(() => {
        const initial = {};
        for (const field of inputFields) {
            initial[field.name] = field.defaultValue?.value ?? null;
        }
        return initial;
    });
    // Track which fields the user has manually edited
    const touchedRef = useRef(new Set());
    // When resolved default values change (e.g. binding data arrives), sync
    // untouched fields so bound defaults populate in the input.
    useEffect(() => {
        setValues((prev) => {
            let next = prev;
            for (const field of inputFields) {
                const resolved = field.defaultValue?.value ?? null;
                if (!touchedRef.current.has(field.name) && resolved !== prev[field.name]) {
                    if (next === prev)
                        next = { ...prev };
                    next[field.name] = resolved;
                }
            }
            return next;
        });
    }, [inputFields]);
    const [errors, setErrors] = useState({});
    const onChange = useCallback((name, value) => {
        touchedRef.current.add(name);
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }, []);
    const validate = useCallback(() => {
        const newErrors = {};
        let valid = true;
        for (const field of inputFields) {
            const val = values[field.name];
            if (field.required && (val == null || String(val).trim() === '')) {
                newErrors[field.name] =
                    field.validation?.message ?? `${field.label} is required`;
                valid = false;
            }
            else if (field.validation?.pattern && val != null) {
                const regex = new RegExp(field.validation.pattern);
                if (!regex.test(String(val))) {
                    newErrors[field.name] =
                        field.validation.message ?? `${field.label} is invalid`;
                    valid = false;
                }
            }
        }
        setErrors(newErrors);
        return valid;
    }, [inputFields, values]);
    const ctx = useMemo(() => ({ values, errors, onChange, validate }), [values, errors, onChange, validate]);
    return _jsx(FormContext.Provider, { value: ctx, children: children });
};
