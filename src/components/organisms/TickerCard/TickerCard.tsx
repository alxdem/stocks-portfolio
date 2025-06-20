import type {TickerCardProps} from '@organisms/TickerCard/TickerCard.props';
import TickerCardDesktop from '@organisms/TickerCard/TickerCardDesktop/TickerCardDesktop';
import TickerCardMobile from '@organisms/TickerCard/TickerCardMobile/TickerCardMobile';
import useAppMediaQuery from '@hooks/useAppMediaQuery';
import {QUERY_MOBILE} from '@utils';

const TickerCard = (props: TickerCardProps) => {
    const isMobile = useAppMediaQuery(QUERY_MOBILE);

    if (isMobile) {
        return <TickerCardMobile {...props} />
    } else {
        return <TickerCardDesktop {...props} />
    }
};

export default TickerCard;
