import * as FluentIcons from '@fluentui/react-icons';
const ICON_NAME_PATTERN = /^(.*)20(Regular|Filled)$/;
const fluentIconEntries = Object.entries(FluentIcons)
    .filter(([name, value]) => {
    return ICON_NAME_PATTERN.test(name) && value != null;
})
    .sort(([a], [b]) => a.localeCompare(b));
const iconByName = new Map(fluentIconEntries.map(([name, value]) => [
    name,
    value,
]));
export const FLUENT_ICON_ITEMS = fluentIconEntries.map(([name, value]) => ({
    name,
    Icon: value,
}));
export const FLUENT_ICON_NAMES = fluentIconEntries.map(([name]) => name);
export function getFluentIconComponent(iconName) {
    if (!iconName)
        return null;
    return iconByName.get(iconName) ?? null;
}
