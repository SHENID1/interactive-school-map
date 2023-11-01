import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {ApiUrl} from "../../../api";
import {Button, ColorPicker, DatePicker, Input, message, Upload, Space, InputNumber, Form, Skeleton} from "antd";
import {Context} from "../../../index";
import cl from "./style.module.css";
import {EnterOutlined, UploadOutlined} from "@ant-design/icons";
import EventApi from "../../../api/eventApi";
import dayjs from 'dayjs';
import {LocaleLang} from "../../../api/localeLang";
const {TextArea} = Input;
const {RangePicker} = DatePicker;
const getImageData = (data) => {
    return [{
        uid: data?._id,
        name: `${data?.image}`,
        status: 'done',
        url: `${ApiUrl}/${data?.image}`,
        thumbUrl: `${ApiUrl}/${data?.image}`,
    }]
}
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


function getInitDate(data) {
    const dateStart = dayjs(data.dateStart)
    const dateEnd = dayjs(data.dateEnd)
    return {
        color: data.color,
        datetime: [dateStart, dateEnd],
        description: data.description,
        floor: data.floor,
        image: getImageData(data),
        name: data.name,
        x: data.x,
        y: data.y,
    };
}

const EventUpdate = () => {
    const [data, setData] = useState(false)
    const [form] = Form.useForm();
    const [fileName, setFileName] = useState(undefined)
    const {store} = useContext(Context)
    const {id} = useParams()
    useEffect(() => {
        EventApi.getEventById(id).then((res) => setData(res)).catch(() => window.location.replace(`${window.location.origin}/404`))
    }, [id]);

    let initVal
    if (data) initVal = getInitDate(data)


    const onFinish = async (values) => {
        try {
            values._id = id
            // console.log(values)
            await EventApi.updateEvent(values)
            message.success(`Обновлено успешно`).then();
        } catch (e) {
            await store.checkAuth()
            message.error(e)
        }
        // console.log(values)
    };
    const props = {
        name: 'file',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        withCredentials: true,
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
                message.success(`${info.file.name} файл загружен успешно`).then();
                setFileName(info.file.response)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} файл не загрузился.`).then();
            }
        },
        maxCount: 1,
        listType: "picture",
        thumbUrl: !fileName ? `${ApiUrl}/static/${fileName}` : null,
        onRemove: EventApi.deleteImage,
    }


    function DeleteEvent() {
        EventApi.deleteEvent(id).then(() => {
            message.success(`Событие удалено`).then();
            window.location.replace(`${window.location.origin}/admin/event`)

        }).catch((e) => {
            message.error(`Не удалось удалить - ${e}`).then();
        })
    }

    // console.log(initVal)
    return (
        <div className={cl.wrapper}>
            <h1 className={cl.h1}>Редактирование события</h1>
            <Link to={"/admin/event"}><Button type="text" icon={<EnterOutlined />}><b>Вернуться обратно</b></Button></Link>
            {data ?
                <Form
                    form={form}
                    layout="horizontal"
                    size={"default"}
                    style={{maxWidth: "1000px"}}
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    initialValues={initVal}
                >
                    <div className={cl.form}>
                        <h2 className={cl.h2}>Как событие будет называться?</h2>
                        <Form.Item name={['name']} rules={[{required: true}]}>
                            <Input placeholder="Название" showCount maxLength={70}/>
                        </Form.Item>
                        <h2 className={cl.h2}>Что будет происходить?</h2>
                        <Form.Item name={['description']} rules={[{required: true}]}>
                            <TextArea autoSize placeholder="Описание" showCount/>
                        </Form.Item>
                        <h2 className={cl.h2}>Выберите цвет, который мог ассоциироваться с вашим событием</h2>
                        <Form.Item name={['color']} rules={[{required: true}]}>
                            <ColorPicker size="large" showText disabledAlpha format={"hex"} defaultFormat={"hex"}/>
                        </Form.Item>
                        <h2 className={cl.h2}>Изображение</h2>
                        <Form.Item name={['image']} rules={[{required: true}]}
                                   valuePropName="fileList"
                                   getValueFromEvent={normFile}>
                            <Upload {...props} >
                                <Button icon={<UploadOutlined/>}>Прикрепить картинку</Button>
                            </Upload>
                        </Form.Item>
                        <h2 className={cl.h2}>Укажите дату, время начала и окончания события</h2>
                        <Space>
                            <Form.Item name={['datetime']} rules={[{required: true}]}>
                                <RangePicker locale={LocaleLang} showTime  format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>
                        </Space>
                        <h2 className={cl.h2}>Информация о месте расположения события</h2>
                        <h3 className={cl.h3}>X координата</h3>
                        <Form.Item name={['x']} rules={[{required: true}]}>
                            <InputNumber min={0} max={645} style={{width: '100px'}} placeholder={"x"}/>
                        </Form.Item>
                        <h3 className={cl.h3}>Y координата</h3>
                        <Form.Item name={['y']} rules={[{required: true}]}>
                            <InputNumber min={0} max={482} style={{width: '100px'}} placeholder={"y"}/>
                        </Form.Item>
                        <h3 className={cl.h3}>Этаж</h3>
                        <Form.Item name={['floor']} rules={[{required: true}]}>
                            <InputNumber min={-1} max={4} placeholder={"Этаж"}/>
                        </Form.Item>
                        <br/>
                        <div className={cl.but_wrap}>
                            <Button type="primary" size="large" htmlType="submit"
                                    className={cl.submitButton}>Сохранить</Button>
                            <Button type="primary" size="large" danger ghost onClick={DeleteEvent}>
                                Удалить
                            </Button>
                        </div>
                    </div>
                </Form>
                :
                <div className={cl.cont}>
                    <Skeleton loading={data} active avatar/>
                    <Skeleton loading={data} active avatar/>
                    <Skeleton loading={data} active avatar/>
                </div>
            }
        </div>
    );
};
export default EventUpdate;