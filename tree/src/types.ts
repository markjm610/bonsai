export type TreeNode = {
    id: string;
    value: number;
    leftId: string | null;
    rightId: string | null;
}

export type Position = {
    x: number;
    y: number;
}

export type TreeObject = {
    [id: string]: TreeNode;
}

export type TraversalObject = {
    [id: string]: {
        index: number;
        value: number;
    }
}