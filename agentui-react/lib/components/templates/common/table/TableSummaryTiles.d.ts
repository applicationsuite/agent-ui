import React from 'react';
import type { ResolvedSummaryTile } from './Table.utils';
export interface ITableSummaryTilesClassNames {
    summaryTilesRow: string;
    summaryTiles: string;
    summaryTile: string;
    summaryTileActive: string;
    summaryTileIcon: string;
    summaryTileText: string;
    summaryTileCount: string;
    summaryTileLabel: string;
}
export interface ITableSummaryTilesProps {
    tiles: ResolvedSummaryTile[];
    activeTileId: string | null;
    onSelectTile: (tileId: string) => void;
    classes: ITableSummaryTilesClassNames;
}
export declare const TableSummaryTiles: React.FC<ITableSummaryTilesProps>;
