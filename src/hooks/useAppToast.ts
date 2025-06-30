import {toast, type DefaultToastOptions}  from 'react-hot-toast';
import useAppMediaQuery from '@hooks/useAppMediaQuery';
import {QUERY_MOBILE} from '@utils';

const useAppToast = () => {
    const isMobile = useAppMediaQuery(QUERY_MOBILE);
    const baseOptions: DefaultToastOptions = {
        duration: 5000,
        position: isMobile ? 'top-center' : 'bottom-right',
        className: 'toaster toaster-default',
        style: {},
    };

    const successOptions: DefaultToastOptions = {
        ...baseOptions,
        style: {},
        className: 'toaster toaster-success',
    };

    const errorOptions = {
        ...baseOptions,
        style: {},
        className: 'toaster toaster-error',
    };

    const toastMessage = (value: string) => {
        toast(value, baseOptions);
    };

    const successMessage = (value: string) => {
        toast.success(value, successOptions);
    };

    const errorMessage = (value: string) => {
        toast.error(value, errorOptions);
    };

    return {
        toastMessage,
        successMessage,
        errorMessage,
    }
}

export default useAppToast;