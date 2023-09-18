import React from 'react';

const PolygonX = ({dataId, points, isHover, List, mo}) => {
    let obj = List.find(el => el.id === Number(dataId));

    return (
        <polygon onClick={()=> mo(obj)} className={isHover ? "cabHover" : "svg"} points={points}></polygon>
    );
};

export default PolygonX;