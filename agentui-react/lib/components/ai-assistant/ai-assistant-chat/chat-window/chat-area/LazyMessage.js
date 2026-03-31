import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
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
export const LazyMessage = ({ estimatedHeight = 120, eager = false, className, children, }) => {
    const [isVisible, setIsVisible] = useState(eager);
    const ref = useRef(null);
    useEffect(() => {
        if (eager) {
            setIsVisible(true);
            return;
        }
        const el = ref.current;
        if (!el || isVisible)
            return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { rootMargin: '200px 0px' });
        observer.observe(el);
        return () => observer.disconnect();
    }, [isVisible, eager]);
    return (_jsx("div", { ref: ref, className: className, children: isVisible ? children : _jsx("div", { style: { height: estimatedHeight } }) }));
};
