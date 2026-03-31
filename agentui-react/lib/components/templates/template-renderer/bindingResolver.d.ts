import type { IBindable, ControlValue } from '../templates.models';
/**
 * Resolve a dot-path like "request.customer.name" against a data object.
 * Supports bracket notation: "items[0].name"
 *
 * Returns `undefined` if the path cannot be fully resolved.
 */
export declare function resolveBinding(path: string, data: Record<string, unknown>): unknown;
/**
 * Resolve an IBindable<T> against server data.
 * If `binding` is set, resolve from data; otherwise return `value`.
 * If the resolved value is a non-primitive (object/array), returns `value`
 * as a fallback to prevent rendering errors.
 */
export declare function resolveBindable<T = ControlValue>(bindable: T | IBindable<T> | undefined, data: Record<string, unknown>): T | undefined;
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
export declare function resolveDataBindings(staticData: Record<string, unknown> | undefined, dataBindings: Record<string, string> | undefined, data: Record<string, unknown>): Record<string, unknown>;
