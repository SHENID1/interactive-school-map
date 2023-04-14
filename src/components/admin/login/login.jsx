import React, {useContext} from 'react';
import cl from "./style.module.css"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Form, Input, notification} from 'antd';
import lb from "./leftbot.svg";
import rb from "./rightbot.svg";
import rt from "./righttop.svg";

import AuthService from "../../../api/auth/AuthService";
import Store from "../../../store/store";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const Login = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Сервер отклонил ваше предложение ಥ_ಥ',
            description:
                "Неправильный пароль или пользователя не существует",
        });
    };
    const [form] = Form.useForm();
    const {store} = useContext(Context)

    const onFinish = async (values: any) => {
        try{
            await store.login(values.login, values.password, values.remember)
        }
        catch (e) {
            form.resetFields();
            openNotificationWithIcon('error' )
        }

    };
    return (
        <>
            {contextHolder}
            <img src={lb} className={cl.backgroundLB} alt=''/>
            <img src={rb} className={cl.backgroundRB} alt=''/>
            <img src={rt} className={cl.backgroundRT} alt=''/>
            <div className={cl.wrapper}>
                <div className={cl.cont}>
                <h1 className={cl.h1}>Авторизация</h1>
                <Form
                    form={form}
                    name="normal_login"
                    className={cl.loginForm}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="login"
                        rules={[{ required: true, message: 'Пожалуйста укажите логин!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Пожалуйста укажите пароль!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Пароль"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>


                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </div>
        </>
    );
};

export default observer(Login);