import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
export const IsolatedHtmlRenderer = ({ html, className, }) => {
    const hostRef = useRef(null);
    useEffect(() => {
        const host = hostRef.current;
        if (!host) {
            return;
        }
        const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = html;
    }, [html]);
    return _jsx("div", { ref: hostRef, className: className });
};
