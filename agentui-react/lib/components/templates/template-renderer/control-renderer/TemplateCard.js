import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ControlType, getOrderedItems } from '../../templates.models';
import { resolveBindable, resolveBinding } from '../bindingResolver';
import { renderOrderedItems } from './TemplateSection';
import { ControlRenderer } from './ControlRenderer';
import { Card } from '../../common/card/Card';
import { FormProvider } from '../../common/form/FormContext';
export const TemplateCard = (props) => {
    const { title: titleProp, subtitle: subtitleProp, isCollapsible, defaultExpanded, layout, columns, gap, children, sections, ordering, style, footerAlignment, data = {}, onAction, } = props;
    const title = typeof titleProp === 'string'
        ? titleProp
        : String(resolveBindable(titleProp, data) ?? '');
    const subtitle = subtitleProp
        ? typeof subtitleProp === 'string'
            ? subtitleProp
            : String(resolveBindable(subtitleProp, data) ?? '')
        : undefined;
    // Collect all InputField controls across card children + all sections
    const allInputFields = useMemo(() => {
        const fields = [];
        const collect = (controls) => controls?.forEach((c) => {
            if (c.type === ControlType.InputField) {
                const field = c;
                // Resolve binding into defaultValue if needed
                if (field.defaultValue?.binding) {
                    const resolved = resolveBinding(field.defaultValue.binding, data);
                    fields.push({
                        ...field,
                        defaultValue: {
                            ...field.defaultValue,
                            value: resolved === null ||
                                resolved === undefined ||
                                typeof resolved === 'string' ||
                                typeof resolved === 'number' ||
                                typeof resolved === 'boolean'
                                ? resolved
                                : String(resolved ?? ''),
                        },
                    });
                }
                else {
                    fields.push(field);
                }
            }
        });
        const walkSections = (secs) => secs?.forEach((s) => {
            collect(s.children);
            walkSections(s.subsections);
        });
        collect(children);
        walkSections(sections);
        return fields;
    }, [children, sections, data]);
    const hasInputFields = allInputFields.length > 0;
    const orderedItems = getOrderedItems(children, sections, ordering);
    // Split buttons by placement: header, footer, or inline (default).
    const isPlaced = (item, p) => item.type === 'control' &&
        item.item.type === ControlType.Button &&
        item.item.placement === p;
    const headerButtons = orderedItems.filter((i) => isPlaced(i, 'header'));
    const footerButtons = orderedItems.filter((i) => isPlaced(i, 'footer'));
    const bodyItems = orderedItems.filter((i) => !isPlaced(i, 'header') && !isPlaced(i, 'footer'));
    const cardBody = (_jsx(_Fragment, { children: renderOrderedItems(bodyItems, { layout, columns, gap, data, onAction }) }));
    const renderButtons = (buttons) => buttons.map((entry) => (_jsx(ControlRenderer, { control: entry.item, data: data, onAction: onAction }, entry.item.id)));
    const cardHeaderActions = headerButtons.length > 0
        ? _jsx(_Fragment, { children: renderButtons(headerButtons) })
        : undefined;
    const cardFooter = footerButtons.length > 0
        ? _jsx(_Fragment, { children: renderButtons(footerButtons) })
        : undefined;
    return (_jsx(Card, { title: title, subtitle: subtitle, isCollapsible: isCollapsible, defaultExpanded: defaultExpanded, style: style, height: props.height, headerActions: cardHeaderActions, footer: cardFooter, footerAlignment: footerAlignment, children: hasInputFields ? (_jsx(FormProvider, { controls: allInputFields, children: cardBody })) : (cardBody) }));
};
