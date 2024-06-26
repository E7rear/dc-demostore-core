import React, { PropsWithChildren } from 'react';

interface InfoPanelProps extends PropsWithChildren {
    classes?: any;
    className?: string;
    style?: React.CSSProperties;
    variant?: 'default' | 'absolute';
    opacity?: number;
    col?: string;
    borderStyle?: string;
}

const InfoPanel = (props: InfoPanelProps) => {
    const {
        classes,
        className,
        children,
        variant,
        opacity = 0.9,
        col = 'rgb(255, 255, 255)',
        borderStyle,
        ...other
    } = props;

    function hexToRgb(hex: string) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    }

    function getRGB(str: string) {
        var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
        return match
            ? {
                  r: match[1],
                  g: match[2],
                  b: match[3],
              }
            : {};
    }

    var colobj;

    // Logic for colour parsing - needs to deal with hex and RGB
    if (col.indexOf('#') == 0) {
        colobj = hexToRgb(col);
    }
    if (col.indexOf('rgb') == 0) {
        colobj = getRGB(col);
    }

    var borderstr;
    switch (borderStyle) {
        case 'none':
            borderstr = 'none';
            break;
        case 'white':
            borderstr = '5px solid white';
            break;
        case 'black':
            borderstr = '5px solid black';
            break;
        default:
            borderstr = 'none';
    }

    return (
        <div
            {...other}
            style={{
                padding: '40px 60px 40px 60px',
                background: 'rgba(255, 255, 255, 0.9)',
                display: 'inline-block',
                backgroundColor: `rgba(${colobj?.r},${colobj?.g},${colobj?.b},${opacity})`,
                border: borderstr,
            }}
        >
            {children}
        </div>
    );
};

export default InfoPanel;
