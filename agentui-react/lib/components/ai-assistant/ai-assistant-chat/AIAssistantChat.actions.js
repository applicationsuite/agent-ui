export var ASSISTANT_CHAT_DISPATCH_ACTIONS;
(function (ASSISTANT_CHAT_DISPATCH_ACTIONS) {
    ASSISTANT_CHAT_DISPATCH_ACTIONS["SET_ACTIVE_NAV"] = "SET_ACTIVE_NAV";
    ASSISTANT_CHAT_DISPATCH_ACTIONS["SET_SIDEBAR_COLLAPSED"] = "SET_SIDEBAR_COLLAPSED";
    ASSISTANT_CHAT_DISPATCH_ACTIONS["SET_SEARCH_QUERY"] = "SET_SEARCH_QUERY";
    ASSISTANT_CHAT_DISPATCH_ACTIONS["SET_INPUT_VALUE"] = "SET_INPUT_VALUE";
    ASSISTANT_CHAT_DISPATCH_ACTIONS["SET_DEVELOPER_MODE"] = "SET_DEVELOPER_MODE";
    ASSISTANT_CHAT_DISPATCH_ACTIONS["SET_USE_RAW_RESPONSE"] = "SET_USE_RAW_RESPONSE";
})(ASSISTANT_CHAT_DISPATCH_ACTIONS || (ASSISTANT_CHAT_DISPATCH_ACTIONS = {}));
export class AIAssistantChatActions {
    constructor(dispatch, state) {
        Object.defineProperty(this, "dispatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "setActiveNav", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (navItem) => {
                this.dispatch({
                    type: ASSISTANT_CHAT_DISPATCH_ACTIONS.SET_ACTIVE_NAV,
                    data: navItem,
                });
            }
        });
        Object.defineProperty(this, "toggleSidebar", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.dispatch({
                    type: ASSISTANT_CHAT_DISPATCH_ACTIONS.SET_SIDEBAR_COLLAPSED,
                    data: !this.state.isSidebarCollapsed,
                });
            }
        });
        Object.defineProperty(this, "setSearchQuery", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (query) => {
                this.dispatch({
                    type: ASSISTANT_CHAT_DISPATCH_ACTIONS.SET_SEARCH_QUERY,
                    data: query,
                });
            }
        });
        Object.defineProperty(this, "setInputValue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (value) => {
                this.dispatch({
                    type: ASSISTANT_CHAT_DISPATCH_ACTIONS.SET_INPUT_VALUE,
                    data: value,
                });
            }
        });
        Object.defineProperty(this, "toggleDeveloperMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.dispatch({
                    type: ASSISTANT_CHAT_DISPATCH_ACTIONS.SET_DEVELOPER_MODE,
                    data: !this.state.isDeveloperMode,
                });
            }
        });
        Object.defineProperty(this, "toggleRawResponse", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.dispatch({
                    type: ASSISTANT_CHAT_DISPATCH_ACTIONS.SET_USE_RAW_RESPONSE,
                    data: !this.state.useRawResponse,
                });
            }
        });
        this.dispatch = dispatch;
        this.state = state;
    }
}
