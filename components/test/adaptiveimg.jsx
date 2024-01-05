import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

const AutoScaleImage = ({ source, width, height, handleError }) => {
    const [dim, setDim] = useState(null);

    const calculate = () => {
        if (dim === null) return null;
        const { width: imgWidth, height: imgHeight } = dim;
        if (width && !height) {
            return { width, height: (height * imgHeight) / imgWidth };
        } else if (height && !width) {
            return { width: (width * imgWidth) / imgHeight, height };
        } else if (width && height) {
            return { width, height };
        }
        return null;
    };

    useEffect(() => {
        let isMounted = true;
        Image.getSize(
            source.uri,
            (imgWidth, imgHeight) => {
                if (isMounted) {
                    setDim({ width: imgWidth, height: imgHeight });
                }
            },
            (error) => {
                handleError(error);
            }
        );

        return () => {
            isMounted = false;
        };
    }, []);

    const dimensions = calculate();

    if (!dimensions) {
        return null; // or display a loader
    }

    return <Image source={source} style={dimensions} />;
};

export default AutoScaleImage;