import type { TickerHeaderProps } from '@molecules/TickerHeader/TickerHeader.props';
import styles from '@molecules/TickerHeader/TickerHeader.module.css';
import Logo from '@atoms/Logo/Logo';
import CloudSection from '@molecules/CloudSection/CloudSection';

const TickerHeader = ({title, logo, price, sector}: TickerHeaderProps) => {
  return (
      <CloudSection className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <Logo
            src={logo}
            alt={title || ''}
            className={styles.logo}
        />
        <div className={styles.info}>
          <span className={styles.price}>{price}</span>
          <span className={styles.sector}>{sector}</span>
        </div>
      </CloudSection>
  );
};

export default TickerHeader;
