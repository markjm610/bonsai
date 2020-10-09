export type TreeNode = {
    id: string;
    value: number;
    leftId: number | null;
    rightId: number | null;
}

export type Position = {
    x: number;
    y: number;
}