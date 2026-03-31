import { useEffect, useReducer, useRef } from 'react';
import { templateDesignerReducer } from './TemplateDesigner.reducers';
import { TemplateDesignerActions, } from './TemplateDesigner.actions';
import { TemplateDesignerMode, } from './TemplateDesigner.models';
import { extractBindingPaths, validateTemplateJson, } from './TemplateDesigner.utils';
const parseTemplate = (input) => {
    if (!input)
        return undefined;
    if (typeof input === 'string') {
        try {
            const parsed = JSON.parse(input);
            const error = validateTemplateJson(parsed);
            if (error)
                return undefined;
            return parsed;
        }
        catch {
            return undefined;
        }
    }
    // Object — validate shape before treating as ITemplate
    const error = validateTemplateJson(input);
    if (error)
        return undefined;
    return input;
};
const initialState = {
    template: { loading: true },
    mode: TemplateDesignerMode.Design,
    selectedElement: undefined,
    isDirty: false,
    bindingPaths: [],
    bindingData: {},
};
const getInitialState = (isReadOnly) => ({
    ...initialState,
    mode: isReadOnly ? TemplateDesignerMode.Preview : TemplateDesignerMode.Design,
});
export const useInit = (props) => {
    const [state, dispatch] = useReducer(templateDesignerReducer, getInitialState(props.isReadOnly));
    const stateRef = useRef(state);
    const actionsRef = useRef(undefined);
    stateRef.current = state;
    if (!actionsRef.current) {
        actionsRef.current = new TemplateDesignerActions(dispatch, () => stateRef.current, props);
    }
    actionsRef.current.updateProps(props);
    const actions = actionsRef.current;
    useEffect(() => {
        const parsed = parseTemplate(props.template);
        const parseError = props.template && !parsed
            ? 'Invalid template: the provided template could not be parsed.'
            : undefined;
        actions.initialize(parsed, parseError);
    }, []);
    // Seed data source from props (can be overridden by file upload)
    useEffect(() => {
        let data;
        if (typeof props.dataSource === 'string') {
            try {
                const parsed = JSON.parse(props.dataSource);
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    data = parsed;
                }
            }
            catch {
                // invalid JSON — ignore
            }
        }
        else if (props.dataSource) {
            data = props.dataSource;
        }
        if (data && Object.keys(data).length > 0) {
            const paths = extractBindingPaths(data);
            actions.setBindingPaths(paths);
            actions.setBindingData(data);
        }
    }, [props.dataSource]);
    return { state, actions };
};
