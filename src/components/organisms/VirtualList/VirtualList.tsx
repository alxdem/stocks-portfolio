import type {VirtualListProps} from '@organisms/VirtualList/VirtualList.props';
import styles from '@organisms/VirtualList/VirtualList.module.css';
import cn from 'classnames';
import {useRef, Children, useEffect} from 'react';
import {useVirtualizer} from "@tanstack/react-virtual";

const VirtualList = ({children, itemHeight, isEnabled = true, height = 300, className}: VirtualListProps) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const virtualizer = useVirtualizer({
        count: Children.count(children),
        getScrollElement: () => parentRef.current,
        estimateSize: () => itemHeight || 20,
        overscan: 10,
        enabled: isEnabled,
    });

    useEffect(() => {
        virtualizer.measure();
    }, [itemHeight]);

    const virtualItem = virtualizer.getVirtualItems();

    return (
        <div
            ref={parentRef}
            className={cn(styles.list, className)}
            style={{
                height: `${height}px`,
            }}
        >
            <div
                style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {virtualItem.map(({index, key, start, size}) => (
                    <div
                        key={key}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transform: `translateY(${start - virtualizer.options.scrollMargin}px)`,
                            height: `${size}px`,
                            width: '100%',
                        }}
                    >
                        {Children.toArray(children)[index]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VirtualList;
