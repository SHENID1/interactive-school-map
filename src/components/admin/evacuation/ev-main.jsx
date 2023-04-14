import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import EvDashboard from "./ev-dasboard";
const {Sider} = Layout;

const TimetableOption = [{label:"4 этаж", key: "4"},{label:"3 этаж", key: "3"},{label:"2 этаж", key: "2"},{label:"1 этаж", key: "1"},{label:"-1 этаж", key: "-1"}]
const FloorList = ["-1","1", "2", "3", "4"]
const EvMain = () => {

    const [selectedClassEl, setSelectedClassEl] = useState("4");
    return (
        <>
            <Layout>
                <Sider
                    width={200}>
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
                        FloorList.map((El) =>
                            <div key={El} className={selectedClassEl === El? "" : "none"}>
                                <EvDashboard Floor={El}/>
                            </div>
                        )
                    }
                </Layout>
            </Layout>

        </>
    );
};

export default EvMain;