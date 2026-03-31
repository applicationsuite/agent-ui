import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@fluentui/react-components';
import { CollapsibleSection, FieldGroup } from '../CollapsibleSection';
import { BindingEditor } from './binding-editor/BindingEditor';
export const ImageEditor = ({ control, onUpdate, classes, bindingPaths, }) => (_jsxs(CollapsibleSection, { title: "Image", classes: classes, children: [_jsx(FieldGroup, { label: "Src", className: classes.field, children: _jsx(Input, { size: "small", value: control.src ?? '', onChange: (_, d) => onUpdate(control.id, {
                    src: d.value || undefined,
                }) }) }), _jsx(FieldGroup, { label: "Src Binding", className: classes.field, children: _jsx(BindingEditor, { placeholder: "e.g. product.imageUrl", bindingPaths: bindingPaths, value: control.binding ?? '', onChange: (v) => onUpdate(control.id, {
                    binding: v || undefined,
                }) }) }), _jsx(FieldGroup, { label: "Alt Text", className: classes.field, children: _jsx(Input, { size: "small", value: control.alt ?? '', onChange: (_, d) => onUpdate(control.id, {
                    alt: d.value || undefined,
                }) }) }), _jsxs("div", { className: classes.row, children: [_jsx(FieldGroup, { label: "Width", className: classes.halfField, children: _jsx(Input, { size: "small", value: String(control.width ?? ''), onChange: (_, d) => onUpdate(control.id, {
                            width: d.value || undefined,
                        }) }) }), _jsx(FieldGroup, { label: "Height", className: classes.halfField, children: _jsx(Input, { size: "small", value: String(control.height ?? ''), onChange: (_, d) => onUpdate(control.id, {
                            height: d.value || undefined,
                        }) }) })] })] }));
