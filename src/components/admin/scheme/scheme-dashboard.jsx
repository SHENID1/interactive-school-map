import React from 'react';
import {Button, Form, Input, InputNumber, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined, SaveOutlined} from "@ant-design/icons";
import cl from "./style.module.css"
import Data from "../../../api/getData"
import Load from "../../../api/load";

/* eslint-disable no-template-curly-in-string */
const validateMessages = { required: '${label} нужно указать!' };
/* eslint-enable no-template-curly-in-string */
const floorList = [{value: -1, label: "-1 Этаж"},{value: 1, label: "1 Этаж"},{value: 2, label: "2 Этаж"},{value: 3, label: "3 Этаж"},{value: 4, label: "4 Этаж"}]
const SchemeDashboard = ({Floor}) => {

    function onFinish(values) {
        console.log(values)
    }
    let data = null
    switch (Floor){
        case "-1":
            data = Data.getData("SchemeMOne");
            break;
        case "1":
            data = Data.getData("SchemeOne");
            break;
        case "2":
            data = Data.getData("SchemeTwo");
            break;
        case "3":
            data = Data.getData("SchemeThree");
            break;
        case "4":
            data = Data.getData("SchemeFour");
            break;
        default:
            console.log("ERRORR")
            throw Error("Неправильный Floor")
    }
    if (data === null){
        Load.loadData()
        alert("Перезагрузите страницу!")
    }

    //console.log(Floor)
    return (
        <div className={cl.content}>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={data}
                size={"default"}
                style={{ maxWidth: "1100px" }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.List name={"sc"}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name }) => (
                                <Space
                                    direction={"horizontal"}
                                    key={key + Math.random()}
                                    size={20}
                                    align="center">
                                    <Form.Item
                                        name={[name, 'id']}
                                        label={"ID"}
                                        colon={true}
                                        rules={[{required: true, message: 'Необхадимо указать ID!'}]}>
                                        <InputNumber min={0} placeholder="ID" className={cl.padding}/>
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, 'points']}
                                        label={"Координаты"}
                                        colon={true}
                                        rules={[{required: true, message: 'Необхадимо указать координаты!'}]}>
                                        <Input min={0} max={600} placeholder="координаты" className={cl.padding}/>
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, 'floor']}
                                        label={"Этаж"}
                                        colon={true}
                                        rules={[{required: true, message: 'Необхадимо указать градус!'}]}>
                                        <Select
                                            placeholder="Эатж"
                                            optionFilterProp="children"
                                            style={{
                                                width: 100,
                                            }}
                                            options={floorList}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, 'name']}
                                        label={"Имя"}
                                        colon={true}
                                    >
                                        <Input placeholder="Название" className={cl.padding2}/>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Добавить схему
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Space align="start">
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                        Сохранить
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default SchemeDashboard;