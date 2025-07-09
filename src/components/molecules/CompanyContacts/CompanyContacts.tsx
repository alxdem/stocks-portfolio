import type {CompanyContactsProps} from '@molecules/CompanyContacts/CompanyContacts.props';
import styles from '@molecules/CompanyContacts/CompanyContacts.module.css';
import typographyStyles from '@/styles/typography.module.css';
import cn from 'classnames';
import {GOOGLE_MAP_SEARCH_URL} from '@utils';
import LocationIcon from '@images/location.svg?react';
import PhoneIcon from '@images/phone.svg?react';
import SiteIcon from '@images/site.svg?react';

const CompanyContacts = ({address, website, phone, className}: CompanyContactsProps) => {
    return (
        <div className={cn(styles.main, typographyStyles.wrapper, className)}>
            {address && <a className={cn(styles.line, typographyStyles.text)} href={`${GOOGLE_MAP_SEARCH_URL}${address}`} target='_blank'>
                <LocationIcon
                className={styles.icon}/>{address}
            </a>}
            {phone && <a className={cn(styles.line, typographyStyles.text)} href={`tel:${phone}`}>
                <PhoneIcon className={styles.icon}/> {phone}
            </a>}
            {website && <a className={cn(styles.line, typographyStyles.text)} href={`${website}`} target='_blank'>
                <SiteIcon className={styles.icon}/> {website}
            </a>}
        </div>
    );
};

export default CompanyContacts;
