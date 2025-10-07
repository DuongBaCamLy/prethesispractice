

import { Button, Form, Input, notification } from 'antd';
import { loginApi } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../component/context/auth.context';



const LoginPage = () => {
  const navigate= useNavigate();
  const {setAuth}= useContext(AuthContext);
    const onFinish = async ({ email, password }) => {
  try {
    const res = await loginApi(email, password); // res = axios response
    const data = res?.data;
    if (data?.EC === 0) {
      localStorage.setItem('access_token', data.access_token);
      notification.success({ message: 'LOGIN USER', description: 'Success' });
      setAuth({
        isAuthenticated: true,
        user:{
            email:res?.user?.email ?? "",
            name:res?.user?.name ?? ""
        }
      });
      navigate('/user');
    } else {
      notification.error({
        message: 'LOGIN FAIL',
        description: data?.EM ?? 'Sai email hoặc mật khẩu',
      });
    }
  } catch (e) {
    notification.error({
      message: 'LOGIN FAIL',
      description: e?.response?.data?.message || e.message || 'Error',
    });
  }
};
 return (
    <div style={{ margin: '50px' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}


        onFinish={onFinish}
        autoComplete="off"
        layout='vertical'
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;