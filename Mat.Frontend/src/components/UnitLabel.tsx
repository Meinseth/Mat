import { unitLabelsNb, unitLabelsPluralNb } from 'src/i18n/translations';
import type { Unit } from 'src/services/ApiClient';

interface props {
    unit: Unit | undefined;
    amount: number | undefined;
}

export function UnitLabel({ unit, amount }: props) {
    if (!unit) return;
    if (!amount || amount < 2) return unitLabelsNb[unit];
    else return unitLabelsPluralNb[unit];
}
