import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { getUserApi } from '../util/api';

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserApi();  // axios.get() → trả response object
        console.log(">>> API response:", res.data);

        // ✅ kiểm tra dữ liệu thực tế trả về từ backend
        if (res.data?.DT && Array.isArray(res.data.DT)) {
          setDataSource(res.data.DT);  // nếu backend trả { DT: [ ... ] }
        } else if (Array.isArray(res.data)) {
          setDataSource(res.data);     // nếu backend trả trực tiếp [ ... ]
        } else {
          setDataSource([]);           // fallback để tránh crash
        }
      } catch (error) {
        console.error("Fetch user error:", error);
        setDataSource([]);
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
        rowKey="_id"       // ✅ thêm key để tránh cảnh báo
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default UserPage;
