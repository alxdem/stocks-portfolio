import {useEffect, useState} from 'react';
import {PRICE_WS_URL} from '@utils';
import type {Nullable} from '@models';

const useTickerPrice = (symbol: Nullable<string>, initialPrice: Nullable<number>) => {
    const [newPrice, setNewPrice] = useState<Nullable<number>>(initialPrice);

    useEffect(() => {
        if (!symbol || !initialPrice) return;

        const ws = new WebSocket(PRICE_WS_URL);

        ws.onopen = () => {
            ws.send(JSON.stringify({
                symbol,
                price: initialPrice,
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.symbol === symbol) {
                setNewPrice(data.price);
            }
        };

        return () => ws.close();
    }, [symbol, initialPrice]);

    return {
        price: newPrice || 0,
    };
};

export default useTickerPrice;