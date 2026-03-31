import { jsx as _jsx } from "react/jsx-runtime";
import { makeStyles, Image as FluentImage } from '@fluentui/react-components';
import { imageStyles } from './Image.styles';
import { toReactStyle } from '../common.utils';
const useStyles = makeStyles(imageStyles);
export const ImageControl = (props) => {
    const { src, alt, width, height, style } = props;
    const classes = useStyles();
    return (_jsx(FluentImage, { src: src ?? '', alt: alt ?? '', className: classes.root, style: toReactStyle(style), width: width, height: height }));
};
