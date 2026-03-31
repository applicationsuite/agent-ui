import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, ProgressBar as FluentProgressBar, } from '@fluentui/react-components';
import { progressBarStyles } from './ProgressBar.styles';
import { toReactStyle, toTextStyle } from '../common.utils';
const useStyles = makeStyles(progressBarStyles);
export const ProgressBar = (props) => {
    const { value, label, max, style } = props;
    const classes = useStyles();
    return (_jsxs("div", { className: classes.root, style: toReactStyle(style), children: [label && (_jsx("span", { className: classes.label, style: toTextStyle(style), children: label })), _jsx(FluentProgressBar, { value: (value ?? 0) / (max ?? 100) })] }));
};
