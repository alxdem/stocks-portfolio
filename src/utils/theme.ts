let colorIndex = -1;

const colors: string[] = [
    'var(--dark-amber)',
    'var(--crayola)',
    'var(--frosty-skies)',
    'var(--amethyst)',
    'var(--zink-yellow)',
    'var(--thistle)',
    'var(--moderate-aquamarine)',
    'var(--persian-blue)',
    'var(--shiny-orange)',
    'var(--strawberry-red)',
];

const themeInfo = {
    text: {
        fill: 'var(--azure)',
        fontSize: 18
    },
    axis: {
        legend: {
            text: {
                fontSize: 11,
            }
        },
        ticks: {
            text: {
                fontSize: 16,
            }
        }
    },
    legends: {
        text: {
            fontSize: 16,
            fill: '#11f',
            outlineWidth: 2,
            outlineColor: '#ee4444'
        },
    },
    tooltip: {
        container: {
            background: 'var(--gray-50)',
        }
    }
};

const getColor = (): string => {
    colorIndex++;
    return colors[colorIndex % 7];
};

export {
    colors,
    themeInfo,
    getColor,
}