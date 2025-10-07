import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const navigate = useNavigate();
    const items = [
{
label: <Link to ={"/HomePage"} >Home Page</Link>,
key: 'Home',
icon: <MailOutlined />,
},
{
label: <Link to ={"/user"}>Users</Link>,
key: 'user',
icon: <MailOutlined />,
},
{
label: 'Welcome',
key: 'SubMenu',
icon: <SettingOutlined />,
children: [
{
label: <Link to={"/login"}> Dang Nhap </Link>,
key: 'Login',
},
{
    label:<span onClick={()=>{ 
    localStorage.removeItem("access_token");
    setCurrent('/home');
    navigate ("/");
    }}>Dang Xuat</span>,
    key:'Logout',
},
],
},
];
const [current, setCurrent] = useState('mail');
const onClick = (e) => {
console.log('click ', e);
setCurrent(e.key);
};
return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;