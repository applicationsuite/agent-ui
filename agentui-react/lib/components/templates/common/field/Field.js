import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { fieldStyles } from './Field.styles';
import { formatValue, toReactStyle, toTextStyle } from '../common.utils';
const useStyles = makeStyles(fieldStyles);
export const Field = (props) => {
    const { value, label, format, style } = props;
    const classes = useStyles();
    const textStyle = toTextStyle(style);
    const isEmpty = value == null;
    return (_jsxs("div", { className: classes.root, style: toReactStyle(style), children: [_jsx("span", { className: classes.label, style: textStyle, children: label }), _jsx("span", { className: mergeClasses(classes.value, isEmpty && classes.emptyValue), style: textStyle, children: formatValue(value, format) })] }));
};
