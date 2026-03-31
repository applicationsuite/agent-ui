// ---------------------------------------------------------------------------
// Option constants
// ---------------------------------------------------------------------------
export const LAYOUT_OPTIONS = ['stack', 'row', 'grid'];
export const FOOTER_ALIGNMENT_OPTIONS = [
    'start',
    'center',
    'end',
    'space-between',
];
export const BUTTON_PLACEMENT_OPTIONS = [
    'inline',
    'header',
    'footer',
];
export const BADGE_COLORS = [
    'brand',
    'danger',
    'important',
    'informative',
    'severe',
    'subtle',
    'success',
    'warning',
];
export const BUTTON_APPEARANCES = [
    'primary',
    'secondary',
    'outline',
    'subtle',
    'transparent',
];
export const FIELD_FORMATS = ['text', 'date', 'currency', 'number'];
export const TABLE_COL_FORMATS = [
    'text',
    'date',
    'currency',
    'number',
    'badge',
    'button',
];
export const FORM_INPUT_TYPES = [
    'text',
    'textarea',
    'number',
    'date',
    'dropdown',
    'checkbox',
    'toggle',
    'radio',
];
export const TEXT_ALIGN_OPTIONS = ['left', 'center', 'right'];
export const OVERFLOW_OPTIONS = [
    'visible',
    'hidden',
    'scroll',
    'auto',
];
export const ALIGN_SELF_OPTIONS = [
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'stretch',
];
export const BORDER_STYLE_OPTIONS = [
    'solid',
    'dashed',
    'dotted',
    'none',
];
// ---------------------------------------------------------------------------
// Tree helpers — deep-find / deep-update
// ---------------------------------------------------------------------------
export const findSection = (sections, id) => {
    if (!sections)
        return undefined;
    for (const s of sections) {
        if (s.id === id)
            return s;
        const found = findSection(s.subsections, id);
        if (found)
            return found;
    }
    return undefined;
};
export const findControl = (template, controlId) => {
    // Search within a list of controls
    const searchControls = (controls, parentId) => {
        for (const c of controls) {
            if (c.id === controlId)
                return { control: c, sectionId: parentId };
        }
        return undefined;
    };
    if (template.card.children) {
        const found = searchControls(template.card.children, '__card__');
        if (found)
            return found;
    }
    const searchSection = (section) => {
        if (section.children) {
            const found = searchControls(section.children, section.id);
            if (found)
                return found;
        }
        for (const sub of section.subsections ?? []) {
            const found = searchSection(sub);
            if (found)
                return found;
        }
        return undefined;
    };
    for (const section of template.card.sections ?? []) {
        const found = searchSection(section);
        if (found)
            return found;
    }
    return undefined;
};
export const updateSectionInList = (sections, id, updater) => sections.map((s) => s.id === id
    ? updater(s)
    : {
        ...s,
        subsections: s.subsections
            ? updateSectionInList(s.subsections, id, updater)
            : undefined,
    });
const updateControlInList = (controls, controlId, updater) => controls.map((c) => {
    if (c.id === controlId)
        return updater(c);
    return c;
});
export const updateControlInSections = (sections, controlId, updater) => sections.map((s) => ({
    ...s,
    children: s.children
        ? updateControlInList(s.children, controlId, updater)
        : undefined,
    subsections: s.subsections
        ? updateControlInSections(s.subsections, controlId, updater)
        : undefined,
}));
