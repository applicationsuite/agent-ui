/**
 * Resolve a dot-path like "request.customer.name" against a data object.
 * Supports bracket notation: "items[0].name"
 *
 * Returns `undefined` if the path cannot be fully resolved.
 */
export function resolveBinding(path, data) {
    const segments = path
        .replace(/\[(\w+)\]/g, '.$1')
        .split('.')
        .filter(Boolean);
    let current = data;
    for (const segment of segments) {
        if (current == null || typeof current !== 'object')
            return undefined;
        current = current[segment];
    }
    return current;
}
/**
 * Resolve an IBindable<T> against server data.
 * If `binding` is set, resolve from data; otherwise return `value`.
 * If the resolved value is a non-primitive (object/array), returns `value`
 * as a fallback to prevent rendering errors.
 */
export function resolveBindable(bindable, data) {
    if (bindable == null)
        return undefined;
    // Plain literal (string, number, etc.)
    if (typeof bindable !== 'object')
        return bindable;
    const b = bindable;
    if (b.binding) {
        const resolved = resolveBinding(b.binding, data);
        // Guard against non-primitive values (objects/arrays) that can't be
        // safely used where a string/number is expected.
        if (resolved !== null && typeof resolved === 'object') {
            return b.value;
        }
        return resolved;
    }
    return b.value;
}
/**
 * Resolve a map of data bindings. For each key in `dataBindings`,
 * resolve the dot-path and merge with the static `data` object.
 *
 * Example:
 *   data: { requestId: "static-123" }
 *   dataBindings: { requestId: "request.id", orderId: "order.id" }
 *   data: { request: { id: "CR-001" }, order: { id: "ORD-55" } }
 *   → { requestId: "CR-001", orderId: "ORD-55" }
 */
export function resolveDataBindings(staticData, dataBindings, data) {
    const result = { ...(staticData ?? {}) };
    if (dataBindings) {
        for (const [key, path] of Object.entries(dataBindings)) {
            result[key] = resolveBinding(path, data);
        }
    }
    return result;
}
