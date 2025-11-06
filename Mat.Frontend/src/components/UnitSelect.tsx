import { unitOptions } from 'src/constants/units';
import type { IngredientDto } from 'src/services/ApiClient';
import { UnitLabel } from './UnitLabel';

interface props {
    ingredient?: IngredientDto;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function UnitSelect({ ingredient, onChange }: props) {
    return (
        <select value={ingredient?.unit} onChange={onChange}>
            {unitOptions.map((unitOption) => (
                <option key={unitOption} value={unitOption}>
                    <UnitLabel unit={unitOption} amount={ingredient?.amount} />
                </option>
            ))}
        </select>
    );
}
