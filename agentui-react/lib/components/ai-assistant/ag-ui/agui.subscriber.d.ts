/**
 * AG-UI Event Subscriber Factory
 *
 * Creates subscriber objects for handling AG-UI streaming events,
 * mirroring the pattern used in Commerce.AI.Agents.Client.
 */
import type { AgentSubscriber } from '@ag-ui/client';
export interface IToolCallRecord {
    id: string;
    name: string;
    args?: string;
    result?: string;
    done: boolean;
}
export interface ITextAccumulator {
    text: string;
    toolCalls: Map<string, IToolCallRecord>;
    error?: string;
}
/**
 * Creates an AG-UI subscriber that streams text into an accumulator
 * and invokes `onUpdate` after every relevant event so the UI can
 * update incrementally.
 */
export declare const createAGUISubscriber: (acc: ITextAccumulator, onUpdate: () => void) => AgentSubscriber;
/**
 * Process tool results from newMessages after run completes,
 * filling in any results not captured by streaming events.
 */
export declare const processToolResults: (newMessages: Array<{
    role: string;
    toolCallId?: string;
    content: unknown;
}>, acc: ITextAccumulator) => void;
