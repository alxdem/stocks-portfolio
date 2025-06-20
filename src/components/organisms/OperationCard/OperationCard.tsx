import type {OperationCardProps} from '@organisms/OperationCard/OperationCard.props.ts';
import OperationCardDesktop from '@organisms/OperationCard/OperationCardDesktop/OperationCardDesktop';
import useAppMediaQuery from '@hooks/useAppMediaQuery';
import OperationCardMobile from '@organisms/OperationCard/OperationCardMobile/OperationCardMobile';
import {QUERY_MOBILE, formatNumber} from '@utils';

const OperationCard = (props: OperationCardProps) => {
    const {price, value, type} = props;
    const isMobile = useAppMediaQuery(QUERY_MOBILE);

    const isServiceOperation = type === 'deposit' || type === 'withdraw';
    const isTotalPlus = type === 'sale' || type === 'deposit';
    const sign = isTotalPlus ? 1 : -1;
    const total = formatNumber(price * value * sign, false, true);
    const valueLocal = isServiceOperation ? '': value.toString();
    const priceLocal = isServiceOperation ? '' : formatNumber(price, false, true);

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