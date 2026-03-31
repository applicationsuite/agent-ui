interface LazyMessageProps {
    /** Estimated height for the placeholder before content is rendered */
    estimatedHeight?: number;
    /** If true, skip lazy loading and render immediately */
    eager?: boolean;
    /** Optional class for the wrapper div */
    className?: string;
    children: React.ReactNode;
}
/**
 * Renders children only when the wrapper scrolls into the viewport.
 * Once rendered, children stay mounted (no unmounting on scroll away)
 * so that resolved templates, Shadow DOM content, and component state
 * are preserved.
 *
 * If `eager` is true, children render immediately without waiting
 * for the IntersectionObserver (used for the most recent messages
 * that are visible at the bottom).
 */
export declare const LazyMessage: ({ estimatedHeight, eager, className, children, }: LazyMessageProps) => import("react/jsx-runtime").JSX.Element;
export {};
