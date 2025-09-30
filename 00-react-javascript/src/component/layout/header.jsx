import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';


const Header = () => {
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
label: 'Dang Nhap',
key: 'Login',
},
{label: 'Dang xuat',
key: 'Logout',
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