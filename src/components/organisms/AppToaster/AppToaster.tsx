import '@organisms/AppToaster/AppToaster.css';
import {Toaster, type DefaultToastOptions} from 'react-hot-toast';
import SuccessIcon from '@images/success.svg?react';
import ErrorIcon from '@images/error.svg?react';

const AppToaster = () => {
  const options: DefaultToastOptions = {
    success: {
      icon: <SuccessIcon className='toaster-icon' />,
    },
    error: {
      icon: <ErrorIcon className='toaster-icon' />,
    }
  };

  return (
      <Toaster toastOptions={options}/>
  );
};

export default AppToaster;
