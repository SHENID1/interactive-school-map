import React from 'react';


const CabList = ({List, HoverTo, HoverFrom, mo}) => {
    const man = require("../../../images/icons/men_wc.png");
    const woman = require("../../../images/icons/women_wc.png");
    const dressing_room = require("../../../images/icons/icon-dressing-room.png");
    return (
        <div>

            {List.map(cab =>
                <div key={cab.id} onClick={()=> mo(cab)} data-id={cab.id} className="cabName" style={{top: cab.top , left: cab.left, fontSize: cab.fontsize}} onMouseOver={()=> HoverTo(cab.id)}
                     onMouseOut={()=> HoverFrom()}>
                    {cab.name === "WC"?
                        <img height={cab.fontsize} width={cab.fontsize} src={cab.pol === "мужской"?man:woman} alt={cab.name}/>
                        :cab.name === "DR"?
                            <img height={cab.fontsize} width={cab.fontsize} src={dressing_room} alt={cab.name}/>
                         :cab.name //+ "(" + cab.id + ")"
                    }
                </div>
            )}
        </div>
    );
};

export default CabList;