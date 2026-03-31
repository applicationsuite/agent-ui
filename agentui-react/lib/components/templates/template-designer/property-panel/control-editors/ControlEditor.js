import { jsx as _jsx } from "react/jsx-runtime";
import { ControlType } from '../../../templates.models';
import { FieldEditor } from './FieldEditor';
import { ButtonEditor } from './ButtonEditor';
import { BadgeEditor } from './BadgeEditor';
import { ImageEditor } from './ImageEditor';
import { ProgressBarEditor } from './ProgressBarEditor';
import { TableEditor } from './TableEditor';
export const ControlEditor = ({ control, onUpdate, classes, bindingPaths, bindingData, inputFieldInfo = [], }) => {
    switch (control.type) {
        case ControlType.Field:
            return (_jsx(FieldEditor, { control: control, onUpdate: onUpdate, classes: classes, bindingPaths: bindingPaths }));
        case ControlType.Button:
            return (_jsx(ButtonEditor, { control: control, onUpdate: onUpdate, classes: classes, bindingPaths: bindingPaths, inputFieldInfo: inputFieldInfo }));
        case ControlType.Badge:
            return (_jsx(BadgeEditor, { control: control, onUpdate: onUpdate, classes: classes, bindingPaths: bindingPaths }));
        case ControlType.Image:
            return (_jsx(ImageEditor, { control: control, onUpdate: onUpdate, classes: classes, bindingPaths: bindingPaths }));
        case ControlType.ProgressBar:
            return (_jsx(ProgressBarEditor, { control: control, onUpdate: onUpdate, classes: classes, bindingPaths: bindingPaths }));
        case ControlType.Table:
            return (_jsx(TableEditor, { control: control, onUpdate: onUpdate, classes: classes, bindingPaths: bindingPaths, bindingData: bindingData }));
        default:
            return null;
    }
};
