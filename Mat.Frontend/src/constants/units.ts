export const unitOptions = [
    'Gram',
    'Kilogram',
    'Milliliter',
    'Desiliter',
    'Liter',
    'Piece',
    'Whole',
] as const;

export type Unit = (typeof unitOptions)[number];
