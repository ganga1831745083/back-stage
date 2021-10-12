import { Button, Checkbox, Form, Input, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import  './login.less';
const Login: React.FC<any> = (props) => {
    const [from] = Form.useForm();
    return (
        <div className='login-box'>
            <Form
                name='login'
                form={from}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label='用户名'
                    name='name'

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='密码'
                    name='password'
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>牢记密码</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button type="primary" htmlType="reset">
                            重置
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login