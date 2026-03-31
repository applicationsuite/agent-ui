// ---------------------------------------------------------------------------
// Control type discriminant
// ---------------------------------------------------------------------------
export var ControlType;
(function (ControlType) {
    ControlType["Field"] = "field";
    ControlType["Button"] = "button";
    ControlType["Table"] = "table";
    ControlType["Badge"] = "badge";
    ControlType["Image"] = "image";
    ControlType["ProgressBar"] = "progressBar";
    ControlType["InputField"] = "inputField";
    ControlType["Separator"] = "separator";
})(ControlType || (ControlType = {}));
export const TEMPLATE_CONSTANTS = {
    HELLO_WORLD_TEMPLATE_ID: 'hello_world_template',
};
export const getOrderedItems = (children, sections, ordering) => {
    const childMap = new Map((children ?? []).map((c) => [c.id, c]));
    const sectionMap = new Map((sections ?? []).map((s) => [s.id, s]));
    if (ordering?.length) {
        const result = [];
        for (const id of ordering) {
            const c = childMap.get(id);
            if (c) {
                result.push({ type: 'control', item: c });
                childMap.delete(id);
                continue;
            }
            const s = sectionMap.get(id);
            if (s) {
                result.push({ type: 'section', item: s });
                sectionMap.delete(id);
            }
        }
        // Append any items not in the ordering (backward compat)
        for (const c of childMap.values())
            result.push({ type: 'control', item: c });
        for (const s of sectionMap.values())
            result.push({ type: 'section', item: s });
        return result;
    }
    // Fallback: children first, then sections
    const result = [];
    for (const c of children ?? [])
        result.push({ type: 'control', item: c });
    for (const s of sections ?? [])
        result.push({ type: 'section', item: s });
    return result;
};
