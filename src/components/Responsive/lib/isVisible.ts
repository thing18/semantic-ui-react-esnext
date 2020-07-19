
const fitsMaxWidth = (width: number, maxWidth?: number) => (maxWidth == null ? true : width <= maxWidth);

const fitsMinWidth = (width: number, minWidth?: number) => (minWidth == null ? true : width >= minWidth);

export const isVisible = (width: number, { maxWidth, minWidth }: Partial<Record<string, number>>) => fitsMinWidth(width, minWidth) && fitsMaxWidth(width, maxWidth);
