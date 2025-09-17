import {useState, useEffect} from 'react';

const useVW = (value: number) => {
    const [px, setPx] = useState(() => window.innerWidth / 100 * value);

    useEffect(() => {
        const resize = () => setPx(window.innerWidth / 100 * value);
        window.addEventListener('resize', resize);

        return () => window.removeEventListener('resize', resize);
    }, [value]);

    return px;
};

export default useVW;