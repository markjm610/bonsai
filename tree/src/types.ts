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