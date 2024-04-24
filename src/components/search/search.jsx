import React, {useContext, useEffect, useState} from 'react';
import "./search.css";
import {Fl} from "../../context/fl";


function removeItemAll(arr, value) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

const searchEngine = (props, searchQuery) => {
    let list = [];
    if (searchQuery === "") {
        return [{
            id: 0,
            name: "Не найдено"
        }];
    }
    const search_ll = searchQuery.toLowerCase().split(" ")
    removeItemAll(search_ll, "")
    removeItemAll(search_ll, " ")
    for (let i = 0; i !== 5; i++) {
        let floor_data = props.data[i];
        for (let d in floor_data) {
            let cab_obj = floor_data[d];
            if (cab_obj.type === 0 || cab_obj.type === 2) continue;
            let stop = 0;
            for (let searchI in search_ll) {
                let Search = search_ll[searchI];
                for (let i in cab_obj.manager) {
                    if (cab_obj.manager[i].toLowerCase().startsWith(Search) && !list.includes(cab_obj)) {
                        list.push(cab_obj);
                        stop = 1;
                        break;
                    }
                }
                let des = cab_obj.description.toLowerCase().split(" ")
                removeItemAll(des, "")
                removeItemAll(des, " ")
                for (let desI in des) {
                    if (des[desI].startsWith(Search) && !list.includes(cab_obj)) {
                        list.push(cab_obj);
                        stop = 1;
                        break;
                    }
                }

                if (stop === 1) continue;
                if (cab_obj.name === "") {
                    if (cab_obj.description.toLowerCase().startsWith(Search) && !list.includes(cab_obj)) {
                        list.push(cab_obj);
                    }
                    continue;
                }
                if (cab_obj.name.toLowerCase().startsWith(Search) && !list.includes(cab_obj)) {
                    list.push(cab_obj);
                }
            }

        }
    }

    if (list.length > 6) list = list.slice(0, 6)

    return list;
}


const Search = (props) => {
    const {floor, setFloor} = useContext(Fl);
    const [searchQuery, setSearchQuery] = useState("");
    const [hintMenu, setHintMenu] = useState([]);
    const [selHInt, setSelHInt] = useState(0);
    const [hintVisibility, setHintVisibility] = useState(false);
    useEffect(
        () => {
            if (searchQuery === "") return setHintMenu([]);
            let per = searchEngine(props, searchQuery);
            setHintMenu(per);
            setHintVisibility(true)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchQuery]
    )

    const click = (obj) => {
        if (searchQuery === "") return;
        if (!obj) {
            if (hintMenu.length === 0) return;
            let fl = hintMenu[0].floor;
            if (floor !== fl) {
                setFloor(fl);
            }
            props.modal_object(hintMenu[0]);
            setHintVisibility(false);
        }
        if (obj) {
            let fl = obj.floor;
            if (fl !== floor) {
                setFloor(fl);
            }
            props.modal_object(obj);
            setHintVisibility(false);

        }

    }
    const checkKey = (event) => {

        if (event.keyCode === 13) { // enter
            click(hintMenu[selHInt]);
        }
        if (event.keyCode === 40) {
            if (selHInt + 1 < hintMenu.length) {
                setSelHInt(selHInt + 1);
            }
        } // up
        if (event.keyCode === 38) { // down
            if (selHInt - 1 >= 0) {
                setSelHInt(selHInt - 1);
            }
        }

    }
    return (
        <div className={[hintVisibility ? "activeSearch" : "", 'search'].join(' ')}
             onClick={() => setHintVisibility(false)}>
            <div className="container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => {
                        setSearchQuery(e.target.value);
                        setSelHInt(0);
                    }}
                    onKeyDown={(e) => checkKey(e)}
                    placeholder="Поиск..."
                    onFocus={() => setHintVisibility(true)}
                    onClick={e => e.stopPropagation()}
                ></input>
                <button onClick={() => click(hintMenu[selHInt])}/>
            </div>
            <div className={hintVisibility ? "hint" : "none"}>
                <div className="cont">
                    {hintMenu === [] ? <div className="inputElement">Не найдено</div> : hintMenu.map(obj =>
                        <div onClick={() => click(obj)}
                             className={[obj.id === hintMenu[selHInt].id ? "hintIsSelected" : "", "inputElement"].join(' ')}
                             key={obj.id}>
                            <div className="m1">{obj.name === "" ? obj.description : obj.name}</div>
                            <div className="gr">
                                <div className="m2">{obj.manager.join(' ')}</div>
                                <div className="m3">{obj.description}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;