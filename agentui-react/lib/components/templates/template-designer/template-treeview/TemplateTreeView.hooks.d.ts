import type { TreeOpenChangeData, TreeOpenChangeEvent } from '@fluentui/react-components';
import type { ISectionControl, ITemplateControl } from '../../templates.models';
import type { IDragItem, IDropTarget } from '../TemplateDesigner.actions';
import type { ISelectedElement } from '../TemplateDesigner.models';
interface IDropIndicatorClasses {
    dropIndicatorBefore: string;
    dropIndicatorAfter: string;
    dropIndicatorInside: string;
}
export declare const useTreeDragDrop: (sections: ISectionControl[], onMoveNode: (drag: IDragItem, drop: IDropTarget) => void, indicatorClasses: IDropIndicatorClasses) => {
    draggingId: string | null;
    handleDragStart: (e: React.DragEvent, item: IDragItem) => void;
    handleDragEnd: () => void;
    handleDragOver: (e: React.DragEvent, targetId: string, targetType: "control" | "section") => void;
    handleDragLeave: () => void;
    handleDrop: (e: React.DragEvent, targetNodeType: "control" | "section", targetId: string, parentId: string, indexInParent: number) => void;
    getDropClass: (id: string) => string | undefined;
};
/**
 * Manages the open/closed state of tree items.
 * Automatically expands parent nodes when the selected element changes.
 */
export declare const useTreeOpenState: (selectedElement: ISelectedElement | undefined, sections: ISectionControl[], _cardChildren?: ITemplateControl[]) => {
    openItemsArray: string[];
    handleOpenChange: (_e: TreeOpenChangeEvent, data: TreeOpenChangeData) => void;
};
/**
 * Manages tree item selection via a native click listener.
 * Uses data-select-type / data-select-id attributes to determine what was clicked.
 */
export declare const useTreeSelection: (selectedElement: ISelectedElement | undefined, onSelectElement: (element: ISelectedElement) => void) => {
    isSelected: (type: ISelectedElement["type"], id: string) => boolean;
    treeContainerRef: import("react").RefObject<HTMLDivElement | null>;
};
export {};
