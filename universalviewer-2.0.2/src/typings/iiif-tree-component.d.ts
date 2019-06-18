// iiif-tree-component v1.0.7 https://github.com/viewdir/iiif-tree-component#readme

declare namespace IIIFComponents {
    interface ITreeComponent extends _Components.IBaseComponent {
        deselectCurrentNode(): void;
        getNodeById(id: string): Manifold.ITreeNode;
        selectNode(node: Manifold.ITreeNode): void;
        updateMultiSelectState(state: Manifold.MultiSelectState): void;
    }
}

declare namespace IIIFComponents {
    interface ITreeComponentOptions extends _Components.IBaseComponentOptions {
        branchNodesSelectable: boolean;
        helper: Manifold.IHelper;
        topRangeIndex: number;
        treeSortType: Manifold.TreeSortType;
    }
}

declare namespace IIIFComponents {
    class TreeComponent extends _Components.BaseComponent implements ITreeComponent {
        options: ITreeComponentOptions;
        private _$tree;
        private _allNodes;
        private _multiSelectableNodes;
        private _selectedNode;
        private _rootNode;
        constructor(options: ITreeComponentOptions);
        protected _init(): boolean;
        databind(): void;
        updateMultiSelectState(): void;
        private _getMultiSelectState();
        protected _getDefaultOptions(): ITreeComponentOptions;
        allNodesSelected(): boolean;
        private _getMultiSelectableNodes();
        private _nodeIsMultiSelectable(node);
        private _getAllNodes();
        getMultiSelectedNodes(): Manifold.ITreeNode[];
        getNodeById(id: string): Manifold.ITreeNode;
        private _multiSelectTreeNode(node, isSelected);
        private _expandParents(node);
        private _setNodeSelected(node, selected);
        private _setNodeExpanded(node, expanded);
        private _setNodeMultiSelected(node, selected);
        private _setNodeMultiSelectEnabled(node, enabled);
        selectPath(path: string): void;
        deselectCurrentNode(): void;
        selectNode(node: Manifold.ITreeNode): void;
        getNodeByPath(parentNode: Manifold.ITreeNode, path: string[]): Manifold.ITreeNode;
        show(): void;
        hide(): void;
        protected _resize(): void;
    }
}
declare namespace IIIFComponents.TreeComponent {
    class Events {
        static TREE_NODE_MULTISELECTED: string;
        static TREE_NODE_SELECTED: string;
    }
}
