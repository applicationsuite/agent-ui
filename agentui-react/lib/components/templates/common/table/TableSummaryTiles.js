import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button as FluentButton, mergeClasses } from '@fluentui/react-components';
import { getFluentIconComponent } from '../icons/fluentIcons';
export const TableSummaryTiles = ({ tiles, activeTileId, onSelectTile, classes, }) => {
    if (tiles.length === 0)
        return null;
    return (_jsx("div", { className: classes.summaryTilesRow, children: _jsx("div", { className: classes.summaryTiles, children: tiles.map((tile) => {
                const isActive = tile.id === activeTileId;
                const Icon = getFluentIconComponent(tile.iconName);
                return (_jsxs(FluentButton, { appearance: "transparent", className: mergeClasses(classes.summaryTile, isActive && classes.summaryTileActive), onClick: () => onSelectTile(tile.id), "aria-pressed": isActive, children: [Icon && (_jsx("span", { className: classes.summaryTileIcon, children: _jsx(Icon, { "aria-hidden": true }) })), _jsxs("span", { className: classes.summaryTileText, children: [_jsx("span", { className: classes.summaryTileCount, children: tile.count }), _jsx("span", { className: classes.summaryTileLabel, children: tile.label })] })] }, tile.id));
            }) }) }));
};
