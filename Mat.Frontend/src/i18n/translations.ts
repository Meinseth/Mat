import type { Unit } from 'src/services/ApiClient';

export const unitLabelsNb: Record<Unit, string> = {
    Gram: 'gram',
    Kilogram: 'kilogram',
    Milliliter: 'milliliter',
    Desiliter: 'desiliter',
    Liter: 'liter',
    Piece: 'stykke',
    Whole: 'hel',
};
export const unitLabelsPluralNb: Record<Unit, string> = {
    Gram: 'gram',
    Kilogram: 'kilogram',
    Milliliter: 'milliliter',
    Desiliter: 'desiliter',
    Liter: 'liter',
    Piece: 'stykker',
    Whole: 'hele',
};
