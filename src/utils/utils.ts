const formatPrice = (value: number | string) => {
    if (typeof value === 'number') {
        return `$${(Math.round(value).toLocaleString())}`;
    } else {
        return value;
    }
};

export {
    formatPrice
};