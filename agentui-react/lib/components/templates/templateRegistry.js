import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, Suspense } from 'react';
import templateConfig from './templates.config.json';
const lazyTemplates = {};
for (const { templateId, componentPath, exportName, } of templateConfig.templates) {
    // Strip leading "./" so the template literal has a static prefix —
    // this lets the bundler statically determine the base directory,
    // avoiding the "critical dependency" warning while staying fully dynamic.
    const modulePath = componentPath.replace('./', '');
    const LazyComponent = lazy(() => import(`./${modulePath}`).then((m) => ({
        default: m[exportName],
    })));
    const WrappedComponent = (props) => (_jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(LazyComponent, { ...props }) }));
    WrappedComponent.displayName = `Lazy(${templateId})`;
    lazyTemplates[templateId] = WrappedComponent;
}
export const getTemplateComponent = (template) => {
    return lazyTemplates[template.templateId];
};
