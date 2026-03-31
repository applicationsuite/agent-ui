import { HttpAgent } from '@ag-ui/client';
/**
 * Extended HttpAgent that injects `model` into the POST body
 * so the orchestrator knows which deployment to use.
 */
export class ExtendedHttpAgent extends HttpAgent {
    constructor(config, model) {
        super(config);
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.model = model;
    }
    requestInit(input) {
        const base = super.requestInit(input);
        const body = typeof base.body === 'string' ? JSON.parse(base.body) : {};
        if (this.model) {
            body.model = this.model;
        }
        return { ...base, body: JSON.stringify(body) };
    }
}
