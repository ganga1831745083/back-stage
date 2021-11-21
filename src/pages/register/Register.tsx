import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import './register.less'
import { register } from '../../api/api';

const Register: React.FC<any> = (props) => {
    const click_login = ()=>{
        window.location.href='/login'
    }
    const [form] = Form.useForm();
    //提交表单且数据验证成功后回调事件
    const onFinish = (form: any) => {
        // register(form.name,form.password).
        register(form.name,form.password,form.tel,form.Verification,form.email).then((response:any)=>{
            const {code,msg} = response.data;
            if(code===0){
                message.success("注册成功正在前往登录页面")
                window.location.href='/login'
            }else{
                message.error(msg)
            }
        })
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
                            required:true,
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
                <Form.Item
                    label='邮箱'
                    name='email'
                    rules={[{ required: true, message: '邮箱不能为空' }]}
                >
                    <Input />
                </Form.Item>
                < Form.Item
                    label='手机号'
                    name='tel'
                    rules={[{
                        required:true,
                        validator:(rule,value)=>{
                            
                            
                            let regu = /^1[3|4|5|7|8][0-9]\d{8}$/
                            console.log(regu.test(value));
                            if (value == undefined || !regu.test(value)) {
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
                    className="Verification"
                    rules={[{ required: true, message: '验证码不能为空' }]}
                >
                    <Input></Input>
                </ Form.Item>
                
                <div className="Verification_img"></div>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button type="primary" onClick={()=>click_login()}>
                            登录
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Register