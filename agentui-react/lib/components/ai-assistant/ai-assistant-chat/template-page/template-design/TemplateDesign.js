import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { Skeleton, SkeletonItem } from '@fluentui/react-components';
import { PaintBrush24Regular } from '@fluentui/react-icons';
import { TemplateDesigner } from '../../../../templates/template-designer/TemplateDesigner';
import { SlidePanel } from '../../../../common/slide-panel';
import { useTemplateDesignStyles } from './TemplateDesign.styles';
export const TemplateDesign = (props) => {
    const { template, isLoading, isReadOnly, error: loadError, onClose, onSave } = props;
    const classes = useTemplateDesignStyles();
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const error = loadError || saveError;
    const parsedTemplate = (() => {
        try {
            return JSON.parse(template?.content ?? '{}');
        }
        catch {
            return undefined;
        }
    })();
    const parsedDataSource = (() => {
        try {
            return JSON.parse(template?.data ?? '{}');
        }
        catch {
            return undefined;
        }
    })();
    const handleSave = useCallback(async (t, templateDataSource) => {
        setIsSaving(true);
        try {
            await onSave({
                ...template,
                content: JSON.stringify(t),
                data: JSON.stringify(templateDataSource),
            });
        }
        catch {
            setSaveError('Failed to save template config.');
        }
        finally {
            setIsSaving(false);
        }
    }, [template, onSave]);
    /* ── Render helpers ──────────────────────────────────────────────── */
    const renderLoadingSkeleton = () => (_jsxs(Skeleton, { className: classes.shimmerRoot, animation: "pulse", "aria-label": "Loading template config", children: [_jsxs("div", { className: classes.shimmerToolbar, children: [_jsxs("div", { className: classes.shimmerToolbarLeft, children: [_jsx(SkeletonItem, { size: 20, style: { width: 20, borderRadius: 4 } }), _jsx(SkeletonItem, { size: 16, style: { width: 120 } })] }), _jsxs("div", { className: classes.shimmerToolbarRight, children: [_jsx(SkeletonItem, { size: 28, style: { width: 160, borderRadius: 6 } }), _jsx(SkeletonItem, { size: 28, style: { width: 80, borderRadius: 6 } })] })] }), _jsxs("div", { className: classes.shimmerContent, children: [_jsxs("div", { className: classes.shimmerTreePanel, children: [_jsx(SkeletonItem, { size: 12, style: { width: '60%' } }), _jsx(SkeletonItem, { size: 12, style: { width: '80%', marginLeft: 12 } }), _jsx(SkeletonItem, { size: 12, style: { width: '55%', marginLeft: 12 } }), _jsx(SkeletonItem, { size: 12, style: { width: '70%', marginLeft: 24 } }), _jsx(SkeletonItem, { size: 12, style: { width: '50%', marginLeft: 24 } }), _jsx(SkeletonItem, { size: 12, style: { width: '65%' } }), _jsx(SkeletonItem, { size: 12, style: { width: '45%', marginLeft: 12 } })] }), _jsxs("div", { className: classes.shimmerPreviewPanel, children: [_jsx(SkeletonItem, { size: 12, style: { width: 80 } }), _jsxs("div", { className: classes.shimmerPreviewCard, children: [_jsx(SkeletonItem, { size: 16, style: { width: '50%' } }), _jsx(SkeletonItem, { size: 12, style: { width: '100%' } }), _jsx(SkeletonItem, { size: 12, style: { width: '85%' } }), _jsx(SkeletonItem, { size: 12, style: { width: '60%' } }), _jsx(SkeletonItem, { size: 48, style: { width: '100%', borderRadius: 8 } }), _jsx(SkeletonItem, { size: 12, style: { width: '75%' } })] })] }), _jsxs("div", { className: classes.shimmerPropertyPanel, children: [_jsx(SkeletonItem, { size: 12, style: { width: 80 } }), _jsx(SkeletonItem, { size: 24, style: { width: '100%', borderRadius: 4 } }), _jsx(SkeletonItem, { size: 12, style: { width: 60 } }), _jsx(SkeletonItem, { size: 24, style: { width: '100%', borderRadius: 4 } }), _jsx(SkeletonItem, { size: 12, style: { width: 70 } }), _jsx(SkeletonItem, { size: 24, style: { width: '100%', borderRadius: 4 } })] })] })] }));
    const renderDesigner = () => (_jsxs(_Fragment, { children: [isSaving && _jsx("div", { className: classes.panelBusyOverlay }), _jsx(TemplateDesigner, { template: parsedTemplate, dataSource: parsedDataSource, isReadOnly: isReadOnly, onSave: handleSave })] }));
    /* ── Render ──────────────────────────────────────────────────────── */
    return (_jsx(SlidePanel, { title: "Template Designer", icon: _jsx(PaintBrush24Regular, {}), width: "100%", error: error, onClose: onClose, children: isLoading ? renderLoadingSkeleton() : renderDesigner() }));
};
