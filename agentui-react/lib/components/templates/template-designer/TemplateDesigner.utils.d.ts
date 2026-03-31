/**
 * Extracts all dot-path binding paths from a JSON object.
 *
 * Given `{ request: { title: "...", items: [{ name: "A", qty: 2 }] } }`
 * the output is:
 *   ["request", "request.title", "request.items", "request.items.name", "request.items.qty"]
 *
 * Arrays are traversed to discover child properties, but indices are omitted
 * from the path so bindings remain generic (e.g. `items.name` not `items.0.name`).
 */
export declare const extractBindingPaths: (obj: unknown) => string[];
/**
 * Converts a binding field path into a readable title.
 * Example: "requestStatus.displayName" -> "Display Name".
 */
export declare const toPrettyFieldLabel: (field?: string) => string;
/**
 * Returns a stable tile key using explicit tile id when present,
 * otherwise falls back to index-based key.
 */
export declare const getSummaryTileKey: (tileId: string | undefined, idx: number) => string;
/**
 * Validates that a parsed JSON object conforms to the ITemplate shape.
 * Returns `null` if valid, or an error message string if not.
 */
export declare const validateTemplateJson: (obj: unknown) => string | null;
