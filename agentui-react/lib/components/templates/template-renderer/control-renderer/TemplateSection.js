import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ControlType, getOrderedItems } from '../../templates.models';
import { resolveBindable } from '../bindingResolver';
import { ChildrenLayout, ControlRenderer } from './ControlRenderer';
import { Section } from '../../common/section/Section';
/**
 * Render an interleaved list of controls and sections.
 * Consecutive controls are batched into a single ChildrenLayout for correct grid behaviour.
 */
export const renderOrderedItems = (items, opts) => {
    const result = [];
    let controlBatch = [];
    const flushControls = () => {
        if (controlBatch.length === 0)
            return;
        result.push(_jsx(ChildrenLayout, { controls: controlBatch.map((e) => e.item), layout: opts.layout, columns: opts.columns, gap: opts.gap, data: opts.data, onAction: opts.onAction }, `batch-${controlBatch[0].item.id}`));
        controlBatch = [];
    };
    for (const entry of items) {
        if (entry.type === 'control') {
            controlBatch.push(entry);
        }
        else {
            flushControls();
            result.push(_jsx(TemplateSection, { ...entry.item, data: opts.data, onAction: opts.onAction, nested: opts.nested }, entry.item.id));
        }
    }
    flushControls();
    return result;
};
export const TemplateSection = (props) => {
    const { label: labelProp, isCollapsible, defaultExpanded, layout, columns, gap, children, subsections, ordering, style, footerAlignment, data = {}, onAction, nested, } = props;
    const label = typeof labelProp === 'string'
        ? labelProp
        : String(resolveBindable(labelProp, data) ?? '');
    const orderedItems = getOrderedItems(children, subsections, ordering);
    const isPlaced = (item, p) => item.type === 'control' &&
        item.item.type === ControlType.Button &&
        item.item.placement === p;
    const headerButtons = orderedItems.filter((i) => isPlaced(i, 'header'));
    const footerButtons = orderedItems.filter((i) => isPlaced(i, 'footer'));
    const bodyItems = orderedItems.filter((i) => !isPlaced(i, 'header') && !isPlaced(i, 'footer'));
    const renderButtons = (buttons) => buttons.map((entry) => (_jsx(ControlRenderer, { control: entry.item, data: data, onAction: onAction }, entry.item.id)));
    const sectionHeaderActions = headerButtons.length > 0
        ? _jsx(_Fragment, { children: renderButtons(headerButtons) })
        : undefined;
    const sectionFooter = footerButtons.length > 0
        ? _jsx(_Fragment, { children: renderButtons(footerButtons) })
        : undefined;
    return (_jsx(Section, { label: label, isCollapsible: isCollapsible, defaultExpanded: defaultExpanded, style: style, height: props.height, nested: nested, headerActions: sectionHeaderActions, footer: sectionFooter, footerAlignment: footerAlignment, children: renderOrderedItems(bodyItems, {
            layout,
            columns,
            gap,
            data,
            onAction,
            nested: true,
        }) }));
};
