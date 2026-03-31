export interface IUseAutoScrollResult {
    /** Callback ref — attach to the scrollable container */
    scrollRef: (el: HTMLDivElement | null) => void;
    /** Force scroll to bottom */
    scrollToBottom: () => void;
}
/**
 * Auto-scrolls a container to the bottom when:
 * 1. New messages arrive (messageCount changes)
 * 2. Content height changes while user is at/near bottom (template resolves, images load, etc.)
 *
 * Uses MutationObserver to detect new children and ResizeObserver to detect
 * height changes from async content (shadow DOM, resolved templates, etc.).
 *
 * Respects user intent: if user scrolls up, auto-scroll pauses.
 * Re-locks when messageCount changes or scrollToBottom is called.
 */
export declare const useAutoScroll: (messageCount: number) => IUseAutoScrollResult;
