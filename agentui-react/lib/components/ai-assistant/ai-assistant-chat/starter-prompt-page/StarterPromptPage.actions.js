export var STARTER_PROMPT_PAGE_DISPATCH_ACTIONS;
(function (STARTER_PROMPT_PAGE_DISPATCH_ACTIONS) {
    STARTER_PROMPT_PAGE_DISPATCH_ACTIONS["SET_PROMPTS"] = "SET_PROMPTS";
    STARTER_PROMPT_PAGE_DISPATCH_ACTIONS["SET_PANEL_TARGET"] = "SET_PANEL_TARGET";
    STARTER_PROMPT_PAGE_DISPATCH_ACTIONS["SET_DELETE_TARGET"] = "SET_DELETE_TARGET";
    STARTER_PROMPT_PAGE_DISPATCH_ACTIONS["SET_DELETE_ERROR"] = "SET_DELETE_ERROR";
    STARTER_PROMPT_PAGE_DISPATCH_ACTIONS["SET_IS_DELETING"] = "SET_IS_DELETING";
    STARTER_PROMPT_PAGE_DISPATCH_ACTIONS["SET_IS_SAVING"] = "SET_IS_SAVING";
    STARTER_PROMPT_PAGE_DISPATCH_ACTIONS["SET_PANEL_ERROR"] = "SET_PANEL_ERROR";
    STARTER_PROMPT_PAGE_DISPATCH_ACTIONS["SET_SEARCH_QUERY"] = "SET_SEARCH_QUERY";
})(STARTER_PROMPT_PAGE_DISPATCH_ACTIONS || (STARTER_PROMPT_PAGE_DISPATCH_ACTIONS = {}));
export class StarterPromptPageActions {
    constructor(dispatch, getState, service) {
        Object.defineProperty(this, "dispatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "service", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "initialize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                const state = this.getState();
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PROMPTS,
                    data: { data: state.prompts.data, loading: true },
                });
                try {
                    const entity = await this.service.getStarterPrompts();
                    this.setPrompts({
                        data: entity.data ?? state.prompts.data ?? [],
                        loading: false,
                        error: entity.error,
                    });
                }
                catch (error) {
                    console.error('[StarterPromptPage] Failed to load prompts.', error);
                    this.setPrompts({
                        data: state.prompts.data ?? [],
                        loading: false,
                        error: 'Unable to load starter prompts.',
                    });
                }
            }
        });
        Object.defineProperty(this, "savePrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (prompt) => {
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_IS_SAVING,
                    data: true,
                });
                const currentPrompts = this.getState().prompts.data ?? [];
                const isEdit = Boolean(prompt.id);
                try {
                    if (isEdit) {
                        const updatedEntity = await this.service.updateStarterPrompt(prompt);
                        if (!updatedEntity.data) {
                            throw new Error(updatedEntity.error ?? 'Unable to update starter prompt.');
                        }
                        const updatedPrompt = updatedEntity.data;
                        this.setPrompts({
                            data: currentPrompts.map((item) => item.id === updatedPrompt.id ? updatedPrompt : item),
                            loading: false,
                        });
                    }
                    else {
                        const createdEntity = await this.service.addStarterPrompt(prompt);
                        if (!createdEntity.data) {
                            throw new Error(createdEntity.error ?? 'Unable to create starter prompt.');
                        }
                        this.setPrompts({
                            data: [
                                createdEntity.data,
                                ...currentPrompts.filter((item) => item.id !== createdEntity.data?.id),
                            ],
                            loading: false,
                        });
                    }
                    this.dispatch({
                        type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PANEL_TARGET,
                        data: null,
                    });
                }
                catch (error) {
                    const message = error instanceof Error
                        ? error.message
                        : 'Unable to save starter prompt.';
                    this.dispatch({
                        type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PANEL_ERROR,
                        data: message,
                    });
                }
                finally {
                    this.dispatch({
                        type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_IS_SAVING,
                        data: false,
                    });
                }
            }
        });
        // --- UI state actions ---
        Object.defineProperty(this, "openCreatePanel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PANEL_ERROR,
                    data: '',
                });
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PANEL_TARGET,
                    data: undefined,
                });
            }
        });
        Object.defineProperty(this, "openEditPanel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (prompt) => {
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PANEL_ERROR,
                    data: '',
                });
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PANEL_TARGET,
                    data: prompt,
                });
            }
        });
        Object.defineProperty(this, "closePanel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PANEL_TARGET,
                    data: null,
                });
            }
        });
        Object.defineProperty(this, "openDeleteDialog", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (prompt) => {
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_DELETE_ERROR,
                    data: '',
                });
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_DELETE_TARGET,
                    data: prompt,
                });
            }
        });
        Object.defineProperty(this, "closeDeleteDialog", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_DELETE_ERROR,
                    data: '',
                });
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_DELETE_TARGET,
                    data: null,
                });
            }
        });
        Object.defineProperty(this, "confirmDelete", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                const deleteTarget = this.getState().deleteTarget;
                if (!deleteTarget?.id) {
                    return;
                }
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_DELETE_ERROR,
                    data: '',
                });
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_IS_DELETING,
                    data: true,
                });
                try {
                    const deleteResult = await this.service.deleteStarterPrompt(deleteTarget.id, deleteTarget.agentName);
                    if (deleteResult.error) {
                        throw new Error(deleteResult.error);
                    }
                    const currentPrompts = this.getState().prompts.data ?? [];
                    this.setPrompts({
                        data: currentPrompts.filter((item) => item.id !== deleteTarget.id),
                        loading: false,
                    });
                    this.dispatch({
                        type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_DELETE_TARGET,
                        data: null,
                    });
                }
                catch (error) {
                    this.dispatch({
                        type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_DELETE_ERROR,
                        data: error instanceof Error
                            ? error.message
                            : 'Unable to delete starter prompt.',
                    });
                }
                finally {
                    this.dispatch({
                        type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_IS_DELETING,
                        data: false,
                    });
                }
            }
        });
        Object.defineProperty(this, "setSearchQuery", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (query) => {
                this.dispatch({
                    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_SEARCH_QUERY,
                    data: query,
                });
            }
        });
        this.dispatch = dispatch;
        this.getState = getState;
        this.service = service;
    }
    setPrompts(entity) {
        this.dispatch({
            type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PROMPTS,
            data: entity,
        });
    }
}
