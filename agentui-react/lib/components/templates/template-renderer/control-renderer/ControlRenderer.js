import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { layoutStyles } from './ControlRenderer.styles';
import { ControlType } from '../../templates.models';
import { resolveBinding, resolveDataBindings } from '../bindingResolver';
import { Field } from '../../common/field/Field';
import { Badge } from '../../common/badge/Badge';
import { Button } from '../../common/button/Button';
import { Table } from '../../common/table/Table';
import { ImageControl } from '../../common/image/Image';
import { ProgressBar } from '../../common/progress-bar/ProgressBar';
import { Separator } from '../../common/separator/Separator';
import { useFormContext } from '../../common/form/FormContext';
import { FormInput } from '../../common/form/FormInput';
const useLayoutStyles = makeStyles(layoutStyles);
// ---------------------------------------------------------------------------
// Type guards
// ---------------------------------------------------------------------------
function isControlValue(v) {
    return (v === null ||
        v === undefined ||
        typeof v === 'string' ||
        typeof v === 'number' ||
        typeof v === 'boolean');
}
// ---------------------------------------------------------------------------
// Binding resolution helpers — resolve bindings before passing to components
// ---------------------------------------------------------------------------
function resolveField(control, data) {
    if (!control.binding)
        return control;
    const resolved = resolveBinding(control.binding, data);
    return {
        ...control,
        value: isControlValue(resolved) ? resolved : String(resolved ?? ''),
    };
}
function resolveBadge(control, data) {
    const resolvedValue = control.binding
        ? resolveBinding(control.binding, data)
        : undefined;
    const resolvedColor = control.colorBinding
        ? resolveBinding(control.colorBinding, data)
        : undefined;
    return {
        ...control,
        value: control.binding ? String(resolvedValue ?? '') : control.value,
        color: control.colorBinding
            ? typeof resolvedColor === 'string'
                ? resolvedColor
                : control.color
            : control.color,
    };
}
function resolveButton(control, data) {
    if (!control.dataBindings)
        return control;
    return {
        ...control,
        data: resolveDataBindings(control.data, control.dataBindings, data),
    };
}
function resolveTable(control, data) {
    if (!control.binding)
        return control;
    const raw = resolveBinding(control.binding, data);
    // Support both arrays (multiple rows) and plain objects (single row)
    let rawRows;
    if (Array.isArray(raw)) {
        rawRows = raw;
    }
    else if (raw != null && typeof raw === 'object') {
        rawRows = [raw];
    }
    else {
        rawRows = [];
    }
    // Flatten col.field bindings so the Table gets plain row[col.key] values
    const rows = rawRows.map((row) => {
        if (row == null || typeof row !== 'object')
            return {};
        const flat = {};
        for (const col of control.columns) {
            const cellVal = col.field
                ? resolveBinding(col.field, row)
                : row[col.key];
            flat[col.key] = isControlValue(cellVal) ? cellVal : String(cellVal ?? '');
        }
        return flat;
    });
    return { ...control, rows, rawRows: rawRows };
}
function resolveImage(control, data) {
    if (!control.binding)
        return control;
    const resolved = resolveBinding(control.binding, data);
    return {
        ...control,
        src: typeof resolved === 'string' ? resolved : String(resolved ?? ''),
    };
}
function resolveProgressBar(control, data) {
    if (!control.binding)
        return control;
    const resolved = resolveBinding(control.binding, data);
    return {
        ...control,
        value: typeof resolved === 'number' ? resolved : Number(resolved ?? 0),
    };
}
function resolveInputFieldDefaults(controls, data) {
    return controls.map((c) => {
        if (c.type !== ControlType.InputField)
            return c;
        const field = c;
        if (!field.defaultValue?.binding)
            return c;
        const resolved = resolveBinding(field.defaultValue.binding, data);
        return {
            ...field,
            defaultValue: {
                ...field.defaultValue,
                value: isControlValue(resolved) ? resolved : String(resolved ?? ''),
            },
        };
    });
}
export const ControlRenderer = ({ control, data = {}, onAction, }) => {
    if (control.visible === false)
        return null;
    switch (control.type) {
        case ControlType.Field:
            return _jsx(Field, { ...resolveField(control, data) });
        case ControlType.Badge:
            return _jsx(Badge, { ...resolveBadge(control, data) });
        case ControlType.Button:
            return _jsx(Button, { ...resolveButton(control, data), onAction: onAction, serverData: data });
        case ControlType.Table:
            return _jsx(Table, { ...resolveTable(control, data), onAction: onAction, serverData: data });
        case ControlType.Image:
            return _jsx(ImageControl, { ...resolveImage(control, data) });
        case ControlType.ProgressBar:
            return _jsx(ProgressBar, { ...resolveProgressBar(control, data) });
        case ControlType.InputField:
            return _jsx(InputFieldRenderer, { control: control });
        case ControlType.Separator:
            return _jsx(Separator, { ...control });
        default:
            return null;
    }
};
/** InputField reads from the nearest FormContext. */
const InputFieldRenderer = ({ control }) => {
    const formCtx = useFormContext();
    if (!formCtx)
        return null; // InputField only meaningful inside a form context
    return (_jsx(FormInput, { field: control, value: formCtx.values[control.name], error: formCtx.errors[control.name], onChange: formCtx.onChange }));
};
export const ChildrenLayout = ({ controls, layout, columns, gap, data = {}, onAction, }) => {
    const classes = useLayoutStyles();
    // Resolve InputField default-value bindings
    const resolvedControls = useMemo(() => (controls ? resolveInputFieldDefaults(controls, data) : undefined), [controls, data]);
    if (!resolvedControls?.length)
        return null;
    const layoutClass = getLayoutClass(classes, layout, columns);
    const gapClass = getGapClass(classes, gap);
    const className = gapClass
        ? mergeClasses(layoutClass, gapClass)
        : layoutClass;
    return (_jsx("div", { className: className, children: resolvedControls.map((control) => (_jsx(ControlRenderer, { control: control, data: data, onAction: onAction }, control.id))) }));
};
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getLayoutClass(classes, layout, columns) {
    switch (layout) {
        case 'row':
            return classes.row;
        case 'grid': {
            const cols = columns ?? 2;
            return cols === 3
                ? classes.grid3
                : cols >= 4
                    ? classes.grid4
                    : classes.grid2;
        }
        default:
            return classes.stack;
    }
}
function getGapClass(classes, gap) {
    if (gap == null)
        return undefined;
    if (gap <= 4)
        return classes.gap4;
    if (gap <= 8)
        return classes.gap8;
    if (gap <= 16)
        return classes.gap16;
    if (gap <= 24)
        return classes.gap24;
    return undefined;
}
