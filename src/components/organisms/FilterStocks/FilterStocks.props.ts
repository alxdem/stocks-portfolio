import type {ComponentPropsWithoutRef} from 'react';
import type {DoubleRange, NumberTuple} from '@models';

export interface FilterStocksProps extends ComponentPropsWithoutRef<'div'> {
    minMax: DoubleRange;
    price: DoubleRange;
    currentSector: string;
    counter?: number;
    isResetDisabled?: boolean;
    isMobile?: boolean;
    reset: () => void;
    sectorChange: (value: string) => void;
    sectorClear: () => void;
    priceChange: (value: NumberTuple) => void;
    btnBackOnClick?: () => void;
}
