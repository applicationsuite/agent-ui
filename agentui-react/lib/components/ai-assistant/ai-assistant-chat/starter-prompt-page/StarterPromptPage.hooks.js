import { useEffect, useReducer, useRef } from 'react';
import { starterPromptPageReducer } from './StarterPromptPage.reducers';
import { StarterPromptPageActions, } from './StarterPromptPage.actions';
const initialState = {
    prompts: { loading: true },
    panelTarget: null,
    deleteTarget: null,
    deleteError: '',
    isDeleting: false,
    isSaving: false,
    panelError: '',
    searchQuery: '',
};
export const useStarterPromptPage = (props, service) => {
    const hasInitialData = !!(props.initialData?.data && props.initialData.data.length > 0);
    const [state, dispatch] = useReducer(starterPromptPageReducer, {
        ...initialState,
        prompts: hasInitialData
            ? { data: props.initialData.data, loading: false }
            : initialState.prompts,
    });
    const stateRef = useRef(state);
    const actionsRef = useRef(undefined);
    stateRef.current = state;
    if (!actionsRef.current) {
        actionsRef.current = new StarterPromptPageActions(dispatch, () => stateRef.current, service);
    }
    const actions = actionsRef.current;
    useEffect(() => {
        if (!hasInitialData) {
            void actions.initialize();
        }
    }, []);
    return { state, actions };
};
