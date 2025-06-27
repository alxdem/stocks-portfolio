import FormDeposit from '@organisms/FormDeposit/FormDeposit';
import styles from '@pages/Deposit/Deposit.module.css';
import typographyStyles from '@/styles/typography.module.css';
import cn from 'classnames';

const Deposit = () => {
    return (
        <div className={cn(typographyStyles.wrapper, styles.page)}>
            <p>To&nbsp;top up&nbsp;your account, enter any data in&nbsp;the form below.</p>
            <FormDeposit />
        </div>
    );
};

export default Deposit;