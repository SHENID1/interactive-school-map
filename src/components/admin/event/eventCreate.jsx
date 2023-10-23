import React, {useContext, useState} from 'react';
import { useParams } from "react-router-dom";
import cl from "./style.module.css";
import {Button, ColorPicker, DatePicker, Input, message, Upload, Space, InputNumber, Form} from 'antd';
import {UploadOutlined} from "@ant-design/icons";
import EventApi from "../../../api/eventApi"
import {Context} from "../../../index";
import {ApiUrl} from "../../../api";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} нужно указать!'
};
/* eslint-enable no-template-curly-in-string */



const EventCreate = () => {
    const [form] = Form.useForm();
    const {floor, x, y} = useParams()
    const [fileName, setFileName] = useState(undefined)
    const {store} = useContext(Context)
    const onFinish = async (values) => {
        // const data = values.push()
        try{
            const response = await EventApi.createEvent(values)
            const id = response.data._id
            form.resetFields();
            window.location.replace(`${window.location.origin}/admin/event/events/${id}`)

        }
        catch (e) {
            await store.checkAuth()
            message.error(e)
        }
        // console.log(values)
    };
    const props = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            const isJPG = file.type === 'image/jpeg';
            if (!isPNG && !isJPG) {
                message.error(`${file.name} is not a png, jpg file`).then();
            }
            return isPNG || isJPG || Upload.LIST_IGNORE;
        },
        action: `${ApiUrl}/api/events/upload/`,
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} файл загружен успешно`);
                setFileName(info.file.response)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} файл не загрузился.`);
            }
        },
    };


    return (
        <div className={cl.wrapper}>
            <h1 className={cl.h1}>Создать событие</h1>
            <Form
                form={form}
                layout="horizontal"
                size={"default"}
                style={{maxWidth: "1000px"}}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
            <div className={cl.form}>
                <h2 className={cl.h2}>Как событие будет называться?</h2>
                <Form.Item name={['name']} rules={[{required: true}]}>
                    <Input placeholder="Название" showCount maxLength={70}/>
                </Form.Item>
                <h2 className={cl.h2}>Что будет происходить?</h2>
                <Form.Item name={['description']} rules={[{required: true}]}>
                    <TextArea autoSize placeholder="Описание" maxLength={500} showCount/>
                </Form.Item>
                <h2 className={cl.h2}>Выберите цвет, который мог ассоциироваться с вашим событием</h2>
                <Form.Item name={['color']} rules={[{required: true}]} initialValue={"#fffb00"}>
                    <ColorPicker size="large" showText disabledAlpha format={"hex"} defaultFormat={"hex"}/>
                </Form.Item>
                <h2 className={cl.h2}>Изображение</h2>
                <Form.Item name={['image']} rules={[{required: true}]}
                           valuePropName="fileList"

                           getValueFromEvent={normFile}>
                    <Upload {...props} maxCount={1} listType="picture" thumbUrl={!fileName ? `${ApiUrl}/static/${fileName}` : null}>
                        <Button icon={<UploadOutlined />}>Прикрепить картинку</Button>
                    </Upload>
                </Form.Item>
                <h2 className={cl.h2}>Укажите дату, время начала и окончания события</h2>
                <Space>
                    <Form.Item name={['datetime']} rules={[{required: true}]}>
                        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder={["Начало", "Конец"]} />
                    </Form.Item>
                </Space>
                <h2 className={cl.h2}>Информация о месте расположения события</h2>
                <h3 className={cl.h3}>X координата</h3>
                <Form.Item name={['x']} rules={[{required: true}]} initialValue={x}>
                    <InputNumber min={0} max={645} style={{ width: '100px' }} placeholder={"x"}/>
                </Form.Item>
                <h3 className={cl.h3}>Y координата</h3>
                <Form.Item name={['y']} rules={[{required: true}]} initialValue={y}>
                    <InputNumber min={0} max={482} style={{ width: '100px' }} placeholder={"y"}/>
                </Form.Item>
                <h3 className={cl.h3}>Этаж</h3>
                <Form.Item name={['floor']} rules={[{required: true}]} initialValue={floor}>
                    <InputNumber min={-1} max={4} placeholder={"Этаж"}/>
                </Form.Item>
                <br/>
                <Button type="primary" size="large" htmlType="submit" className={cl.submitButton}>Создать</Button>
            </div>
            </Form>
        </div>
    );
};

export default EventCreate;


// name: "name"
// color"а"
// description: ""
// image "6315ced3-e3c6-457c-a6ee-a5510d9c0168.jpg"
// dateStart 2000-12-31T21:00:00.000+00:00
// dateEnd 2000-12-31T21:00:00.000+00:00
// x "5"
// y "3"
// floor 3