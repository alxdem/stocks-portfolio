import useFetch from '@hooks/useFetch';
import { LOGO_API_URL } from '@src/utils/variables';

function useGetLogo(symbol: string): string {
    // const [logoInfo] = useFetch(`${LOGO_API_URL + symbol}`, [{ image: '' }], {
    //     headers: {
    //         'X-Api-Key': import.meta.env.VITE_NINJAS_KEY
    //     }
    // });
    // const logoSrc = logoInfo[0] && logoInfo[0].image ? logoInfo[0].image : '';
    const logoSrc = '';

    return logoSrc;
}

export default useGetLogo;