import type { ControlValue, ITableSummaryTile } from '../../templates.models';
export type SortDir = 'asc' | 'desc';
export type SortState = {
    key: string;
    dir: SortDir;
} | null;
export type RowEntry = {
    row: Record<string, ControlValue>;
    raw: Record<string, unknown>;
};
export type ResolvedSummaryTile = ITableSummaryTile & {
    id: string;
    count: number;
};
export declare function compareCells(a: ControlValue, b: ControlValue, dir: SortDir): number;
/**
 * Resolve `{field}` placeholders in an action template using the original
 * (unflattened) data-source row so nested paths resolve correctly.
 */
export declare function resolveActionTemplate(template: string, rawRow: Record<string, unknown>): string;
export declare function matchesSummaryTile(entry: RowEntry, tile: ITableSummaryTile): boolean;
