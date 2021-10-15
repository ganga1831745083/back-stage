import { Button, Checkbox, Form, Input, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import './register.less'

const Register: React.FC<any> = (props) => {
    const [form] = Form.useForm();
    //提交表单且数据验证成功后回调事件
    const onFinish = (form: any) => {

    }
    //提交表单且数据验证失败后回调事件	
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='register-box'>
            <Form
                className='form-box'
                name='register'
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label='用户名'
                    name='name'
                    rules={[{ required: true, message: '用户名不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='密码'
                    name='password'
                    rules={[
                        {
                            type: 'string',
                            //动态验证
                            validator: (rule, value) => {
                                if (value==undefined || value.length<6) {
                                    return Promise.reject('密码至少6位')
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                < Form.Item
                    label='手机号'
                    name='tel'
                    rules={[{
                        validator:(rule,value)=>{
                            let regu = /^1[3|4|5|7|8][0-9]\d{8}$/
                            if (value == undefined ||regu.test(value)) {
                                return Promise.reject('手机号格式不对')
                            }
                            return Promise.resolve()
                        }
                    }]}
                >
                    <Input></Input>
                </ Form.Item>
                < Form.Item
                    label='验证码'
                    name='Verification'
                    rules={[{ required: true, message: '验证码不能为空' }]}
                >
                    <Input></Input>
                </ Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            注册
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
export default Register