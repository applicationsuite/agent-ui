import { jsx as _jsx } from "react/jsx-runtime";
import { Divider } from '@fluentui/react-components';
import { toReactStyle } from '../common.utils';
export const Separator = ({ label, style }) => (_jsx(Divider, { style: { gridColumn: '1 / -1', ...toReactStyle(style) }, children: label }));
