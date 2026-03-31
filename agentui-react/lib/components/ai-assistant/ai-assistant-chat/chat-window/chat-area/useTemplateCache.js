import { useCallback, useMemo, useRef } from 'react';
export const useTemplateCache = () => {
    const cacheRef = useRef(new Map());
    const get = useCallback((messageId) => cacheRef.current.get(messageId), []);
    const onResolved = useCallback((messageId, result) => {
        cacheRef.current.set(messageId, result);
    }, []);
    const clear = useCallback(() => {
        cacheRef.current.clear();
    }, []);
    return useMemo(() => ({ get, onResolved, clear }), [get, onResolved, clear]);
};
