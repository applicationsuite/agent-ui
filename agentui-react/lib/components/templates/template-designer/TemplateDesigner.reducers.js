import { TEMPLATE_DESIGNER_DISPATCH_ACTIONS, } from './TemplateDesigner.actions';
export const templateDesignerReducer = (state, action) => {
    switch (action.type) {
        case TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_TEMPLATE: {
            return { ...state, template: action.data };
        }
        case TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_MODE: {
            return { ...state, mode: action.data };
        }
        case TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_SELECTED_ELEMENT: {
            return { ...state, selectedElement: action.data };
        }
        case TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_IS_DIRTY: {
            return { ...state, isDirty: action.data };
        }
        case TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_BINDING_PATHS: {
            return { ...state, bindingPaths: action.data };
        }
        case TEMPLATE_DESIGNER_DISPATCH_ACTIONS.SET_BINDING_DATA: {
            return { ...state, bindingData: action.data };
        }
        default: {
            throw new Error('Unhandled action type');
        }
    }
};
