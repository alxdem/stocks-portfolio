import type {OperationCardProps} from '@organisms/OperationCard/OperationCard.props.ts';
import {formatPrice} from '@/utils';
import OperationCardDesktop from '@organisms/OperationCard/OperationCardDesktop/OperationCardDesktop';
import useAppMediaQuery from '@hooks/useAppMediaQuery';
import OperationCardMobile from '@organisms/OperationCard/OperationCardMobile/OperationCardMobile';
import {QUERY_MOBILE} from '@utils/variables';

const OperationCard = (props: OperationCardProps) => {
    const {price, value, type} = props;
    const isMobile = useAppMediaQuery(QUERY_MOBILE);

    const isServiceOperation = type === 'deposit' || type === 'withdraw';
    const isTotalPlus = type === 'sale' || type === 'deposit';
    const sign = isTotalPlus ? '+' : '-';
    const total = `${sign}$${formatPrice(price * value)}`;
    const valueLocal = isServiceOperation ? '': value.toString();
    const priceLocal = isServiceOperation ? '' : `$${formatPrice(price)}`;

    if (isMobile) {
        return <OperationCardMobile
            {...props}
            price={priceLocal}
            value={valueLocal}
            total={total}
            isTotalPlus={isTotalPlus}
        />
    } else {
        return <OperationCardDesktop
            {...props}
            price={priceLocal}
            value={valueLocal}
            total={total}
            isTotalPlus={isTotalPlus}
        />
    }
};

export default OperationCard;