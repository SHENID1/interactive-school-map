import React from 'react';


const SelButton = ({name, selected, onClick}) => {
    return (
        <button disabled={selected} className={[ selected ? "selected" : "", 'selBtn'].join(' ')} onClick={() => onClick(name)}>
            {name}
        </button>
    );
};

export default SelButton;