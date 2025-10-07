import { Outlet } from 'react-router-dom'
import axios from './util/axios.customize'
import { useEffect, useContext } from 'react'
import Header from './component/layout/header.jsx'
import { AuthContext } from './component/context/auth.context.jsx'

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const init = async () => {
      setAppLoading(true);                // 1) bật loading NGAY
      const token = localStorage.getItem('access_token');

      if (!token) {
        // chưa đăng nhập -> không gọi API, tắt loading
        setAuth({ isAuthenticated: false, user: { email: '', name: '' } });
        setAppLoading(false);
        return;
      }

      try {
        const res = await axios.get('/v1/api/account');
        const data = res?.data;           // 2) lấy từ res.data
        setAuth({
          isAuthenticated: true,
          user: {
            email: data?.email ?? '',
            name:  data?.name  ?? '',
          },
        });
        console.log('>>> account', data);
      } catch (err) {
        console.error('API error:', err);
        // token hỏng/hết hạn
        localStorage.removeItem('access_token');
        setAuth({ isAuthenticated: false, user: { email: '', name: '' } });
      } finally {
        setAppLoading(false);             // 3) luôn tắt loading
      }
    };

    init();
  }, [setAuth, setAppLoading]);

  return (
    <div>
      {appLoading ? (
        <>loading ....</>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default App;
