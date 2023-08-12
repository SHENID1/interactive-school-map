import React, {useContext, useEffect, useState, useRef} from 'react';
import {Fl} from "../../context/fl";
import {View, TextInput, StyleSheet, Text, Button, TouchableWithoutFeedback, Platform} from "react-native";
import Constants from "expo-constants";

const e = () => {}
const searchEngine = (props, searchQuery) => {
    const list = [];
    if (searchQuery === "") {
        return [{
            id: 0,
            name: "Не найдено"
        }];
    }
    for (let i = 0; i !== 5; i++) {
        let floor_data = props.data[i];
        for (let d in floor_data) {
            let cab_obj = floor_data[d];
            if (cab_obj.type === 0 || cab_obj.type === 2) continue;
            let stop = 0;
            for (let i in cab_obj.manager) {
                if (cab_obj.manager[i].startsWith(searchQuery)) {
                    list.push(cab_obj);
                    stop = 1;
                    break;
                }
            }
            if (stop === 1) continue;
            if (cab_obj.name === "") {
                if (cab_obj.description.startsWith(searchQuery)) {
                    list.push(cab_obj);
                }
                continue;
            }
            if (cab_obj.name.startsWith(searchQuery)) {
                list.push(cab_obj);
            }
        }
    }
    return list;
}


const Search = (props) => {
    const {floor, setFloor} = useContext(Fl);
    const [searchQuery, setSearchQuery] = useState("");
    const [hintMenu, setHintMenu] = useState([]);
    const [selHInt, setSelHInt] = useState(0);
    const [hintVisibility, setHintVisibility] = useState(false);
    const inputRef =  useRef();
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
        inputRef.current.blur()
        inputRef.current.clear()
        if (!obj) {
            if (hintMenu === []) return;

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
        <TouchableWithoutFeedback onPress={() => {
            setHintVisibility(false)
            inputRef.current.blur()
        }}>
        <View style={[hintVisibility ? styles.activeSearch : {}, styles.search]}>
            <TouchableWithoutFeedback onPress={() => setHintVisibility(true)}>
            <View style={styles.container}>

                <TextInput
                    inputMode={"text"}
                    value={searchQuery}
                    onChangeText={text => {
                        setSearchQuery(text);
                        setSelHInt(0);
                    }}
                    blurOnSubmit={true}
                    onSubmitEditing={() => click(hintMenu[selHInt])}
                    maxLength={20}
                    // onKeyDown={(e) => checkKey(e)}
                    placeholder="Поиск..."
                    onFocus={() => setHintVisibility(true)}
                    ref={inputRef}
                    style={[hintVisibility ? styles.searchInputFocus : {}, styles.searchInput]}
                />
                {/*<Button onPress={() => click(hintMenu[selHInt])} title=""/>*/}
            </View>
        </TouchableWithoutFeedback>
            <View style={hintVisibility ? styles.hint : styles.none}>
                <View style={styles.cont}>
                    {hintMenu === [] ? <Text style={styles.inputElement}>Не найдено</Text> : hintMenu.map(obj =>
                        <TouchableWithoutFeedback key={obj.id} onPress={() => click(obj)}>
                        <View
                             style={[obj.id === hintMenu[selHInt].id ? styles.hintIsSelected : {}, styles.inputElement]}
                             >
                            <Text style={styles.m1}>{obj.name === "" ? obj.description : obj.name}</Text>
                            <View style={styles.gr}>
                                <Text style={styles.m2}>{obj.manager.join(' ')}</Text>
                                <Text style={styles.m3}>{obj.description}</Text>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
};

export default Search;

const styles = StyleSheet.create({
    search: {
        zIndex: 10
    },
    m1: {
        fontWeight: "bold",
        paddingRight: 5,
        fontSize: 18,
    },
    m2: {
        fontSize: 14,
        alignSelf: "flex-start",
        fontWeight: "bold",
    },
    m3: {
        fontSize: 14,
        alignSelf: "flex-start",
        fontWeight: "bold",
    },
    gr: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    activeSearch: {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        zIndex: 9999,
        position: "absolute",
        // top: Platform.OS === "ios" ? Constants.statusBarHeight: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    container: {
        width: "100%",
        display: "flex",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        zIndex: 999,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 5,
    },
    searchInput: {
        width: "95%",
        height: 30,
        backgroundColor: "#B3FAFF",
        borderRadius: 6,
        fontSize: 23,
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        paddingLeft: 5,
        paddingRight: 5,
    },
    searchInputFocus: {
        backgroundColor: "#00b3ff8b",
    },
    searchContainerButtonActive: {
        backgroundColor: "rgb(3, 239, 255)",
    },
    none: {
        display: "none",
    },
    hint: {
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
    },
    cont: {
        width: "100%",
        backgroundColor: "white",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        // transition: all 0.3s,
        zIndex: 999,
        overflowX: "hidden",
        overflowY: "hidden",
    },
    inputElement: {
        // borderTopColor: "rgba(0,0,0,0.32)",
        // borderTopWidth: 1,
        height: 40,
        width: "100%",
        paddingLeft: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        zIndex: 999,
        borderStyle: "solid"
    },
    hintIsSelected: {
        backgroundColor: "rgba(0, 0, 0, 0.11)",
    },
})