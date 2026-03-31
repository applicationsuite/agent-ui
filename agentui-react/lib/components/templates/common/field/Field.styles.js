import { tokens, shorthands } from '@fluentui/react-components';
export const fieldStyles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap(tokens.spacingVerticalXXS),
        minWidth: 0,
    },
    label: {
        fontSize: tokens.fontSizeBase100,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground3,
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
    },
    value: {
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightRegular,
        color: tokens.colorNeutralForeground1,
        wordBreak: 'break-word',
    },
    emptyValue: {
        color: tokens.colorNeutralForeground3,
        fontStyle: 'italic',
    },
};
