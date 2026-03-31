import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, Badge as FluentBadge } from '@fluentui/react-components';
import { badgeStyles } from './Badge.styles';
import { toReactStyle, toTextStyle } from '../common.utils';
const useStyles = makeStyles(badgeStyles);
export const Badge = (props) => {
    const { value, color, label, style } = props;
    const classes = useStyles();
    return (_jsxs("div", { style: toReactStyle(style), children: [label && (_jsx("span", { className: classes.label, style: toTextStyle(style), children: label })), _jsx(FluentBadge, { appearance: "filled", color: color ?? 'informative', children: value ?? '' })] }));
};
