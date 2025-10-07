import { createContext, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';



const Header = () => {

    const navigate = useNavigate();
    const {auth,setAuth}= useContext(AuthContext);
    console.log(">>> check auth: ", auth);
    const items = [
{
label: <Link to ={"/HomePage"} >Home Page</Link>,
key: 'Home',
icon: <MailOutlined />,
},
...(auth.isAuthenticated ? [{
    label: <Link to ={"/user"}>Users</Link>,
    key: 'user',
    icon: <MailOutlined />,
}] :[]),

{
label: `Welcome ${auth?.user?.email}`,
key: 'SubMenu',
icon: <SettingOutlined />,
children: [
    ...(auth.isAuthenticated ? [{
    label:<span onClick={()=>{ 
    localStorage.removeItem("access_token");
    setCurrent('/home');
    setAuth({
    isAuthenticated: false,
    user:{
        email:"",
        name:""
    }
    });

    
    navigate ("/");
    }}>Dang Xuat</span>,
    key:'Logout',
}] :[
    {
        label: <Link to={"/login"}> Dang Nhap </Link>,
        key: 'Login',
    }
]),


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