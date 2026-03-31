import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo, useCallback, useEffect } from 'react';
import { makeStyles, mergeClasses, Button as FluentButton, Input, Table as FluentTable, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, TableCellLayout, } from '@fluentui/react-components';
import { ArrowSortDown20Filled, ArrowSortUp20Filled, Search20Regular, Dismiss20Regular, } from '@fluentui/react-icons';
import { tableStyles } from './Table.styles';
import { formatValue, toReactStyle, toTextStyle } from '../common.utils';
import { compareCells, resolveActionTemplate, matchesSummaryTile, } from './Table.utils';
import { TableSummaryTiles } from './TableSummaryTiles';
const useStyles = makeStyles(tableStyles);
export const Table = (props) => {
    const { rows, rawRows, columns, label, onRowClickPrompt, onAction, style, sortable = true, searchable = true, searchPlaceholder = 'Search across all columns...', showRecordCount = false, summaryTiles, } = props;
    const classes = useStyles();
    const [sort, setSort] = useState(null);
    const [search, setSearch] = useState('');
    const [activeSummaryTileId, setActiveSummaryTileId] = useState(null);
    const handleRowClick = onRowClickPrompt
        ? (row) => {
            const mergedData = { ...props.serverData, ...row };
            const resolved = resolveActionTemplate(onRowClickPrompt, mergedData);
            onAction?.(onRowClickPrompt, {
                prompt: resolved,
                data: mergedData,
            });
        }
        : undefined;
    const handleHeaderClick = useCallback((colKey, colSortable) => {
        if (!sortable)
            return;
        if (colSortable === false)
            return;
        setSort((prev) => {
            if (prev?.key === colKey) {
                return prev.dir === 'asc'
                    ? { key: colKey, dir: 'desc' }
                    : null;
            }
            return { key: colKey, dir: 'asc' };
        });
    }, [sortable]);
    const baseRows = useMemo(() => {
        return (rows ?? []).map((r, i) => ({
            row: r,
            raw: rawRows?.[i] ?? r,
        }));
    }, [rows, rawRows]);
    const resolvedSummaryTiles = useMemo(() => {
        return (summaryTiles ?? []).map((tile, idx) => ({
            ...tile,
            id: tile.id ?? `summary-tile-${idx}`,
            count: baseRows.filter((entry) => matchesSummaryTile(entry, tile)).length,
        }));
    }, [summaryTiles, baseRows]);
    useEffect(() => {
        if (activeSummaryTileId &&
            !resolvedSummaryTiles.some((tile) => tile.id === activeSummaryTileId)) {
            setActiveSummaryTileId(null);
        }
    }, [resolvedSummaryTiles, activeSummaryTileId]);
    const handleSummaryTileToggle = useCallback((tileId) => {
        setActiveSummaryTileId((current) => (current === tileId ? null : tileId));
    }, []);
    const activeSummaryTile = useMemo(() => resolvedSummaryTiles.find((tile) => tile.id === activeSummaryTileId) ??
        null, [resolvedSummaryTiles, activeSummaryTileId]);
    const processedRows = useMemo(() => {
        let result = baseRows;
        if (activeSummaryTile && !activeSummaryTile.showAll) {
            result = result.filter((entry) => matchesSummaryTile(entry, activeSummaryTile));
        }
        // Filter by search term across all visible columns
        if (searchable && search) {
            const term = search.toLowerCase();
            result = result.filter((entry) => columns.some((col) => {
                const val = entry.row[col.key];
                return val != null && String(val).toLowerCase().includes(term);
            }));
        }
        // Sort
        if (sortable && sort) {
            result = [...result].sort((a, b) => compareCells(a.row[sort.key], b.row[sort.key], sort.dir));
        }
        return result;
    }, [
        baseRows,
        activeSummaryTile,
        columns,
        searchable,
        search,
        sortable,
        sort,
    ]);
    const totalCount = (rows ?? []).length;
    const filteredCount = processedRows.length;
    const recordCountText = search
        ? `Showing ${filteredCount} of ${totalCount} records`
        : `Showing ${totalCount} records`;
    return (_jsxs("div", { className: classes.root, style: toReactStyle(style), children: [label && (_jsx("span", { className: classes.label, style: toTextStyle(style), children: label })), _jsx(TableSummaryTiles, { tiles: resolvedSummaryTiles, activeTileId: activeSummaryTileId, onSelectTile: handleSummaryTileToggle, classes: {
                    summaryTilesRow: classes.summaryTilesRow,
                    summaryTiles: classes.summaryTiles,
                    summaryTile: classes.summaryTile,
                    summaryTileActive: classes.summaryTileActive,
                    summaryTileIcon: classes.summaryTileIcon,
                    summaryTileText: classes.summaryTileText,
                    summaryTileCount: classes.summaryTileCount,
                    summaryTileLabel: classes.summaryTileLabel,
                } }), _jsxs("div", { className: classes.toolbar, children: [showRecordCount && (_jsx("div", { className: classes.recordCount, children: recordCountText })), searchable && (_jsx(Input, { className: classes.searchBox, size: "small", placeholder: searchPlaceholder, contentBefore: _jsx(Search20Regular, {}), contentAfter: search ? (_jsx(FluentButton, { appearance: "transparent", size: "small", icon: _jsx(Dismiss20Regular, {}), onClick: () => setSearch(''), "aria-label": "Clear search" })) : undefined, value: search, onChange: (_, d) => setSearch(d.value) }))] }), _jsx("div", { className: classes.tableWrapper, children: _jsxs(FluentTable, { size: "small", children: [_jsx(TableHeader, { children: _jsx(TableRow, { className: classes.headerRow, children: columns.map((col) => {
                                    const isSortable = sortable && col.sortable !== false;
                                    const isActive = sort?.key === col.key;
                                    return (_jsx(TableHeaderCell, { className: mergeClasses(classes.headerCell, isSortable && classes.sortableHeader), onClick: isSortable
                                            ? () => handleHeaderClick(col.key, col.sortable)
                                            : undefined, style: col.minWidth ? { minWidth: col.minWidth } : undefined, children: _jsxs(TableCellLayout, { children: [col.header, isActive && (_jsx("span", { className: classes.sortIcon, children: sort.dir === 'asc' ? (_jsx(ArrowSortUp20Filled, {})) : (_jsx(ArrowSortDown20Filled, {})) }))] }) }, col.key));
                                }) }) }), _jsxs(TableBody, { children: [processedRows.length === 0 && (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length, children: _jsx("div", { className: classes.emptyMessageRow, children: "No data available" }) }) })), processedRows.map((entry, idx) => (_jsx(TableRow, { className: handleRowClick ? classes.clickableRow : undefined, onClick: handleRowClick
                                        ? () => handleRowClick(entry.raw)
                                        : undefined, children: columns.map((col) => {
                                        const rawValue = entry.row[col.key];
                                        return (_jsx(TableCell, { children: _jsx(TableCellLayout, { children: col.format === 'button' ? (_jsx(FluentButton, { size: "small", appearance: "primary", className: classes.cellButton, onClick: (e) => {
                                                        e.stopPropagation();
                                                        if (col.prompt) {
                                                            const mergedData = { ...props.serverData, ...entry.raw };
                                                            const resolved = resolveActionTemplate(col.prompt, mergedData);
                                                            onAction?.(col.prompt, {
                                                                prompt: resolved,
                                                                data: mergedData,
                                                            });
                                                        }
                                                    }, children: col.buttonLabel ?? col.header })) : (formatValue(rawValue, col.format)) }) }, col.key));
                                    }) }, idx)))] })] }) })] }));
};
