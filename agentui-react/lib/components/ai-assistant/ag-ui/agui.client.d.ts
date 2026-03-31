import { HttpAgent } from '@ag-ui/client';
import type { RunAgentInput } from '@ag-ui/core';
/**
 * Extended HttpAgent that injects `model` into the POST body
 * so the orchestrator knows which deployment to use.
 */
export declare class ExtendedHttpAgent extends HttpAgent {
    model?: string;
    constructor(config: ConstructorParameters<typeof HttpAgent>[0], model?: string);
    protected requestInit(input: RunAgentInput): RequestInit;
}
