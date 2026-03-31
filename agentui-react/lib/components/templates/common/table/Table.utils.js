import { resolveBinding } from '../../template-renderer/bindingResolver';
export function compareCells(a, b, dir) {
    const aVal = a ?? '';
    const bVal = b ?? '';
    let result;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
        result = aVal - bVal;
    }
    else {
        result = String(aVal).localeCompare(String(bVal), undefined, {
            numeric: true,
            sensitivity: 'base',
        });
    }
    return dir === 'desc' ? -result : result;
}
/**
 * Resolve `{field}` placeholders in an action template using the original
 * (unflattened) data-source row so nested paths resolve correctly.
 */
export function resolveActionTemplate(template, rawRow) {
    return template.replace(/\{(\w+(?:\.\w+)*)\}/g, (_match, path) => {
        const val = resolveBinding(path, rawRow);
        return val != null ? String(val) : '';
    });
}
function valuesEqual(actual, expected) {
    if (expected == null)
        return actual == null;
    if (typeof expected === 'number') {
        return Number(actual) === expected;
    }
    if (typeof expected === 'boolean') {
        return actual === expected;
    }
    return String(actual ?? '').toLowerCase() === expected.toLowerCase();
}
function hasUsableFilterValue(value) {
    if (value == null)
        return false;
    if (typeof value === 'string')
        return value.trim().length > 0;
    return true;
}
export function matchesSummaryTile(entry, tile) {
    if (tile.showAll || !tile.field || !hasUsableFilterValue(tile.value)) {
        return true;
    }
    const directVal = entry.row[tile.field];
    const resolvedVal = directVal !== undefined
        ? directVal
        : resolveBinding(tile.field, entry.raw);
    return valuesEqual(resolvedVal, tile.value);
}
