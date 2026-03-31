export var TEMPLATE_PAGE_DISPATCH_ACTIONS;
(function (TEMPLATE_PAGE_DISPATCH_ACTIONS) {
    TEMPLATE_PAGE_DISPATCH_ACTIONS["SET_TEMPLATES"] = "SET_TEMPLATES";
    TEMPLATE_PAGE_DISPATCH_ACTIONS["SET_FORM_PANEL_TARGET"] = "SET_FORM_PANEL_TARGET";
    TEMPLATE_PAGE_DISPATCH_ACTIONS["SET_DESIGN_PANEL_TARGET"] = "SET_DESIGN_PANEL_TARGET";
    TEMPLATE_PAGE_DISPATCH_ACTIONS["SET_DELETE_TARGET"] = "SET_DELETE_TARGET";
    TEMPLATE_PAGE_DISPATCH_ACTIONS["SET_DELETE_ERROR"] = "SET_DELETE_ERROR";
    TEMPLATE_PAGE_DISPATCH_ACTIONS["SET_IS_DELETING"] = "SET_IS_DELETING";
    TEMPLATE_PAGE_DISPATCH_ACTIONS["SET_IS_PANEL_LOADING"] = "SET_IS_PANEL_LOADING";
    TEMPLATE_PAGE_DISPATCH_ACTIONS["SET_PANEL_ERROR"] = "SET_PANEL_ERROR";
    TEMPLATE_PAGE_DISPATCH_ACTIONS["SET_SEARCH_QUERY"] = "SET_SEARCH_QUERY";
})(TEMPLATE_PAGE_DISPATCH_ACTIONS || (TEMPLATE_PAGE_DISPATCH_ACTIONS = {}));
export class TemplatePageActions {
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
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_TEMPLATES,
                    data: { data: state.templates.data, loading: true },
                });
                try {
                    const entity = await this.service.getTemplates();
                    this.setTemplates({
                        data: entity.data ?? state.templates.data ?? [],
                        loading: false,
                        error: entity.error,
                    });
                }
                catch (error) {
                    console.error('[TemplatePage] Failed to load templates.', error);
                    this.setTemplates({
                        data: state.templates.data ?? [],
                        loading: false,
                        error: 'Unable to load templates.',
                    });
                }
            }
        });
        Object.defineProperty(this, "fetchTemplateById", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (templateId) => {
                const entity = await this.service.getTemplateById(templateId);
                return entity.data ?? undefined;
            }
        });
        Object.defineProperty(this, "createTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (template) => {
                const currentTemplates = this.getState().templates.data ?? [];
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_TEMPLATES,
                    data: { data: currentTemplates, loading: true },
                });
                const createdEntity = await this.service.addTemplate(template);
                if (!createdEntity.data) {
                    const errorMessage = createdEntity.error ?? 'Unable to create template.';
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_TEMPLATES,
                        data: { data: currentTemplates, loading: false, error: errorMessage },
                    });
                    throw new Error(errorMessage);
                }
                this.setTemplates({
                    data: [
                        createdEntity.data,
                        ...currentTemplates.filter((item) => item.id !== createdEntity.data?.id),
                    ],
                    loading: false,
                    error: createdEntity.error,
                });
                return createdEntity.data;
            }
        });
        Object.defineProperty(this, "updateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (template) => {
                const currentTemplates = this.getState().templates.data ?? [];
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_TEMPLATES,
                    data: { data: currentTemplates, loading: true },
                });
                const updatedEntity = await this.service.updateTemplate(template);
                if (!updatedEntity.data) {
                    const errorMessage = updatedEntity.error ?? 'Unable to update template.';
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_TEMPLATES,
                        data: { data: currentTemplates, loading: false, error: errorMessage },
                    });
                    throw new Error(errorMessage);
                }
                const updatedTemplate = updatedEntity.data;
                this.setTemplates({
                    data: currentTemplates.map((item) => item.id === updatedTemplate.id ? updatedTemplate : item),
                    loading: false,
                    error: updatedEntity.error,
                });
                return updatedTemplate;
            }
        });
        Object.defineProperty(this, "deleteTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (templateInput) => {
                const currentTemplates = this.getState().templates.data ?? [];
                const templateId = templateInput.id?.trim() ?? '';
                if (!templateId) {
                    throw new Error('Template id is required.');
                }
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_TEMPLATES,
                    data: { data: currentTemplates, loading: true },
                });
                const deleteResult = await this.service.deleteTemplate(templateId);
                if (deleteResult.error) {
                    const errorMessage = deleteResult.error;
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_TEMPLATES,
                        data: { data: currentTemplates, loading: false, error: errorMessage },
                    });
                    throw new Error(errorMessage);
                }
                this.setTemplates({
                    data: currentTemplates.filter((item) => item.id !== templateId),
                    loading: false,
                });
            }
        });
        // --- UI state actions ---
        Object.defineProperty(this, "openFormPanel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (target) => {
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_PANEL_ERROR,
                    data: '',
                });
                if (target?.id) {
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_FORM_PANEL_TARGET,
                        data: target,
                    });
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_IS_PANEL_LOADING,
                        data: true,
                    });
                    try {
                        const resolved = await this.fetchTemplateById(target.id);
                        this.dispatch({
                            type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_FORM_PANEL_TARGET,
                            data: resolved ?? target,
                        });
                    }
                    catch {
                        this.dispatch({
                            type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_PANEL_ERROR,
                            data: 'Failed to load template details.',
                        });
                    }
                    finally {
                        this.dispatch({
                            type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_IS_PANEL_LOADING,
                            data: false,
                        });
                    }
                }
                else {
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_FORM_PANEL_TARGET,
                        data: target,
                    });
                }
            }
        });
        Object.defineProperty(this, "closeFormPanel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_FORM_PANEL_TARGET,
                    data: undefined,
                });
            }
        });
        Object.defineProperty(this, "openDesignPanel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (template) => {
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_PANEL_ERROR,
                    data: '',
                });
                if (template.id) {
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DESIGN_PANEL_TARGET,
                        data: template,
                    });
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_IS_PANEL_LOADING,
                        data: true,
                    });
                    try {
                        const resolved = await this.fetchTemplateById(template.id);
                        this.dispatch({
                            type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DESIGN_PANEL_TARGET,
                            data: resolved ?? template,
                        });
                    }
                    catch {
                        this.dispatch({
                            type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_PANEL_ERROR,
                            data: 'Failed to load template details.',
                        });
                    }
                    finally {
                        this.dispatch({
                            type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_IS_PANEL_LOADING,
                            data: false,
                        });
                    }
                }
                else {
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DESIGN_PANEL_TARGET,
                        data: template,
                    });
                }
            }
        });
        Object.defineProperty(this, "closeDesignPanel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DESIGN_PANEL_TARGET,
                    data: null,
                });
            }
        });
        Object.defineProperty(this, "openDeleteDialog", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (template) => {
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DELETE_TARGET,
                    data: template,
                });
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DELETE_ERROR,
                    data: '',
                });
            }
        });
        Object.defineProperty(this, "closeDeleteDialog", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DELETE_TARGET,
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
                if (!deleteTarget)
                    return;
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DELETE_ERROR,
                    data: '',
                });
                this.dispatch({
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_IS_DELETING,
                    data: true,
                });
                try {
                    await this.deleteTemplate(deleteTarget);
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DELETE_TARGET,
                        data: null,
                    });
                }
                catch (error) {
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DELETE_ERROR,
                        data: error instanceof Error ? error.message : 'Failed to delete template.',
                    });
                }
                finally {
                    this.dispatch({
                        type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_IS_DELETING,
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
                    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_SEARCH_QUERY,
                    data: query,
                });
            }
        });
        Object.defineProperty(this, "saveTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (template) => {
                if (template.id) {
                    await this.updateTemplate(template);
                }
                else {
                    await this.createTemplate(template);
                }
            }
        });
        this.dispatch = dispatch;
        this.getState = getState;
        this.service = service;
    }
    setTemplates(entity) {
        this.dispatch({
            type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_TEMPLATES,
            data: entity,
        });
    }
}
