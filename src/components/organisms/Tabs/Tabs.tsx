import type {TabsProps} from '@organisms/Tabs/Tabs.props';
import styles from '@organisms/Tabs/Tabs.module.css';
import cn from 'classnames';
import {useState, useEffect} from 'react';

const Tabs = ({tabs, initialTab = 0, isGap, className}: TabsProps) => {
    const [activeTab, setActiveTab] = useState<number>(initialTab);
    const [fade, setFade] = useState(false);
    const [
        renderedTabs,
        setRenderedTabs
    ] = useState<Set<number>>(new Set([initialTab]));

    const classes = cn(
        styles.tabs,
        isGap && styles.gap,
        className,
    );

    useEffect(() => {
        setRenderedTabs(state => new Set(state).add(activeTab));
    }, [activeTab]);

    const onTabChange = (index: number) => {
        if (index === activeTab) {
            return;
        }

        setFade(true);
        setTimeout(() => {
            setActiveTab(index);
            setFade(false);
        }, 300);
    };

    return (
        <div className={classes}>
            <div className={styles.header}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={cn(
                            styles.button,
                            activeTab === index && styles.active,
                        )}
                        onClick={() => onTabChange(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className={styles.wrapper}>
                {tabs.map((tab, index) => (
                    renderedTabs.has(index) && (
                        <div
                            key={index}
                            className={cn(
                                styles.tab,
                                activeTab === index ? (fade ?  styles.fadeOut :  styles.fadeIn) : styles.hidden,
                            )}
                        >
                            {tab.content}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Tabs;
