import type {TickerActionsProps} from '@organisms/TickerActions/TickerActions.props';
import styles from '@organisms/TickerActions/TickerActions.module.css';
import cn from 'classnames';
import Button from '@atoms/Button/Button';
import {useCallback, useState} from 'react';
import Balance from '@molecules/Balance/Balance';
import {formatNumber} from '@utils';
import TickerCardInfo from '@molecules/TickerCardInfo/TickerCardInfo.tsx';
import FormOperation from '@organisms/FormOperation/FormOperation';
import Modal from '@organisms/Modal/Modal';
import {useAppSelector} from '@/store/hooks';
import type {OperationKind} from '@models';
import {selectCash, selectPortfolio} from '@/store/selectors/userSelectors';

const TickerActions = ({image, title, symbol, price, className}: TickerActionsProps) => {
    const balance = useAppSelector(selectCash);
    const portfolio = useAppSelector(selectPortfolio);

    const [modalOpened, setModalOpened] = useState(false);
    const [operationType, setOperationType] = useState<OperationKind>('purchase');
    const isTypePurchase = operationType === 'purchase';

    const info = portfolio?.find(item => item.symbol === symbol);
    const amount = info?.value || 0;
    const maxSteps = isTypePurchase ? Math.floor(balance / price) : amount;

    const classes = cn(
        styles.actions,
        info && styles.grid,
        className,
    );

    const handleOpen = useCallback(() => setModalOpened(true), []);
    const handleClose = useCallback(() => setModalOpened(false), []);

    const btnBuyClick = () => {
        setOperationType('purchase');
        handleOpen();
    };

    const btnSellClick = () => {
        setOperationType('sale');
        handleOpen();
    };

    return (
        <div className={classes}>
            <Button
                theme='primary'
                as='button'
                size='large'
                onClick={btnBuyClick}
            >
                Buy
            </Button>
            {info &&
                <Button
                    theme='primary'
                    as='button'
                    size='large'
                    onClick={btnSellClick}
                >
                    Sell
                </Button>
            }

            <Modal
                isOpened={modalOpened}
                onClose={handleClose}
            >
                {isTypePurchase && <Balance
                    className={styles.balance}
                    title='Account balance'
                    value={`${formatNumber(balance, false, true)}`}
                />}
                <TickerCardInfo
                    className={styles.info}
                    symbol={symbol}
                    logo={image}
                    name={title}
                />
                {amount > 0 && <p className={styles.amount}>You have {amount}&nbsp;lots</p>}
                <FormOperation
                    symbol={symbol}
                    price={price}
                    maxSteps={maxSteps}
                    type={operationType}
                    onSubmit={handleClose}
                />
            </Modal>
        </div>
    );
};

export default TickerActions;
