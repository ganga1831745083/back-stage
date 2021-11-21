import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import React from 'react';
import {inject,observer} from 'mobx-react'
import { login } from '../../api/api';
import  './login.less';
import {Storage} from '../../utils/storage'

const Login: React.FC<any> = (props) => {
    let storage = new Storage('');
    const [form] = Form.useForm();
    //提交表单且数据验证成功后回调事件
    const click_register = ()=>{
        window.location.href = '/register'
    }
    const onFinish = (form:any)=>{
        login(form.name,form.password).then((response:any) =>{
            const {code,msg,data} = response.data;
            if(code===0){
                props.userStore?.changeName(data.user_name)
                //点击下次自动登录
                if(form.remember){
                    //设置七天后过期localStorage.setItem(key, val,7*24*60)
                    storage.setItem({
                        name:"data",
                        data:data,
                        expires:1000*60*60*24*7
                    })
                }else{
                    storage.setItem({
                        name:"data",
                        data:data
                    })
                }
                message.success('登录成功')
                window.location.href = '/'
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
                            required:true,
                            type: 'string', 
                            // 动态验证
                            validator:(rule,value)=>{
                                if(value===undefined || value.length<6){
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
                        <Button type="primary" onClick={()=>{click_register()}}>
                            注册
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
export default  inject('userStore')(observer(Login)) 