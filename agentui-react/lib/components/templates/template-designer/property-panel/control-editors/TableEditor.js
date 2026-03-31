import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Button, Input, Dropdown, Option, Text, Switch, } from '@fluentui/react-components';
import { CollapsibleSection, FieldGroup } from '../CollapsibleSection';
import { BindingEditor } from './binding-editor/BindingEditor';
import { ActionBindingInput } from './binding-editor/ActionBindingInput';
import { TABLE_COL_FORMATS } from '../PropertyPanel.models';
import { resolveBinding } from '../../../template-renderer/bindingResolver';
import { extractBindingPaths, getSummaryTileKey, toPrettyFieldLabel, } from '../../TemplateDesigner.utils';
import { IconPickerDialog } from '../../../common/icons/IconPickerDialog';
export const TableEditor = ({ control, onUpdate, classes, bindingPaths, bindingData, }) => {
    const [manuallyEditedTileLabels, setManuallyEditedTileLabels] = useState({});
    const [manuallyEditedColumnHeaders, setManuallyEditedColumnHeaders] = useState({});
    const updateSummaryTiles = (tiles) => {
        onUpdate(control.id, {
            summaryTiles: tiles.length ? tiles : undefined,
        });
    };
    const columnFieldPaths = useMemo(() => {
        // Try to derive paths from live binding data first
        if (control.binding && bindingData) {
            const resolved = resolveBinding(control.binding, bindingData);
            if (Array.isArray(resolved) && resolved.length > 0) {
                return extractBindingPaths(resolved[0]);
            }
            if (resolved != null && typeof resolved === 'object') {
                return extractBindingPaths(resolved);
            }
        }
        // Fall back to column keys so intellisense works without live data
        if (control.columns?.length) {
            return control.columns.map((c) => c.key);
        }
        return [];
    }, [control.binding, control.columns, bindingData]);
    return (_jsxs(_Fragment, { children: [_jsxs(CollapsibleSection, { title: "Data Source", classes: classes, children: [_jsx(FieldGroup, { label: "Row Binding", className: classes.field, children: _jsx(BindingEditor, { placeholder: "e.g. lineItems", bindingPaths: bindingPaths, value: control.binding ?? '', onChange: (v) => onUpdate(control.id, {
                                binding: v || undefined,
                            }) }) }), _jsx(FieldGroup, { label: "On Row Click Prompt", className: classes.field, children: _jsx(ActionBindingInput, { placeholder: "e.g. Show details for {orderId}", bindingPaths: columnFieldPaths, globalBindingPaths: bindingPaths, value: control.onRowClickPrompt ?? '', onChange: (v) => onUpdate(control.id, {
                                onRowClickPrompt: v || undefined,
                            }) }) })] }), _jsxs(CollapsibleSection, { title: "Table Options", classes: classes, children: [_jsxs("div", { className: classes.row, children: [_jsx(FieldGroup, { label: "Show Record Count", className: classes.halfField, children: _jsx(Switch, { checked: control.showRecordCount === true, onChange: (_, d) => onUpdate(control.id, {
                                        showRecordCount: d.checked,
                                    }) }) }), _jsx(FieldGroup, { label: "Sortable", className: classes.halfField, children: _jsx(Switch, { checked: control.sortable !== false, onChange: (_, d) => onUpdate(control.id, {
                                        sortable: d.checked,
                                    }) }) }), _jsx(FieldGroup, { label: "Searchable", className: classes.field, children: _jsx(Switch, { checked: control.searchable !== false, onChange: (_, d) => onUpdate(control.id, {
                                        searchable: d.checked,
                                    }) }) })] }), control.searchable !== false && (_jsx(FieldGroup, { label: "Search Placeholder", className: classes.field, children: _jsx(Input, { size: "small", placeholder: "Search across all columns...", value: control.searchPlaceholder ?? '', onChange: (_, d) => onUpdate(control.id, {
                                searchPlaceholder: d.value || undefined,
                            }) }) }))] }), _jsxs(CollapsibleSection, { title: `Columns (${control.columns.length})`, classes: classes, children: [control.columns.map((col, idx) => (_jsxs("div", { className: classes.columnCard, children: [_jsxs("div", { className: classes.columnHeader, children: [_jsxs(Text, { weight: "semibold", size: 200, children: ["#", idx + 1] }), _jsx(Button, { appearance: "subtle", size: "small", onClick: () => {
                                            const cols = control.columns.filter((_, i) => i !== idx);
                                            onUpdate(control.id, {
                                                columns: cols,
                                            });
                                        }, children: "Remove" })] }), _jsx(FieldGroup, { label: "Key", className: classes.field, children: _jsx(Input, { size: "small", value: col.key, onChange: (_, d) => {
                                        const cols = [...control.columns];
                                        cols[idx] = { ...cols[idx], key: d.value };
                                        onUpdate(control.id, {
                                            columns: cols,
                                        });
                                    } }) }), _jsx(FieldGroup, { label: "Header", className: classes.field, children: _jsx(Input, { size: "small", value: col.header, onChange: (_, d) => {
                                        setManuallyEditedColumnHeaders((prev) => ({
                                            ...prev,
                                            [idx]: true,
                                        }));
                                        const cols = [...control.columns];
                                        cols[idx] = { ...cols[idx], header: d.value };
                                        onUpdate(control.id, {
                                            columns: cols,
                                        });
                                    } }) }), _jsx(FieldGroup, { label: "Field Binding", className: classes.field, children: _jsx(BindingEditor, { placeholder: "e.g. amount.value", bindingPaths: columnFieldPaths, value: col.field ?? '', onChange: (v) => {
                                        const cols = [...control.columns];
                                        const hasManualHeader = manuallyEditedColumnHeaders[idx] === true;
                                        const currentAutoHeader = toPrettyFieldLabel(cols[idx]?.field);
                                        const nextField = v || undefined;
                                        const shouldAutoUpdateHeader = !hasManualHeader &&
                                            (!cols[idx].header ||
                                                cols[idx].header === 'New Column' ||
                                                cols[idx].header === currentAutoHeader);
                                        cols[idx] = {
                                            ...cols[idx],
                                            field: nextField,
                                            header: shouldAutoUpdateHeader && nextField
                                                ? toPrettyFieldLabel(nextField)
                                                : cols[idx].header,
                                        };
                                        onUpdate(control.id, {
                                            columns: cols,
                                        });
                                    } }) }), _jsx(FieldGroup, { label: "Format", className: classes.field, children: _jsx(Dropdown, { size: "small", value: col.format ?? 'text', selectedOptions: [col.format ?? 'text'], onOptionSelect: (_, d) => {
                                        const cols = [...control.columns];
                                        cols[idx] = {
                                            ...cols[idx],
                                            format: d.optionValue,
                                        };
                                        onUpdate(control.id, {
                                            columns: cols,
                                        });
                                    }, children: TABLE_COL_FORMATS.map((f) => (_jsx(Option, { value: f, children: f }, f))) }) }), col.format === 'button' && (_jsxs(_Fragment, { children: [_jsx(FieldGroup, { label: "Action Prompt", className: classes.field, children: _jsx(ActionBindingInput, { placeholder: "Enter text with {field}", bindingPaths: columnFieldPaths, globalBindingPaths: bindingPaths, value: col.prompt ?? '', onChange: (v) => {
                                                const cols = [...control.columns];
                                                cols[idx] = {
                                                    ...cols[idx],
                                                    prompt: v || undefined,
                                                };
                                                onUpdate(control.id, {
                                                    columns: cols,
                                                });
                                            } }) }), _jsx(FieldGroup, { label: "Button Label", className: classes.field, children: _jsx(Input, { size: "small", placeholder: col.header || 'Action', value: col.buttonLabel ?? '', onChange: (_, d) => {
                                                const cols = [...control.columns];
                                                cols[idx] = {
                                                    ...cols[idx],
                                                    buttonLabel: d.value || undefined,
                                                };
                                                onUpdate(control.id, {
                                                    columns: cols,
                                                });
                                            } }) })] }))] }, col.key))), _jsx(Button, { className: classes.addColumnBtn, appearance: "outline", size: "small", onClick: () => {
                            const cols = [
                                ...control.columns,
                                { key: `col${control.columns.length + 1}`, header: 'New Column' },
                            ];
                            onUpdate(control.id, { columns: cols });
                        }, children: "+ Add Column" })] }), _jsxs(CollapsibleSection, { title: `Summary Tiles (${(control.summaryTiles ?? []).length})`, classes: classes, children: [(control.summaryTiles ?? []).map((tile, idx) => {
                        const resolvedId = tile.id ?? `tile${idx + 1}`;
                        const isFilterEnabled = tile.showAll !== true;
                        return (_jsxs("div", { className: classes.columnCard, children: [_jsxs("div", { className: classes.columnHeader, children: [_jsxs(Text, { weight: "semibold", size: 200, children: ["Tile #", idx + 1] }), _jsx(Button, { appearance: "subtle", size: "small", onClick: () => {
                                                const tiles = (control.summaryTiles ?? []).filter((_, i) => i !== idx);
                                                updateSummaryTiles(tiles);
                                            }, children: "Remove" })] }), _jsx(FieldGroup, { label: "Tile Id", className: classes.field, children: _jsx(Input, { size: "small", placeholder: `tile${idx + 1}`, value: tile.id ?? '', onChange: (_, d) => {
                                            const oldKey = getSummaryTileKey(tile.id, idx);
                                            const nextId = d.value || undefined;
                                            const newKey = getSummaryTileKey(nextId, idx);
                                            if (oldKey !== newKey && manuallyEditedTileLabels[oldKey]) {
                                                setManuallyEditedTileLabels((prev) => {
                                                    const next = { ...prev };
                                                    delete next[oldKey];
                                                    next[newKey] = true;
                                                    return next;
                                                });
                                            }
                                            const tiles = [...(control.summaryTiles ?? [])];
                                            tiles[idx] = {
                                                ...tiles[idx],
                                                id: nextId,
                                            };
                                            updateSummaryTiles(tiles);
                                        } }) }), _jsx(FieldGroup, { label: "Label", className: classes.field, children: _jsx(Input, { size: "small", value: tile.label, onChange: (_, d) => {
                                            const key = getSummaryTileKey(tile.id, idx);
                                            setManuallyEditedTileLabels((prev) => ({
                                                ...prev,
                                                [key]: true,
                                            }));
                                            const tiles = [...(control.summaryTiles ?? [])];
                                            tiles[idx] = {
                                                ...tiles[idx],
                                                label: d.value,
                                            };
                                            updateSummaryTiles(tiles);
                                        } }) }), _jsx(FieldGroup, { label: "Icon", className: classes.field, children: _jsx(IconPickerDialog, { value: tile.iconName, onChange: (iconName) => {
                                            const tiles = [...(control.summaryTiles ?? [])];
                                            tiles[idx] = {
                                                ...tiles[idx],
                                                iconName,
                                            };
                                            updateSummaryTiles(tiles);
                                        } }) }), _jsx(FieldGroup, { label: "Filter by Field", className: classes.field, children: _jsx(Switch, { checked: isFilterEnabled, onChange: (_, d) => {
                                            const key = getSummaryTileKey(tile.id, idx);
                                            const hasManualLabel = manuallyEditedTileLabels[key] === true;
                                            const enableFilter = d.checked;
                                            const tiles = [...(control.summaryTiles ?? [])];
                                            tiles[idx] = {
                                                ...tiles[idx],
                                                showAll: !enableFilter,
                                                label: hasManualLabel
                                                    ? tiles[idx].label
                                                    : enableFilter
                                                        ? toPrettyFieldLabel(tiles[idx].field)
                                                        : 'All',
                                            };
                                            updateSummaryTiles(tiles);
                                        } }) }), isFilterEnabled && (_jsxs(_Fragment, { children: [_jsx(FieldGroup, { label: "Filter Field", className: classes.field, children: _jsx(BindingEditor, { placeholder: "e.g. status", bindingPaths: columnFieldPaths, value: tile.field ?? '', onChange: (v) => {
                                                    const key = getSummaryTileKey(tile.id, idx);
                                                    const hasManualLabel = manuallyEditedTileLabels[key] === true;
                                                    const currentAutoLabel = toPrettyFieldLabel(tile.field);
                                                    const shouldAutoUpdateLabel = !hasManualLabel &&
                                                        (!tile.label ||
                                                            tile.label === 'New Tile' ||
                                                            tile.label === currentAutoLabel);
                                                    const tiles = [...(control.summaryTiles ?? [])];
                                                    tiles[idx] = {
                                                        ...tiles[idx],
                                                        field: v || undefined,
                                                        label: shouldAutoUpdateLabel
                                                            ? toPrettyFieldLabel(v || undefined)
                                                            : tiles[idx].label,
                                                    };
                                                    updateSummaryTiles(tiles);
                                                } }) }), _jsx(FieldGroup, { label: "Filter Value", className: classes.field, children: _jsx(Input, { size: "small", disabled: !tile.field, placeholder: tile.field ? 'e.g. Draft' : 'Choose filter field first', value: String(tile.value ?? ''), onChange: (_, d) => {
                                                    const tiles = [...(control.summaryTiles ?? [])];
                                                    tiles[idx] = {
                                                        ...tiles[idx],
                                                        value: d.value,
                                                    };
                                                    updateSummaryTiles(tiles);
                                                } }) })] }))] }, `${resolvedId}-${idx}`));
                    }), _jsx(Button, { className: classes.addColumnBtn, appearance: "outline", size: "small", onClick: () => {
                            const tiles = [
                                ...(control.summaryTiles ?? []),
                                {
                                    id: `tile${(control.summaryTiles ?? []).length + 1}`,
                                    label: 'New Tile',
                                    showAll: true,
                                },
                            ];
                            updateSummaryTiles(tiles);
                        }, children: "+ Add Summary Tile" })] }), !control.binding && (_jsxs(CollapsibleSection, { title: `Static Rows (${(control.rows ?? []).length})`, classes: classes, children: [(control.rows ?? []).map((row, rowIdx) => (_jsxs("div", { className: classes.columnCard, children: [_jsxs("div", { className: classes.columnHeader, children: [_jsxs(Text, { weight: "semibold", size: 200, children: ["Row #", rowIdx + 1] }), _jsx(Button, { appearance: "subtle", size: "small", onClick: () => {
                                            const rows = (control.rows ?? []).filter((_, i) => i !== rowIdx);
                                            onUpdate(control.id, {
                                                rows,
                                            });
                                        }, children: "Remove" })] }), control.columns.map((col) => (_jsx(FieldGroup, { label: col.header || col.key, className: classes.field, children: _jsx(Input, { size: "small", value: String(row[col.key] ?? ''), onChange: (_, d) => {
                                        const rows = [...(control.rows ?? [])];
                                        rows[rowIdx] = {
                                            ...rows[rowIdx],
                                            [col.key]: d.value,
                                        };
                                        onUpdate(control.id, {
                                            rows,
                                        });
                                    } }) }, col.key)))] }, rowIdx))), _jsx(Button, { className: classes.addColumnBtn, appearance: "outline", size: "small", onClick: () => {
                            const emptyRow = {};
                            for (const col of control.columns) {
                                emptyRow[col.key] = '';
                            }
                            const rows = [...(control.rows ?? []), emptyRow];
                            onUpdate(control.id, { rows });
                        }, children: "+ Add Row" })] }))] }));
};
