import { notification, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getUserApi } from '../util/api';

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]); // ✅ mặc định là []

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserApi();
        // ✅ res có thể là { data: [...] } hoặc là mảng trực tiếp
        const users = Array.isArray(res) ? res : res?.data || [];
        setDataSource(users);
      } catch (error) {
        console.error(error);
        notification.error({
          message: 'Unauthorized',
          description: 'Token bị hết hạn hoặc không hợp lệ',
        });
      }
    };

    fetchUser();
  }, []);

  const columns = [
    { title: 'Email', dataIndex: 'email' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Id', dataIndex: '_id' },
    { title: 'Role', dataIndex: 'role' },
  ];

  return (
    <div style={{ padding: 50 }}>
      <Table
        bordered
        rowKey="_id"
        dataSource={Array.isArray(dataSource) ? dataSource : []} // ✅ luôn là mảng
        columns={columns}
      />
    </div>
  );
};

export default UserPage;
