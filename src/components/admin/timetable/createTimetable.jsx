import React, {useContext} from 'react';
import {Breadcrumb, Button, Form, Input, InputNumber, notification, Select, Space} from "antd";
import cl from "./style.module.css";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import Data from "../../../api/getData";
import Timetable from "../../../api/timetable";
import Load from "../../../api/load";
import {Context} from "../../../index";


const getAllCabData = () => {
    const data = [
        Data.getData('CabDataFour'),
        Data.getData('CabDataThree'),
        Data.getData('CabDataTwo'),
        Data.getData('CabDataOne'),
        Data.getData('CabDataMOne')
    ]
    let gList = []
    for (let i = 0; i !== 5; i++) {
        let floor_data = data[i];
        for (let d in floor_data) {
            let h = floor_data[d];
            if (h.type === 0 || h.type === 2 || h.type === 3) continue;
            gList.push({value: h.id, label: h.name})
        }
    }
    return gList
}

const DayOptions = [
    {
        value: 1,
        label: 'Понедельник',
    },
    {
        value: 2,
        label: 'Вторник',
    },
    {
        value: 3,
        label: 'Среда',
    },
    {
        value: 4,
        label: 'Четверг',
    },
    {
        value: 5,
        label: 'Пятница',
    },
    {
        value: 6,
        label: 'Суббота',
    },
    {
        value: 0,
        label: 'Воскресенье',
    }
]
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} нужно указать!'
};
/* eslint-enable no-template-curly-in-string */


const getOptionsForBreadcrumb = () => {
    return ["Админ-панель", "Расписание", "Создать расписание"]
}


const CreateTimetable = ({handler}) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Не удалось создать таблицу',
            description:
                "Попробуйте еще раз или перейдите в аккаунт",
        });
    };
    const {store} = useContext(Context)
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        // const data = values.push()
        try{
            const h = await Timetable.CreateTimetable(values)
            await Load.loadTimetable()
            form.resetFields();
            handler(h.dayId + h.letter + h.num)
        }
        catch (e) {
            await store.checkAuth()
            openNotificationWithIcon('error')
        }
        // console.log(values)
    };
    return (
        <>
            {contextHolder}
            <contextHolder/>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}>
                {getOptionsForBreadcrumb().map((e) => {
                    return <Breadcrumb.Item key={e + Math.random(123, 354)}>{e}</Breadcrumb.Item>
                })}
            </Breadcrumb>
            <Content className={cl.content}>
                <Form
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                    size={"default"}
                    style={{maxWidth: "850px"}}
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >

                    <Form.Item label="Номер" name={['num']} rules={[{required: true}]}>
                        <InputNumber min={1} max={11}/>
                    </Form.Item>
                    <Form.Item label="Буква" name={['letter']}
                               rules={[{required: true, message: 'Букву нужно указать!'}]}>
                        <Input maxLength={1}/>
                    </Form.Item>
                    <Form.Item label="День недели" name={['dayId']}
                               rules={[{required: true, message: 'Укажите день недели!'}]}>
                        <Select
                            style={{
                                width: 160,
                            }}
                            options={DayOptions}
                        />
                    </Form.Item>


                    <Form.List name="timetable" label={"Расписание"}>
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name}) => (
                                    <Space
                                        key={key}
                                        align="start"
                                    >
                                        <Form.Item
                                            name={[name, 'num']}
                                            rules={[{required: true, message: 'Укажите номер урока!'}]}>
                                            <InputNumber min={1} max={9} placeholder="№ урока"/>
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'subject']}
                                            rules={[{required: true, message: 'Укажите предмет!'}]}>
                                            <Input placeholder="предмет" style={{width: "auto"}}/>
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'time']}
                                            tooltip="Если поле оставить пустым, то значение времени будет стоять по умолчанию">
                                            <Input placeholder="время 8:30 - 9:25" style={{width: "auto"}}/>
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'id']}
                                            rules={[{required: true, message: 'Укажите кабинет!'}]}>
                                            <Select
                                                showSearch
                                                placeholder="Кабинет"
                                                optionFilterProp="children"
                                                style={{
                                                    width: 100,
                                                }}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={getAllCabData()}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'group']}>
                                            <Input placeholder="название группы" style={{width: "auto"}}/>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)}/>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                        Добавить урок
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Button type="primary" htmlType="submit" style={{marginTop: "14px"}}>
                        Создать
                    </Button>
                </Form>
            </Content>
        </>
    )
}

export default CreateTimetable;