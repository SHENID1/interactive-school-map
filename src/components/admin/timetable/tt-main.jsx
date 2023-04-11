import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import DashBoardPanel from "./dashboardpanel";
import CabData from "../../../api/cabdata";
import Timetable from "../../../api/timetable";
import cl from "./style.module.css";
import CreateTimetable from "./createTimetable";
const {Sider} = Layout;



const TtMain = () => {
    const [TimetableOption, setTimetableOption] = useState(CabData.getOptions())
    const [C_EL_List, setC_EL_List] = useState(Timetable.getC_EL_List())
    const [selectedClassEl, setSelectedClassEl] = useState(C_EL_List[0]);

    const handlerSelectedClassEl = () => {
        setTimetableOption(CabData.getOptions())
        setC_EL_List(Timetable.getC_EL_List())
        setSelectedClassEl("create")
    }
    const createAndRedirectTT = (El) => {
        setTimetableOption(CabData.getOptions())
        setC_EL_List(Timetable.getC_EL_List())
        setSelectedClassEl(El)
    }
    return (
        <>
            <Layout>
                <Sider
                    width={250}>
                    <Menu
                        mode="inline"
                        // defaultOpenKeys={['1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        selectedKeys={[selectedClassEl]}
                        items={TimetableOption}
                        onSelect={(e) => setSelectedClassEl(e.key)}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}>


                    {
                        C_EL_List.map((El) =>
                            <div key={El} className={selectedClassEl === El? "" : cl.none}>
                                {El === "create" ? <CreateTimetable handler={createAndRedirectTT}/>
                                    : <DashBoardPanel class={El} handler={handlerSelectedClassEl}/>
                                }
                            </div>
                        )
                    }
                </Layout>
            </Layout>
        </>
    );
};

export default TtMain;