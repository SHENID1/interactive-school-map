import React from 'react';
import {Button, Form, InputNumber, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined, SaveOutlined} from "@ant-design/icons";
import cl from "./style.module.css"
import Evacuation from "../../../api/evacuation";

/* eslint-disable no-template-curly-in-string */
const validateMessages = { required: '${label} нужно указать!' };
/* eslint-enable no-template-curly-in-string */

const EvDashboard = ({Floor}) => {

    function onFinish(values) {
        console.log(values)
    }
    const data = {ev: Evacuation.getEvacuationList(Number(Floor))}
    //console.log(data)
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
                <Form.List name={"ev"}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name }) => (
                                <Space
                                    direction={"horizontal"}
                                    key={key + Math.random()}
                                    size={40}
                                    align="start">
                                    <Form.Item
                                        name={[name, 'x']}
                                        label={"X"}
                                        colon={true}
                                        rules={[{required: true, message: 'Необхадимо указать X!'}]}>
                                        <InputNumber min={0} max={600} placeholder="X" className={cl.padding}/>
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, 'y']}
                                        label={"Y"}
                                        colon={true}
                                        rules={[{required: true, message: 'Необхадимо указать Y!'}]}>
                                        <InputNumber min={0} max={600} placeholder="Y" className={cl.padding}/>
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, 'deg']}
                                        label={"Поворот"}
                                        colon={true}
                                        rules={[{required: true, message: 'Необхадимо указать градус!'}]}>
                                        <InputNumber min={0} max={360} placeholder="Градусы" className={cl.padding2}/>
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, 'floor']}
                                        label={"Этаж"}
                                        colon={true}
                                        rules={[{required: true, message: 'Необхадимо указать этаж!'}]}
                                    >
                                        <InputNumber min={-1} max={4} disabled placeholder="Этаж" className={cl.padding2}/>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Добавить стрелку
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

export default EvDashboard;