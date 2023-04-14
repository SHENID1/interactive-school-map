import {Breadcrumb, Form, Input, InputNumber, Button, Select, Space, Modal, message} from "antd";
import {Content} from "antd/es/layout/layout";
import cl from "./style.module.css";
import Timetable from "../../../api/timetable";
import {DeleteOutlined, MinusCircleOutlined, PlusOutlined, SaveOutlined} from '@ant-design/icons';
import Data from "../../../api/getData";
import Load from "../../../api/load";
import React from "react";



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
            if (h.type === 0 || h.type === 2) continue;
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

const parse = (v) => { // 1 М 10
    return {
        DayId:Number(v.slice(0, 1)),
        Letter: v.slice(1, 2),
        Num: Number(v.slice(2, 4))
    }
}
const getOptionsForBreadcrumb = (Num, Letter, DayId) => {
    return ["Админ-панель", "Расписание", Timetable.getDayWithDay(DayId), Num + Letter]
}



const DashBoardPanel = (props) => {
    const {DayId, Letter, Num} = parse(props.class)
    let data = Timetable.getFullTable(Num, Letter, DayId)

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Успешно!',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Ошибка',
        });
    };
    const onFinish = async (values) => {
        await Load.loadData()
        try {
            await Timetable.UpdateTimetableById(values)
            await Load.loadData()
            success()
        }
        catch (e) {
            error()
        }

    };
    const {confirm} = Modal; // инициализация модалки
    const showDeleteConfirm = () => {
        confirm({
            title: 'Подтвердите действие',
            content: (
                <div>
                    <p>Данные будут безвозратно удалены</p>
                </div>
            ),
            okText: "Удалить",
            okType: "danger",
            cancelText: "Отменить",
            onOk() {
                return new Promise(async (resolve, reject) => {
                    await Load.loadTimetable()
                    try{
                        await Timetable.DeleteTimetableById(data)
                        success()
                        await Load.loadTimetable()
                        props.handler()
                        resolve()
                    }
                    catch (e){
                        reject("Error")
                    }
                }).catch(() => error());
            }
        });
    };


    return (
        <>
            {contextHolder}
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                {getOptionsForBreadcrumb(Num, Letter, DayId).map((e) => {
                    return <Breadcrumb.Item key={e + Math.random(123, 354)}>{e}</Breadcrumb.Item>
                })}
            </Breadcrumb>
            <Content className={cl.content}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    initialValues={data}
                    size={"default"}
                    style={{ maxWidth: "850px" }}
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >

                    <Form.Item label="Номер" name={['num']} rules={[{required: true}]}>
                        <InputNumber min={1} max={11}/>
                    </Form.Item>
                    <Form.Item label="Буква" name={['letter']} rules={[{required: true, message: 'Букву нужно указать!'}]}>
                        <Input maxLength={1}/>
                    </Form.Item>
                    <Form.Item label="_id" name={['_id']}>
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item label="День недели" name={['dayId']} rules={[{required: true, message: 'Укажите день недели!'}]}>
                        <Select
                            style={{
                                width: 160,
                            }}
                            options={DayOptions}
                        />
                    </Form.Item>


                    <Form.List name="timetable" label={"Расписание"}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name }) => (
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
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Добавить урок
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Space align="start">
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                            Сохранить
                        </Button>
                        <Button type="primary" danger onClick={showDeleteConfirm} icon={<DeleteOutlined />}>
                            Удалить
                        </Button>
                    </Space>

                </Form>
            </Content>
        </>
    );
};

export default DashBoardPanel;