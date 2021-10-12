import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { login } from '../../api/login';
import  './login.less';
import {set} from '../../utils/storage'

const Login: React.FC<any> = (props) => {
    const [form] = Form.useForm();
    //提交表单且数据验证成功后回调事件
    const onFinish = (form:any)=>{
        login(form.name,form.password).then(response =>{
            const {code,msg,data} = response.data;
            if(code===0){
                //点击下次自动登录
                if(form.remember){
                    //设置七天后过期localStorage.setItem(key, val,7*24*60)
                }else{
                    
                }
                message.success(msg)
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
        <div className='login-box'>
            <Form
                className='form-box'
                name='login'
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
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
                            validator:(rule,value)=>{
                                if(value.length>0 && value.length<6){
                                    return Promise.reject('密码长度不能小于6位')
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>下次自动登录</Checkbox>
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